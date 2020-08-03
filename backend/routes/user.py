import copy
import string
import random
from sqlalchemy import and_, or_, between, func, inspect
from flask import jsonify, request, json
from flask_mail import Message
from flask_jwt_extended import (create_access_token,
create_refresh_token, jwt_required,
get_jwt_identity, get_jti)
from datetime import timedelta, datetime
from sqlalchemy import and_, or_

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
            email = req['email'],
            isAuthenticatedAdmin = False,
            isAdmin = False,
            isAuthenticatedIntegrator = False
        )
        user.set_password(password)
        result = user.register_user()

    else:
        result = {'error' : "User exists, please login!",
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
        if user.isAuthenticatedIntegrator:
            if user.isAuthenticatedAdmin:
                integrator_token = False
                if user.user_type == 'Integrator':
                    integrator_token = True
                expires = timedelta(hours=12)
                access_token = create_access_token(identity = username, expires_delta=expires)
                add_token_to_database(access_token, app.config['JWT_IDENTITY_CLAIM'])
                result = {'success' : True,
                'error' : "",
                'access_token': access_token, 'integrator_token' : integrator_token}
            else:
                result = {'success' : False,
                'error' : "User not authenticated by admin"}
        else:
            result = {'success' : False,
            'error' : "User not authenticated by integrator"}
    else:
        result = {'success' : False,
        'error' : "Incorrect password"}

    return jsonify(result)

@app.route('/user', methods=['GET', 'POST'])
@jwt_required
def user():
    account_info = ""

    try:
        if request.method == 'POST':
            req = request.get_json()
            username = req['username']
        else:
            username = get_jwt_identity()

        user = Users.query.filter_by(username=username).first()
        account_info = {'success' : True, 'id': user.id, 'user': user.username,
        'first_name': user.first_name, 'last_name': user.last_name,
        'affiliation': user.affiliation, 'user_type': user.user_type, 'phone': user.phone,
        'email': user.email, 'isAdmin' : user.isAdmin, 'isAuthenticatedAdmin' : user.isAuthenticatedAdmin,
        'isAuthenticatedIntegrator' : user.isAuthenticatedIntegrator}
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
            result = { 'success': False,
            'error' : "Incorrect password"}

    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}

    return jsonify(result)

@app.route('/user/forgot-username', methods=['POST'])
def forgot_username():
    result = ""

    try:
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
            msg.body += "\n\n\nThanks,\nThe ISEEU Team"
            mail.send(msg)
            result = {'success' : True,
            'error' : ""}

    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}

    return jsonify(result)

def password_generator(length=8):
    # create alphanumerical from string constants
    LETTERS = string.ascii_letters
    NUMBERS = string.digits  
    PUNCTUATION = string.punctuation  
    printable = f'{LETTERS}{NUMBERS}{PUNCTUATION}'

    # convert printable from string to list and shuffle
    printable = list(printable)
    random.shuffle(printable)

    # generate random password and convert to string
    random_password = random.choices(printable, k=length)
    random_password = ''.join(random_password)
    return random_password

@app.route('/user/forgot-password', methods=['POST'])
def forgot_password():
    result = ""

    try:
        username = request.get_json()['username']

        user = Users.query.filter_by(username=username).first()

        if not user:
            result = {'success' : False,
            'error' : "Incorrect username"}
        else:
            password = password_generator(10)
            msg = Message("ISEEU Forgot Password")
            msg.recipients = [user.email]
            msg.body = "This is your new password. Please login and change it immediately.\n\n\n"
            msg.body += password
            msg.body += "\n\n\nThanks,\nThe ISEEU Team"
            mail.send(msg)
            user.set_password(password)
            result = user.register_user()

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

@app.route('/user/authenticate-user', methods=['GET', 'POST'])
@jwt_required
def authenticate_user():
    result = ""
    username = get_jwt_identity()

    try:
        user = Users.query.filter_by(username=username).first()
            
        if user.isAdmin or user.user_type == 'Integrator':
            pass
        else:
            return {'success' : False, 'error' : 'You must be an admin or integrator to access this method!'}

        if request.method == 'POST':
            req = request.get_json()

            username = req['username']
            userAuthenticate = Users.query.filter_by(username=username).first()

            if user.isAdmin is True:
                if user.user_type == 'Integrator':
                    userAuthenticate.isAuthenticatedIntegrator = True
                    userAuthenticate.isAuthenticatedAdmin = True
                else:
                    userAuthenticate.isAuthenticatedAdmin = True
            else:
                userAuthenticate.isAuthenticatedIntegrator = True

            db.session.commit()

        myList = []
        if user.isAdmin is True:
            if user.user_type == 'Integrator':
                users = Users.query.filter(or_(and_(Users.isAuthenticatedAdmin==False, Users.isAuthenticatedIntegrator==True), 
                and_(Users.isAuthenticatedIntegrator==False, Users.affiliation==user.affiliation))).all()
            else:
                users = Users.query.filter_by(isAuthenticatedAdmin=False, isAuthenticatedIntegrator=True).all()

        else:
            users = Users.query.filter_by(isAuthenticatedIntegrator=False, affiliation=user.affiliation).all()

        for user in users:
            myList.append({'id': user.id, 'user': user.username,
            'first_name': user.first_name, 'last_name': user.last_name,
            'affiliation': user.affiliation, 'user_type': user.user_type, 'phone': user.phone,
            'email': user.email})

        result = {'results' : myList}

    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}

    return jsonify(result)

@app.route('/user/deleteuser', methods=['DELETE'])
@jwt_required
def delete_user():
    try:
        username = get_jwt_identity()

        user = Users.query.filter_by(username=username).first()
        username = request.get_json()['username']
        if user.isAdmin or user.user_type == 'Integrator':
            if user.isAdmin:
                Users.query.filter_by(username=username).delete()
            else:
                Users.query.filter_by(username=username, affiliation=user.affilitation).delete()
            db.session.commit()
            return jsonify({'success': True}), 200

        else:
            return {'success' : False, 'error' : 'You must be an admin to access this method!'}
        
    except:
        return jsonify({'success': False, 'error': 'The specified user was not found'}), 500
