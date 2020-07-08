
import copy
from sqlalchemy import and_, or_, between, func
from flask import jsonify, request, json, make_response
from flask_mail import Message
from flask_jwt_extended import (create_access_token,
create_refresh_token, jwt_required,
get_jwt_identity, get_jti)
from datetime import timedelta, datetime

from main import app, bcrypt, jwt, mail
from extensions import db
from models import Test, Users, Calendar, TokenBlacklist, Beams, Organization, requests
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

@app.route('/register', methods=['POST'])
def register():
    req = request.get_json()
    username = req['username']
    password = req['password']
    result = ""

    user = Users.query\
        .filter(func.lower(Users.username)==func.lower(username)).first()

    if not user:
        user = Users(
            username = username,
            first_name = req['first_name'],
            last_name = req['last_name'],
            affiliation = req['affiliation'],
            user_type = req['type'],
            phone = req['phone'],
            email = req['email']
        )
        user.set_password(password)
        result = user.register_user()

    else:
        result = {'error' : "User already registered, please login",
        'success' : False}

    return jsonify(result)

@app.route('/login', methods=['POST'])
def login():
    username = request.get_json()['username']
    password = request.get_json()['password']
    result = ""

    user = Users.query.filter_by(username=username).first()

    if not user:
        result = {'success' : False,
        'error' : "Incorrect username"}
    elif user.check_password(password):

        expires = timedelta(hours=12)
        access_token = create_access_token(identity = username, expires_delta=expires)
        add_token_to_database(access_token, app.config['JWT_IDENTITY_CLAIM'])
        result = {'success' : True,
        'error' : "",
        'access_token': access_token}
    else:
        result = {'success' : False,
        'error' : "Incorrect password"}

    return jsonify(result)

@app.route('/user', methods=['GET', 'POST'])
@jwt_required
def user():
    account_info = ""
    username = get_jwt_identity()
    if request.method == 'POST':
        user = Users.query.filter_by(username=username).first()
        account_info = {'id': user.id, 'user': user.username,
        'password': user.password, 'first_name': user.first_name, 'last_name': user.last_name,
        'affiliation': user.affiliation, 'user_type': user.user_type, 'phone': user.phone,
        'email': user.email}
    return account_info

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

@app.route('/integrator', methods=['GET'])
def get_integrators():
    myList = []
    
    try:
        integrators = Organization.query.filter_by(org_type='integrator').all()
        for org in integrators:
            myList.append(org.abbrv)
        print(myList)
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
        print(result)

    except Exception as e:
        print(e)
        result = {'error' : e,
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
        result = {'error' : e,
        'success' : False}

    return result

@jwt.token_in_blacklist_loader
def check_if_token_revoked(decoded_token):
    print(request)
    return is_token_revoked(decoded_token)

# Endpoint for revoking the current users access token
@app.route('/logout', methods=['DELETE'])
@jwt_required
def logout():
    username = get_jwt_identity()
    try:
        revoke_user_tokens(username)
        return jsonify({'success': True, 'msg': 'Tokens revoked'}), 200
    except TokenNotFound:
        return jsonify({'success': False, 'msg': 'The specified token was not found'}), 404

# TODO delete or change for production, development purposes only
@app.route('/deleteuser/<username>', methods=['DELETE'])
def delete(username):
    try:
        Users.query.filter_by(username=username).delete()
        db.session.commit()
        return jsonify({'success': True, 'msg': 'User deleted'}), 200
    except:
        return jsonify({'success': False, 'msg': 'The specified user was not found'}), 404

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
        result = {'error' : e,
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
        result = {'error' : e,
        'success' : False}
    return result

@app.route('/request/modify', methods=['POST'])
#@jwt_required
def request_modify():
    result = ""
    try:
        req = request.get_json()
        beam_request = requests.query.filter_by(id=req['id']).first()
        for key in req.keys():
            pass
        if req['approval'] == 'integrator':
            beam_request.approved_integrator = True
        if req['approval'] == 'facility':
            beam_request.approved_facility = True
        else:
            raise Exception("No approval key found")
        db.session.commit()
        if beam_request.approved_facility and beam_request.approved_integrator:
            pass
        result = {'success' : True}
    except Exception as e:
        print(e)
        result = {'error' : e,
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
            'ions' : beams, 'energies' : energies, 'start' : time})
        print(myForms)
        result = {'requests' : myForms}

    except Exception as e:
        print(e)
        result = {'error' : e,
        'success' : False}

    return result


@app.route('/getforms/integrator', methods=['POST'])
@jwt_required
def getRequests_integrators():
    print(request)
    username = get_jwt_identity()
    req = request.get_json()
    result = ""

    try:
        user = Users.query.filter_by(username=username).first()
        if user.user_type != 'integrator':
            raise Exception("You must be an integrator to view this page!")
        request_forms = requests.query.filter_by(integrator=user.affiliation).all()
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
            'ions' : beams, 'energies' : energies, 'start' : time})
        result = {'requests' : myForms}

    except Exception as e:
        print(e)
        result = {'error' : e,
        'success' : False}

    return result
    


