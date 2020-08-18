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

# Test for database, all this other stuff can be deleted
@app.route('/api/time', methods=['GET'])
def get_current_time():
    sample = Test.query.first()
    sample = sample.text
    return jsonify({'time': sample})

# @app.route('/api/register', methods=['POST'])
# def register():
#     req = request.get_json()
#     username = req['username']
#     password = req['password']
#     result = ""

#     user = Users.query\
#         .filter(func.lower(Users.username)==func.lower(username)).first()

#     if not user:
#         user = Users(
#             username = username,
#             first_name = req['first_name'],
#             last_name = req['last_name'],
#             affiliation = req['affiliation'],
#             user_type = req['type'],
#             phone = req['phone'],
#             email = req['email']
#         )
#         user.set_password(password)
#         result = user.register_user()

#     else:
#         result = {'error' : "User already registered, please login",
#         'success' : False}

#     return jsonify(result)

# @app.route('/api/login', methods=['POST'])
# def login():
#     username = request.get_json()['username']
#     password = request.get_json()['password']
#     result = ""

#     user = Users.query.filter_by(username=username).first()

#     if not user:
#         result = {'success' : False,
#         'error' : "Incorrect username"}
#     elif user.check_password(password):

#         expires = timedelta(hours=12)
#         access_token = create_access_token(identity = username, expires_delta=expires)
#         add_token_to_database(access_token, app.config['JWT_IDENTITY_CLAIM'])
#         result = {'success' : True,
#         'error' : "",
#         'access_token': access_token}
#     else:
#         result = {'success' : False,
#         'error' : "Incorrect password"}

#     return jsonify(result)

# @app.route('/api/user', methods=['GET', 'POST'])
# @jwt_required
# def user():
#     account_info = ""
#     username = get_jwt_identity()
#     if request.method == 'POST':
#         user = Users.query.filter_by(username=username).first()
#         account_info = {'id': user.id, 'user': user.username,
#         'password': user.password, 'first_name': user.first_name, 'last_name': user.last_name,
#         'affiliation': user.affiliation, 'user_type': user.user_type, 'phone': user.phone,
#         'email': user.email}
#     return account_info








# @jwt.token_in_blacklist_loader
# def check_if_token_revoked(decoded_token):
#     return is_token_revoked(decoded_token)

# # Endpoint for revoking the current users access token
# @app.route('/api/logout', methods=['DELETE'])
# @jwt_required
# def logout():
#     username = get_jwt_identity()
#     try:
#         revoke_user_tokens(username)
#         return jsonify({'success': True, 'msg': 'Tokens revoked'}), 200
#     except TokenNotFound:
#         return jsonify({'success': False, 'msg': 'The specified token was not found'}), 404

# # TODO delete or change for production, development purposes only
# @app.route('/api/deleteuser/<username>', methods=['DELETE'])
# def delete(username):
#     try:
#         Users.query.filter_by(username=username).delete()
#         db.session.commit()
#         return jsonify({'success': True, 'msg': 'User deleted'}), 200
#     except:
#         return jsonify({'success': False, 'msg': 'The specified user was not found'}), 404

