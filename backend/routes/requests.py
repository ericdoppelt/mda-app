import copy
import re
from sqlalchemy import and_, or_, between, func, inspect
from flask import jsonify, request, json, make_response
from flask_mail import Message
from flask_jwt_extended import (create_access_token,
create_refresh_token, jwt_required,
get_jwt_identity, get_jti)
from datetime import timedelta, datetime

from main import app, bcrypt, jwt, mail
from setup.extensions import db
from models import (Test, Users, Calendar, TokenBlacklist, Beams, Organization, requests,
                    Integrator, Ranges, LBNL, TAMU, NSRL)
from blacklist_helpers import (
    is_token_revoked, add_token_to_database, get_user_tokens,
    revoke_token, unrevoke_token, revoke_user_tokens,
    prune_database
)
from setup.exceptions import TokenNotFound
from pdf_builder import FormBuilder




@app.route('/request/approve', methods=['POST'])
#@jwt_required
def approve():
    result = ""
    try:
        req = request.get_json()

        beam_request = requests.query.filter_by(id=req['id']).first()
        if req['approval'] == 'integrator':
            beam_request.approved_integrator = True
        if req['approval'] == 'facility':
            beam_request.approved_facility = True
        else:
            raise Exception("No approval key found")
        if beam_request.approved_facility and beam_request.approved_integrator:
            beam_request.status = 'Approved'
        db.session.commit()

        msg = Message("Beam Time Request Approved")
        msg.recipients = [beam_request.email]
        msg.body = "Your beam time request has been approved.\n\n"

        # msg.send

        result = {'success' : True}
    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}
    return result

@app.route('/request/modify', methods=['POST'])
#@jwt_required
def request_modify():
    result = ""

    try:
        req = request.get_json()
        beam_request = requests.query.filter_by(id=req['id']).first()

        msg = Message("Beam Time Request Modified")
        msg.recipients = [beam_request.email]

        msg.body = "Your beam time request was modified with the following: \n\n"
        for key in req.keys():
            if req[key] != "" and key != "id":
                msg.body += key + ": " + req[key] + "\n\n"
        iterable = copy.deepcopy(req)
        for (key, value) in iterable.items():
            if value != "":
                if key == "financierName":
                    req["funding_contact"] = value
                if key == "billingAddress":
                    req["address"] = value
                if key == "billingCity":
                    req["city"] = value
                if key == "billingState":
                    req["state"] = value
                if key == "billingZip":
                    req["zipcode"] = value
                if key == "financierPhone":
                    req["funding_cell"] = value
                if key == "financierEmail":
                    req["funding_email"] = value
                if key == "date":
                    req["start"] = value
                if key == "billingPO":
                    req["po_number"] = value
                if key == "hours":
                    req["beam_time"] = value
        ion_ids = []
        if "ions" in req:
            if req["ions"] is not []:
                for i, ion in enumerate(req['ions']):
                    beam = Beams.query.filter_by(ion=ion, amev=req['energies'][i]).one()
                    ion_ids.append(beam.id)
        else:
            ion_ids = beam_request.ions

        modified = False
        for attr, value in beam_request.__dict__.items():
            if attr in req and req[attr] != "" and attr != 'id':
                modified = True
                setattr(beam_request, attr, req[attr])
        if req['facility'] != 'MSU':
            for attr, value in req['facility'].__dict__.items():
                if attr in req and req[attr] != "" and attr != 'id' and attr != 'request_id':
                    modified = True
                    setattr(req['facility'], attr, req[attr])

        beam_request.approved_integrator = True
        beam_request.status = "Approved with changes"

        if modified:
            beam_request.modified = True
            beam_request.ions = ion_ids
            # mail.send(msg)
        db.session.commit()

        result = {'success' : True}
    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}
    return jsonify(result)

# @app.route('/request/undo', methods=['POST'])
# @jwt_required
# def reject_form():
#     result = ""
#     try:
#         req = request.get_json()
#         beam_request = requests.query.filter_by(id=req['id']).first()
#         pdf = FormBuilder(req)
#         msg = Message("Beam Time Request Rejected") #, cc=[req['email']])
#         msg.recipients = [beam_request.email]
        
#         msg.body = "Your beam time request was rejected for the following reason: \n\n"
#         msg.body += req['rejectNote'] + "\n\n"

