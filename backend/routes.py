
from flask import jsonify, request, json, make_response
from flask_mail import Message
from flask_jwt_extended import (create_access_token, 
create_refresh_token, jwt_required, 
get_jwt_identity, get_jti)
from sqlalchemy import func
from DateTime import DateTime
from datetime import timedelta

from main import app, bcrypt, jwt, mail
from extensions import db
from models import Test, Users, Calendar, TokenBlacklist
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
    

# TODO make jwt required after development
@app.route('/requestform', methods=['POST'])
#@jwt_required
def requestform():
    try:
        facility = request.get_json()['facility']
        template = ""
        output = ""
        form = request.get_json()
        pdf = FormBuilder(form)
        msg = Message("Send Request Form Demo", cc=form['senderEmail'])
        msg.recipients = ['robcyale@gmail.com']
        if facility == 'TAMU':
            # msg.recipients = ['clark@comp.tamu.edu']
            template = "TAMU_request_template.pdf"
            output = "TAMU_request.pdf"
            pdf.fill(template, output)
            msg.body = "Here is the request form for beam time"
            with app.open_resource("TAMU_request.pdf") as fp:
                msg.attach("TAMU_request.pdf", "TAMU_request/pdf", fp.read())
        if facility == 'LBNL':
            # msg.recipients = ['88beamrequest@lbl.gov']
            msg.body = pdf.mail()
        mail.send(msg)
        return jsonify({'success': True, 'msg': 'Mail sent!'}), 200
    except Exception as e:
        return jsonify({'success': False, 'msg': str(e)}), 404