def add_request(form, username):

    if form['billingPO'] == "":
        form['billingPO'] = None
    ion_ids = []
    print(form)
    for i, ion in enumerate(form['ions']):
        beam = Beams.query.filter_by(ion=ion, amev=form['energies'][i]).one()
        ion_ids.append(beam.id)
    print(ion_ids)
    entry = requests(name = form['name'],
                    email = form['email'],
                    cell = form['cell'],
                    company = form['company'],
                    integrator = form['integrator'],
                    funding_contact = form['financierName'],
                    address = form['billingAddress'],
                    city = form['billingCity'],
                    state = form['billingState'],
                    zipcode = form['billingZip'],
                    approved_integrator = False,
                    approved_facility = True,
                    facility = form['facility'],
                    # energy = '',
                    funding_cell = form['financierPhone'],
                    funding_email = form['financierEmail'],
                    start = form['date'],
                    ions = ion_ids,
                    comments = form['comments'],
                    po_number = form['billingPO'],
                    beam_time = form['hours'],
                    username = username)
    entry.create_request()

@app.route('/requestform', methods=['POST'])
# @jwt_required
def requestform():
    try:
        form = request.get_json()
        facility = form['facility']
        form['signDate'] = datetime.today().strftime("%m/%d/%Y")
        template = ""
        output = ""
        pdf = FormBuilder(form)
        msg = Message("Send Request Form Demo", cc=[form['email']])
        # msg.recipients = ['edopp4182@gmail.com']
        if facility == 'TAMU':
            # msg.recipients = ['clark@comp.tamu.edu']
            form['signature'] = form['name']
            if form['date'] != "":
                date = datetime.strptime(form['date'], '%Y-%m-%dT%H:%M:%S.%fZ')
                form['date'] = date.strftime('%m/%d/%Y')
            badDates = copy.deepcopy(form['badDates'])
            if badDates[0] != None:
                for i, date in enumerate(badDates):
                    date = datetime.strptime(date, '%Y-%m-%dT%H:%M:%S.%fZ')
                    if i != 0 or i != len(badDates) - 1:
                        form['badDates'] += ', '
                    if i == 0:
                        form['badDates'] = date.strftime('%m/%d/%Y')
                    else:
                        form['badDates'] += date.strftime('%m/%d/%Y')
            template = "TAMU_request_template.pdf"
            output = "TAMU_request.pdf"
            pdf.fill(template, output)
            msg.body = "Here is the request form for beam time"
            with app.open_resource("TAMU_request.pdf") as fp:
                msg.attach("TAMU_request.pdf", "TAMU_request/pdf", fp.read())
        if facility == 'LBNL':
            # msg.recipients = ['88beamrequest@lbl.gov']
            msg.body = pdf.mail()
        if facility == 'MSU':
            # msg.recipients = ['88beamrequest@lbl.gov']
            if form['date'] != "":
                date = datetime.strptime(form['date'], '%Y-%m-%dT%H:%M:%S.%fZ')
                form['date'] = date.strftime('%m/%d/%Y')
            template = "Universal_request_template.pdf"
            output = "Universal_request.pdf"
            pdf.fill(template, output)
            msg.body = "Here is the request form for beam time"
            with app.open_resource("Universal_request.pdf") as fp:
                msg.attach("Universal_request.pdf", "Universal_request/pdf", fp.read())
        if facility == 'NSRL':
            # msg.recipients = ['88beamrequest@lbl.gov']
            if form['date'] != "":
                date = datetime.strptime(form['date'], '%Y-%m-%dT%H:%M:%S.%fZ')
                form['date'] = date.strftime('%m/%d/%Y')
            template = "Universal_request_template.pdf"
            output = "Universal_request.pdf"
            pdf.fill(template, output)
            msg.body = "Here is the request form for beam time"
            with app.open_resource("Universal_request.pdf") as fp:
                msg.attach("Universal_request.pdf", "Universal_request/pdf", fp.read())
        # mail.send(msg)
        print(form)
        username = form['username'] # TODO change get_jwt_identity()
        add_request(form, username)

        return jsonify({'success': True, 'msg': 'Mail sent!'}), 200
    except Exception as e:
        print(e)
        return jsonify({'success': False, 'msg': str(e)}), 404