#         beam_request.integrator_comment =req['rejectNote']
#         beam_request.status = "Rejected"
#         beam_request.approved_facility = False
#         beam_request.approved_integrator = False
#         beam_request.rejected = True
#         db.session.commit()
#         # mail.send(msg)
#         result = {'success' : True}
#     except Exception as e:
#         print(e)
#         result = {'error' : str(e),
#         'success' : False}
#     return result

@app.route('/request/reject', methods=['POST'])
# @jwt_required
def reject_form():
    result = ""
    try:
        req = request.get_json()
        beam_request = requests.query.filter_by(id=req['id']).first()
        pdf = FormBuilder(req)
        msg = Message("Beam Time Request Rejected") #, cc=[req['email']])
        msg.recipients = [beam_request.email]
        
        msg.body = "Your beam time request was rejected for the following reason: \n\n"
        msg.body += req['rejectNote'] + "\n\n"

        beam_request.integrator_comment =req['rejectNote']
        beam_request.status = "Rejected"
        beam_request.approved_facility = False
        beam_request.approved_integrator = False
        beam_request.rejected = True
        db.session.commit()
        # mail.send(msg)
        result = {'success' : True}
    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}
    return result

def getForms(request_forms):
    myForms = []
    for form in request_forms:
        ions = {}
        if form.facility == 'NSRL':
            extraInfo = NSRL.query.filter_by(request_id=form.id).one()
            if form.ions != None or form.ions != []:
                for i, ion in enumerate(form.ions):
                    beam = Beams.query.filter_by(id=ion).one()
                    if extraInfo.energies[i] in ions:
                        ions[extraInfo.energies[i]][0].append(beam.ion)
                    else:
                        ions[extraInfo.energies[i]] = [[beam.ion], form.shifts[i], form.hoursOn[i], form.hoursOff[i]]
        else:
            for i, ion in enumerate(form.ions):
                beam = Beams.query.filter_by(id=ion).one()
                if beam.amev in ions:
                    ions[beam.amev][0].append(beam.ion)
                else:
                    ions[beam.amev] = [[beam.ion], form.shifts[i], form.hoursOn[i], form.hoursOff[i]]
        if form.request_range is not None:
            request_range = Ranges.query.filter_by(id=form.request_range).first()
            timeDelta = timedelta(hours = request_range.hours)
            range_end = request_range.start_date + timeDelta
            range_start = request_range.start_date.strftime("%Y-%m-%dT%H:%M:%S")
            range_end = range_end.strftime("%Y-%m-%dT%H:%M:%S")
            totalHours = request_range.hours
        else:
            range_start = None
            range_end = None
            totalHours = None
        
        start_date = form.start.strftime('%Y-%m-%d')
        if form.scheduled_start is not None:
            form.scheduled_start = form.scheduled_start.strftime("%Y-%m-%dT%H:%M:%S")
        myDict = {'name' : form.name, 'integrator' : form.integrator,
        'facility' : form.facility, 'company' : form.company, 'email' : form.email,
        'phone' : form.cell, 'funding_contact' : form.funding_contact,
        'funding_cell' : form.funding_cell, 'funding_email' : form.funding_email,
        'PO_number' : form.po_number, 'address' : form.address, 'submitDate' : form.date_of_request,
        'city' : form.city, 'state' : form.state, 'zipcode' : form.zipcode,
        'beams' : ions, 'start' : start_date, 'id' : form.id, "rangeStart" : range_start,
        "rangeEnd" : range_end, 'order' : form.order, 'scheduledStart' : form.scheduled_start,
        'rangeId' : form.request_range, 'totalHours' : totalHours, 
        'ionHours' : form.ion_hours, 'status' : form.status, 'rejectNote' : form.integrator_comment,
        'personnel' : form.personnel}

        attrBlacklist = ['id', 'request_id', 'energies']

        if form.facility == 'TAMU':
            extraInfo = TAMU.query.filter_by(request_id=form.id).first()
            if extraInfo != None:
                dates = []
                for date in extraInfo.bad_dates:
                    dates.append(date.strftime("%Y-%m-%dT%H:%M:%S"))
                myDict['badDates'] = dates

        if form.facility == 'LBNL':
            extraInfo = LBNL.query.filter_by(request_id=form.id).first()
            if extraInfo != None:
                for key in LBNL.__table__.columns.keys():
                    if key not in attrBlacklist:
                        myDict[key] = getattr(extraInfo, key)

        if form.facility == 'NSRL':
            extraInfo = NSRL.query.filter_by(request_id=form.id).first()
            if extraInfo != None:
                for key in NSRL.__table__.columns.keys():
                    if key not in attrBlacklist:
                        myDict[key] = getattr(extraInfo, key)

        myForms.append(myDict)
    return myForms


