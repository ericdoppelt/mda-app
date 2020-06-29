
import copy
from flask import jsonify, request, json, make_response
from flask_mail import Message
from flask_jwt_extended import (create_access_token, 
create_refresh_token, jwt_required, 
get_jwt_identity, get_jti)
from sqlalchemy import func
from datetime import timedelta, datetime

from main import app, bcrypt, jwt, mail
from extensions import db
from models import Test, Users, Calendar, TokenBlacklist, Beams, Organization
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
    username = request.get_json()['username']
    password = request.get_json()['password']
    result = ""

    user = Users.query\
        .filter(func.lower(Users.username)==func.lower(username)).first()

    if not user:
        user = Users(
            username = username,
            first_name = request.get_json()['first_name'],
            last_name = request.get_json()['last_name']
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

@app.route('/calendar', methods=['GET', 'POST'])
def entries():
    myList = []
    if request.method == 'POST':
        entries = Calendar.query.all()
        for entry in entries:
            startDate = entry.startDate.strftime("%Y-%m-%dT%H:%M")
            cannotRun = ""
            if entry.cannotRun is not None:
                cannotRun = entry.cannotRun.strftime("%Y-%m-%dT%H:%M")
            entry_info = {'username': entry.username, 
            'facility': entry.facility, 'integrator': entry.integrator, 'startDate': startDate,
            'totalTime': entry.totalTime, 'cannotRun': cannotRun}
            myList.append(entry_info)
    return jsonify({'entries' : myList})

@jwt.token_in_blacklist_loader
def check_if_token_revoked(decoded_token):
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
    

# TODO make jwt required after development
@app.route('/requestform', methods=['POST'])
#@jwt_required
def requestform():
    try:
        form = request.get_json()
        facility = form['facility']
        form['date'] = datetime.today().strftime("%m/%d/%Y")
        template = ""
        output = ""
        pdf = FormBuilder(form)
        msg = Message("Send Request Form Demo", cc=[form['senderEmail']])
        # msg.recipients = ['edopp4182@gmail.com']
        if facility == 'TAMU': 
            # msg.recipients = ['clark@comp.tamu.edu']
            form['signature'] = form['senderName']
            if form['startDate1'] != "":
                date = datetime.strptime(form['startDate1'], '%Y-%m-%dT%H:%M:%S.%fZ')
                form['startDate1'] = date.strftime('%m/%d/%Y')
            if form['startDate2'] != "":
                date = datetime.strptime(form['startDate2'], '%Y-%m-%dT%H:%M:%S.%fZ')
                form['startDate2'] = date.strftime('%m/%d/%Y')
            badDates1 = copy.deepcopy(form['badDates1'])
            for i, date in enumerate(badDates1):
                date = datetime.strptime(date, '%Y-%m-%dT%H:%M:%S.%fZ')
                if i != 0 or i != len(badDates1) - 1:
                    form['badDates1'] += ', '
                if i == 0:
                    form['badDates1'] = date.strftime('%m/%d/%Y')
                else:
                    form['badDates1'] += date.strftime('%m/%d/%Y')
            badDates2 = copy.deepcopy(form['badDates2'])
            if form['badDates2']:
                for i, date in enumerate(badDates2):
                    date = datetime.strptime(date, '%Y-%m-%dT%H:%M:%S.%fZ')
                    form['badDates2'] += date.strftime('%m/%d/%Y')
                    if i == 0:
                        form['badDates2'] = date.strftime('%m/%d/%Y')
                    else:
                        form['badDates2'] += date.strftime('%m/%d/%Y')
                    if i != 0 or i != len(badDates2) - 1:
                        form['badDates2'] += ', '
            else:
                form['badDates2'] = ""
            template = "TAMU_request_template.pdf"
            output = "TAMU_request.pdf"
            pdf.fill(template, output)
            template = "Universal_request_template.pdf"
            output = "Universal_request.pdf"
            pdf.fill(template, output)
            print("bah")
            msg.body = "Here is the request form for beam time"
            with app.open_resource("TAMU_request.pdf") as fp:
                msg.attach("TAMU_request.pdf", "TAMU_request/pdf", fp.read())
        if facility == 'LBNL':
            # msg.recipients = ['88beamrequest@lbl.gov']
            msg.body = pdf.mail()
        # mail.send(msg)
        # print(msg)
        return jsonify({'success': True, 'msg': 'Mail sent!'}), 200
    except Exception as e:
        print(e)
        return jsonify({'success': False, 'msg': str(e)}), 404