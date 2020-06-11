
from flask import jsonify, request, json, make_response
from flask_login import current_user, login_required, login_user, logout_user
from flask_jwt_extended import (create_access_token, 
create_refresh_token, jwt_required, 
get_jwt_identity, get_jti)
from sqlalchemy import func
from DateTime import DateTime
from datetime import timedelta

from main import app, bcrypt, jwt
from extensions import db
from models import Test, Users, Calendar, TokenBlacklist
from blacklist_helpers import (
    is_token_revoked, add_token_to_database, get_user_tokens,
    revoke_token, unrevoke_token,
    prune_database
)
from exceptions import TokenNotFound

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
        try:
            db.session.add(user)
            db.session.commit()
            result = {
                'first_name' : user.first_name,
                'last_name'  : user.last_name,
                'success' : True
            }
        except Exception as e:
            print(e)
            result = {'error' : "Unable to register user",
            'success' : False}

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
def entry():
    entry_info = ""
    if request.method == 'POST':
        username = request.get_json()['username']
        entry = Calendar.query.filter_by(username=username).first()
        startDate = entry.startDate.strftime("%Y-%m-%d")
        cannotRun = entry.cannotRun.strftime("%Y-%m-%d")
        entry_info = {'username': entry.username, 
        'facility': entry.facility, 'integrator': entry.integrator, 'startDate': startDate,
        'totalTime': entry.totalTime, 'cannotRun': cannotRun}
    return entry_info

@jwt.token_in_blacklist_loader
def check_if_token_revoked(decoded_token):
    return is_token_revoked(decoded_token)

# Endpoint for revoking the current users access token
@app.route('/logout', methods=['DELETE'])
@jwt_required
def logout():
    print("accessed")
    auth_header = request.headers.get('Authorization')
    auth_token = auth_header.split(" ")[1]
    user_identity = get_jwt_identity()
    token_id = TokenBlacklist.query.filter_by(jti=get_jti(auth_token)).first()
    token_id = token_id.id
    try:
        revoke_token(token_id, user_identity)
        return jsonify({'success': True, 'msg': 'Token revoked'}), 200
    except TokenNotFound:
        return jsonify({'success': False, 'msg': 'The specified token was not found'}), 404