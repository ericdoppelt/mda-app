from main import app, bcrypt
from models import Test, Users
from flask import jsonify, request, json
from flask_login import current_user, login_required, login_user, logout_user
#from flask_jwt_extended import (create_access_token)
#from flask_login import LoginManager
from sqlalchemy import func
from extensions import db
#from werkzeug.security import generate_password_hash, check_password_hash

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
                'last_name'  : user.last_name
            }
        except Exception as e:
            print(e)
            result = {'error' : "Unable to register user"}

    else:
        result = {'error' : "User already registered, please login"}

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
        result = {'success' : True,
        'error' : ""}
        login_user(user)
    else:
        result = {'success' : False,
        'error' : "Incorrect password"}

    return jsonify(result)

@app.route('/user/<username>', methods=['GET', 'POST'])
@login_required
def user(username):
    print("accessed")
    account_info = ""
    if request.method == 'POST':
        user = Users.query.filter_by(username=username).first()
        account_info = {'id': user.id, 'user': user.username, 
        'password': user.password, 'first_name': user.first_name, 'last_name': user.last_name, 
        'affiliation': user.affiliation, 'user_type': user.user_type, 'phone': user.phone,
        'email': user.email}
    return account_info

@app.route('/logout')
def logout():
    logout_user()
    return True