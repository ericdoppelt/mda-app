import copy
from sqlalchemy import and_, or_, between, func, inspect
from flask import jsonify, request, json
from flask_mail import Message
from flask_jwt_extended import (create_access_token,
create_refresh_token, jwt_required,
get_jwt_identity, get_jti)
from datetime import timedelta, datetime

from main import app, jwt, mail
from setup.extensions import db
from models import (Users, TokenBlacklist)
from blacklist_helpers import (
    is_token_revoked, add_token_to_database, get_user_tokens,
    revoke_token, unrevoke_token, revoke_user_tokens,
    prune_database
)
from setup.exceptions import TokenNotFound



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

@app.route('/user', methods=['GET'])
@jwt_required
def user():
    account_info = ""
    username = get_jwt_identity()
    try:
        user = Users.query.filter_by(username=username).first()
        account_info = {'success' : True, 'id': user.id, 'user': user.username,
        'first_name': user.first_name, 'last_name': user.last_name,
        'affiliation': user.affiliation, 'user_type': user.user_type, 'phone': user.phone,
        'email': user.email}
    except:
        account_info = {'success' : False, 'error' : 'unable to get user info'}
    return account_info

@app.route('/user/modify', methods=['POST'])
@jwt_required
def modify_user():
    result = ""
    username = get_jwt_identity()

    try:
        req = request.get_json()
        user = Users.query.filter_by(username=username).first()

        # iterable = copy.deepcopy(req)
        # for (key, value) in iterable.items():
        #     if value != "":
        #         if key == "financierName":
        #             req["funding_contact"] = value

        for attr, value in user.__dict__.items():
            if attr in req and req[attr] != "":
                setattr(user, attr, req[attr])

        db.session.commit()

        result = {'success' : True}
    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}

    return jsonify(result)


@app.route('/user/change-password', methods=['POST'])
@jwt_required
def change_password():
    result = ""
    username = get_jwt_identity()
    req = request.get_json()

    try:
        oldPassword = req['oldPassword']
        newPassword = req['newPassword']
        user = Users.query.filter_by(username=username).first()

        if user.check_password(oldPassword):
            user.set_password(newPassword)
            result = user.register_user()
        else:
            result = {'success' : False,
            'error' : "Incorrect password"}

    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}

    return jsonify(result)

@app.route('/user/forgot-username', methods=['POST'])
def forgot_username():
    result = ""
    email = request.get_json()['email']

    user = Users.query.filter_by(email=email).first()

    if not user:
        result = {'success' : False,
        'error' : "No user associated with that email"}
    else:
        msg = Message("ISEEU Username")
        msg.recipients = [user.email]
        msg.body = "Your ISEEU username is: \n\n"
        msg.body += user.username
        # mail.send(msg)
        print(msg)
        result = {'success' : True,
        'error' : ""}

    return jsonify(result)

@app.route('/user/forgot-password', methods=['POST'])
def forgot_password():
    link = "https://mda-phoenix.herokuapp.com/reset-password/"
    result = ""
    username = request.get_json()['username']

    user = Users.query.filter_by(username=username).first()

    if not user:
        result = {'success' : False,
        'error' : "Incorrect username"}
    else:
        msg = Message("ISEEU Password Reset")
        msg.recipients = [user.email]
        expires = timedelta(hours=1)
        access_token = create_access_token(identity = username, expires_delta=expires)
        add_token_to_database(access_token, app.config['JWT_IDENTITY_CLAIM'])
        msg.body = "Click the link below to reset your password. This link will expire in 1 hour.\n\n"
        msg.body += link + access_token
        # mail.send(msg)
        print(msg)
        result = {'success' : True,
        'error' : ""}

    return jsonify(result)

@app.route('/user/reset-password', methods=['GET', 'POST'])
@jwt_required
def reset_password():
    result = ""
    username = get_jwt_identity()

    try:
        req = request.get_json()
        user = Users.query.filter_by(username=username).first()

        user.set_password(req['password'])
        result = user.register_user()

        result = {'success' : True}
    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}

    return jsonify(result)


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