import copy
from sqlalchemy import and_, or_, between, func, inspect
from flask import jsonify, request, json, make_response
from flask_mail import Message
from flask_jwt_extended import (create_access_token,
create_refresh_token, jwt_required,
get_jwt_identity, get_jti)
from datetime import timedelta, datetime

from main import app, bcrypt, jwt, mail
from extensions import db
from models import (Test, Users, Calendar, TokenBlacklist, Beams, Organization, requests,
                    Integrator, Ranges)
from blacklist_helpers import (
    is_token_revoked, add_token_to_database, get_user_tokens,
    revoke_token, unrevoke_token, revoke_user_tokens,
    prune_database
)
from exceptions import TokenNotFound
from pdf_builder import FormBuilder


@app.route('/time', methods=['GET'])
def get_current_time():
    sample = Test.query.first()
    sample = sample.text
    return jsonify({'time': sample})



@app.route('/facility', methods=['GET'])
def facilities():
    myList = []
    facilities = Organization.query.filter_by(org_type='facility').all()
    for entry in facilities:
            entry_info = {'name': entry.name,
            'abbreviation': entry.abbrv, 'id': entry.id}
            myList.append(entry_info)
    return jsonify({'entries' : myList})

@app.route('/calendar', methods=['POST'])
def entries():
    myList = []
    entries = Calendar.query.all()
    for entry in entries:
        if entry.private != True:
            startDate = entry.startDate.strftime("%Y-%m-%dT%H:%M")
            entry_info = {'username': entry.username,
            'facility': entry.facility, 'integrator': entry.integrator, 'startDate': startDate,
            'totalTime': entry.totalTime}
            myList.append(entry_info)
    return jsonify({'entries' : myList})

@app.route('/calendar/personal', methods=['POST'])
@jwt_required
def personal_entries():
    username = get_jwt_identity()

    myList = []
    entries = Calendar.query.filter_by(username=username).all()
    for entry in entries:
        startDate = entry.startDate.strftime("%Y-%m-%dT%H:%M")
        entry_info = {'username': entry.username,
        'facility': entry.facility, 'integrator': entry.integrator, 'startDate': startDate,
        'totalTime': entry.totalTime}
        myList.append(entry_info)
    return jsonify({'entries' : myList})

@app.route('/calendar/tasks', methods=['GET', 'POST'])
@jwt_required
def tasks():
    if request.method == 'POST':
        req = request.get_json()
        modifyEntry = Calendar.query.filter_by(id=req['id']).first()
        modifyEntry.steps = req['steps']
        db.session.commit()

    eventArray = []
    username = get_jwt_identity()
    # today = datetime.now().strftime('%Y-%m-%d')
    entries = Calendar.query.filter(and_(Calendar.username==username, Calendar.startDate >= datetime.now())).all()
    # entries = Calendar.query.filter(Calendar.username==username).all()
    for entry in entries:
        date = entry.startDate.strftime("%m/%d/%Y")
        time = entry.startDate.strftime("%I %p")
        adder = {"site" : entry.facility, "date" : date,
                "time" : time, "integrator" : entry.integrator,
                "steps" : entry.steps, "id" : entry.id, "startDate" : entry.startDate}
        eventArray.append(adder)
    return jsonify({'eventArray' : eventArray})

@app.route('/integrator', methods=['GET'])
def get_integrators():
    myList = []

    try:
        integrators = Organization.query.filter_by(org_type='Integrator').all()
        for org in integrators:
            myList.append(org.abbrv)
    except Exception as e:
        print(e)

    return {'integrators' : myList}


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

    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}

    return result

@app.route('/calendar-entry', methods=['POST'])
# @jwt_required
def create_entry():

    username = get_jwt_identity()
    req = request.get_json()
    result = ""

    # date = datetime.strptime(form['date'], '%Y-%m-%dT%H:%M:%S.%fZ')

    try:
        entry = Calendar(
            username = req['username'], # username
            facility = req['facility'],
            integrator = req['integrator'],
            totalTime = req['totalTime'],
            startDate = req['startDate'],
            private = req['private'],
            title = req['title']
        )
        result = entry.create_entry()

    except Exception as e:
        result = {'error' : str(e),
        'success' : False}

    return result



