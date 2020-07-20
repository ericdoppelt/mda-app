import copy
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
                    Integrator, Ranges)
from blacklist_helpers import (
    is_token_revoked, add_token_to_database, get_user_tokens,
    revoke_token, unrevoke_token, revoke_user_tokens,
    prune_database
)
from setup.exceptions import TokenNotFound
from pdf_builder import FormBuilder




@app.route('/approve', methods=['POST'])
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
        db.session.commit()
        if beam_request.approved_facility and beam_request.approved_integrator:
            # add_calendar()
            pass
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

        msg = Message("Beam Time Request Modified") #, cc=[req['email']])
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
            if attr in req and req[attr] != "":
                modified = True
                setattr(beam_request, attr, req[attr])

        beam_request.approved_integrator = True
        beam_request.status = "Approved"

        if modified:
            beam_request.modified = True
            beam_request.ions = ion_ids
            mail.send(msg)
        db.session.commit()

        result = {'success' : True}
    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}
    return jsonify(result)

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
        # template = "Universal_request_template.pdf"
        # output = "Universal_request.pdf"
        # pdf.fill(template, output)
        msg.body = "Your beam time request was rejected for the following reason: \n\n"
        msg.body += req['integrator_comment'] + "\n\n"
        # with app.open_resource("TAMU_request.pdf") as fp:
        #     msg.attach("Universal_request.pdf", "Universal_request/pdf", fp.read())

        # mapper = inspect(requests)
        # for column in mapper.attrs:
        #     form[column.key] = beam_request.column.key
        # form = {}
        # for attr, value in beam_request.__dict__.items():
        #     if attr == 'start':
        #         attr = 'date'
        #     form[attr] = value
        #     print(attr, value)
        # print(form)
        beam_request.integrator_comment =req['integrator_comment']
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

@app.route('/getforms', methods=['GET'])
#@jwt_required
def getRequests():
    req = request.get_json()
    result = ""

    try:
        request_forms = requests.query.all()
        myForms = []
        for form in request_forms:
            ions = {}
            for ion in form.ions:
                beam = Beams.query.filter_by(id=ion).one()
                ions[beam.ion] = beam.amev
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
            myForms.append({'name' : form.name, 'integrator' : form.integrator,
            'facility' : form.facility, 'company' : form.company, 'email' : form.email,
            'phone' : form.cell, 'funding_contact' : form.funding_contact,
            'funding_cell' : form.funding_cell, 'funding_email' : form.funding_email,
            'PO_number' : form.po_number, 'address' : form.address,
            'city' : form.city, 'state' : form.state, 'zipcode' : form.zipcode,
            'beams' : ions, 'start' : start_date, 'id' : form.id, "rangeStart" : range_start,
            "rangeEnd" : range_end, 'order' : form.order, 'scheduledStart' : form.scheduled_start,
            'rangeId' : form.request_range, 'totalHours' : totalHours, 
            'ionHours' : form.ion_hours, 'status' : form.status})
        result = {'requests' : myForms}

    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}

    return result

@app.route('/getforms/integrator', methods=['GET'])
@jwt_required
def getRequests_integrators():
    username = get_jwt_identity()
    result = ""

    try:
        user = Users.query.filter_by(username=username).first()
        if user.user_type != 'integrator':
            raise Exception("You must be an integrator to view this page!")
        request_forms = requests.query.filter_by(integrator=user.affiliation).all()
        myForms = []
        for form in request_forms:
            ions = {}
            for ion in form.ions:
                beam = Beams.query.filter_by(id=ion).one()
                ions[beam.ion] = beam.amev
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
            myForms.append({'name' : form.name, 'integrator' : form.integrator,
            'facility' : form.facility, 'company' : form.company, 'email' : form.email,
            'phone' : form.cell, 'funding_contact' : form.funding_contact,
            'funding_cell' : form.funding_cell, 'funding_email' : form.funding_email,
            'PO_number' : form.po_number, 'address' : form.address,
            'city' : form.city, 'state' : form.state, 'zipcode' : form.zipcode,
            'beams' : ions, 'start' : start_date, 'id' : form.id, "rangeStart" : range_start,
            "rangeEnd" : range_end, 'order' : form.order, 'scheduledStart' : form.scheduled_start,
            'rangeId' : form.request_range, 'totalHours' : totalHours, 
            'ionHours' : form.ion_hours, 'status' : form.status})
        result = {'requests' : myForms}

    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}

    return result

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
        minEnergy = req['minEnergy']
        maxEnergy = req['maxEnergy']
        beams = Beams.query.filter(or_(and_(Beams.ion.ilike(ion + '%'), Beams.amev >= minEnergy, Beams.org_id == 5),
        and_(Beams.ion.ilike(ion + '%'), Beams.amev.between(minEnergy, maxEnergy)))).all()
        myDict = {}
        # myEnergies = []
        for beam in beams:
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