@app.route('/getforms/<route>', methods=['GET', 'POST'])
@jwt_required
def getRequests(route):
    username = get_jwt_identity()
    result = ""

    try:
        if route == 'view':
            user = Users.query.filter_by(username=username).first()
            if user.user_type == 'Integrator':
                request_forms = requests.query.filter(and_(requests.integrator==user.affiliation,
                or_(requests.scheduled_start == None, datetime.now() < requests.scheduled_start))).all()
            else:
                request_forms = requests.query.filter(and_(requests.username==username,
                or_(requests.scheduled_start == None, datetime.now() < requests.scheduled_start))).all()
        if route == 'integrator':
            user = Users.query.filter_by(username=username).first()
            if user.user_type != 'Integrator':
                raise Exception("You must be an integrator to view this page!")
            request_forms = requests.query.filter_by(integrator=user.affiliation).all()
        if route == 'tester':
            request_forms = requests.query.filter_by(username=username).all()
        if route == 'id' and request.method == 'POST':
            req = request.get_json()
            request_forms = requests.query.filter_by(id=req['id']).all()
        else:
            request_forms = requests.query.all()
        myForms = getForms(request_forms)
        result = {'requests' : myForms}

    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}

    return result

# @app.route('/getforms/integrator', methods=['GET'])
# @jwt_required
# def getRequests_integrators():
#     username = get_jwt_identity()
#     result = ""

#     try:
#         user = Users.query.filter_by(username=username).first()
#         if user.user_type != 'integrator':
#             raise Exception("You must be an integrator to view this page!")
#         request_forms = requests.query.filter_by(integrator=user.affiliation).all()
#         myForms = getForms(request_forms)
#         result = {'requests' : myForms}

#     except Exception as e:
#         print(e)
#         result = {'error' : str(e),
#         'success' : False}

#     return result

@app.route('/request/add-range', methods=['POST'])
def add_range():
    result = ""
    req = request.get_json()

    try:
        beam_request = requests.query.filter_by(id=req['id']).first()
        beam_request.request_range = req['range']
        beam_request.priority = req['priority']

        db.session.commit()
        
        result = {'success' : True}

    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}

    return result


@app.route('/filterion', methods=['POST'])
def filterion():

    req = request.get_json()
    result = ""

    try:
        ion = req['ion']
        ionCharsReq = " ".join(re.findall("[a-zA-Z]+", ion))
        minEnergy = req['minEnergy']
        maxEnergy = req['maxEnergy']
        beams = Beams.query.filter(or_(and_(Beams.ion.ilike(ion + '%'), Beams.amev >= minEnergy, Beams.org_id == 5),
        and_(Beams.ion.ilike(ion + '%'), Beams.amev.between(minEnergy, maxEnergy)))).all()
        myDict = {}
        filteredBeams = []
        print(ionCharsReq)
        for beam in beams:
            ionCharsBeam = " ".join(re.findall("[a-zA-Z]+", beam.ion))
            print(ionCharsBeam)
            if ionCharsBeam == ionCharsReq:
                filteredBeams.append(beam)

        for beam in filteredBeams:
            facility = Organization.query.filter_by(id=beam.org_id).one()

            if facility.name in myDict:
                if beam.org_id == 5:
                    myDict[facility.name].append(beam.ion + ' : ' + str(minEnergy) + '-' + str(beam.amev))
                else:
                    myDict[facility.name].append(beam.ion + ' : ' + str(beam.amev))
            else:
                if beam.org_id == 5:
                    myDict[facility.name] = [beam.ion + ' : ' + (str(minEnergy) + '-' + str(beam.amev))]
                else:
                    myDict[facility.name] = [beam.ion + ' : ' + str(beam.amev)]
        myList = []
        for key in myDict.keys():
            newDict = {'facility': key, 'ions' : myDict[key]}
            myList.append(newDict)
        result = {'result' : myList}
        print(result)

    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}

    return result