@app.route('/beams', methods=['POST'])
def beams():
    myList = {}
    req = request.get_json()
    print(req)
    facility = Organization.query.filter_by(abbrv=req['facility']).one()
    beams = Beams.query.filter_by(org_id=facility.id).all()
    for beam in beams:
        if beam.ion in myList:
            myList[beam.ion].append(beam.amev)
        else:
            myList[beam.ion] = [beam.amev]
        # beam_info = {'ion': beam.ion,
        # 'mass': beam.mass, 'amev': beam.amev, 'max_energy': beam.max_energy,
        # 'max_energy_units': beam.max_energy_units, 'let': beam.let, 'let_units': beam.let_units,
        # 'let_peak': beam.let_peak, 'beam_range': beam.beam_range, 'range_peak': beam.range_peak, 'range_units': beam.range_units,
        # 'max_flux': beam.max_flux, 'max_flux_units': beam.max_flux_units, 'let_material': beam.let_material, 'air': beam.air}

    return myList

def add_calendar(beam_request):
    result = ""

    try:
        print(beam_request.facility)
        print(beam_request.username)
        entry = Calendar(
            username = beam_request.username,
            facility = beam_request.facility,
            integrator = beam_request.integrator,
            totalTime = beam_request.hours,
            startDate = beam_request.start,
            private = False,
            title = beam_request.title
        )
        result = entry.create_entry()

    except Exception as e:
        result = {'error' : str(e),
        'success' : False}
    print(result)

    return result


@app.route('/approve', methods=['POST'])
#@jwt_required
def approve():
    result = ""
    try:
        req = request.get_json()
        beam_request = requests.query.filter_by(id=req['id']).first()
        if req['approval'] == 'Integrator':
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
        if req["ions"] is not "":
            for i, ion in enumerate(req['ions']):
                beam = Beams.query.filter_by(ion=ion, amev=req['energies'][i]).one()
                ion_ids.append(beam.id)

        for attr, value in beam_request.__dict__.items():
            if attr in req and req[attr] != "":
                setattr(beam_request, attr, req[attr])

        beam_request.ions = ion_ids
        beam_request.modified = True
        beam_request.approved_integrator = True
        beam_request.status = "Modified"

        # mail.send(msg)
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

@app.route('/getforms', methods=['POST'])
#@jwt_required
def getRequests():
    req = request.get_json()
    result = ""

    try:
        request_forms = requests.query.all()
        myForms = []
        for form in request_forms:
            beams = []
            energies = []
            for ion in form.ions:
                beam = Beams.query.filter_by(id=ion).one()
                beams.append(beam.ion)
                energies.append(beam.amev)
            delta = timedelta(hours=12)
            time = (form.start + delta).strftime('%Y-%m-%dT%H:%M')
            myForms.append({'name' : form.name, 'integrator' : form.integrator,
            'facility' : form.facility, 'company' : form.company, 'email' : form.email,
            'phone' : form.cell, 'funding_contact' : form.funding_contact,
            'funding_cell' : form.funding_cell, 'funding_email' : form.funding_email,
            'PO_number' : form.po_number, 'address' : form.address,
            'city' : form.city, 'state' : form.state, 'zipcode' : form.zipcode,
            'ions' : beams, 'energies' : energies, 'start' : time, 'id' : form.id})
        print(myForms)
        result = {'requests' : myForms}

    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}

    return result

@app.route('/getforms/integrator', methods=['POST'])
@jwt_required
def getRequests_integrators():
    username = get_jwt_identity()
    req = request.get_json()
    result = ""

    try:
        user = Users.query.filter_by(username=username).first()
        if user.user_type != 'Integrator':
            raise Exception("You must be an integrator to view this page!")
        request_forms = requests.query.filter_by(integrator=user.affiliation).all()
        myForms = []
        for form in request_forms:
            ions = {}
            for ion in form.ions:
                beam = Beams.query.filter_by(id=ion).one()
                ions[beam.ion] = beam.amev
            delta = timedelta(hours=12)
            time = (form.start + delta).strftime('%Y-%m-%d')
            if form.start_date is not None:
                start_date = form.start_date.strftime('%m/%d/%Y')
                start_time= form.start_date.strftime('%I %p')
            else:
                start_date = None
                start_time = None
            if form.end_date is not None:
                end_date = form.start_date.strftime('%m/%d/%Y')
                end_time= form.start_date.strftime('%I %p')
            else:
                end_date = None
                end_time = None
            myForms.append({'name' : form.name, 'integrator' : form.integrator,
            'facility' : form.facility, 'company' : form.company, 'email' : form.email,
            'phone' : form.cell, 'funding_contact' : form.funding_contact,
            'funding_cell' : form.funding_cell, 'funding_email' : form.funding_email,
            'PO_number' : form.po_number, 'address' : form.address,
            'city' : form.city, 'state' : form.state, 'zipcode' : form.zipcode,
            'beams' : ions, 'start' : time, 'id' : form.id, "startDate" : start_date,
            "startTime" : start_time, "endDate" : end_date, "endTime" : end_time,
            'order' : form.order})
        result = {'requests' : myForms}

    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}

    return result
