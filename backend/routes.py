from main import app, bcrypt
from models import Test, Users
from flask import jsonify, request, json
#from flask_jwt_extended import (create_access_token)
#from flask_login import LoginManager
from sqlalchemy import func
from extensions import db

@app.route('/time', methods=['GET'])
def get_current_time():
    sample = Test.query.first()
    sample = sample.text
    return jsonify({'time': sample})

@app.route('/register', methods=['POST'])
def register():
    #username = request.get_json()['username']
    username = "test"
    password = "12345"
    first_name = "John"
    last_name = "Doe"

    result = ""

    user = Users.query\
        .filter(func.lower(Users.username)==func.lower(username)).first()

    if not user:
        user = Users(
            username = str(username),
            password = str(password), #bcrypt.generate_password_hash(request.get_json(['password']).decode('utf-8')),
            first_name = str(first_name), #request.get_json()['first_name'],
            last_name = str(last_name) #request.get_json()['last_name']
        )
        try:
            db.session.add(user)
            db.session.commit()
            result = {
                'first_name' : user.first_name,
                'last_name'  : user.last_name
            }
        except:
            result = {'error' : "Unable to register user"}

    else:
        result = {'error' : "User already registered, please login"}

    return jsonify({'result': result})

@app.route('/login', methods=['POST'])
def login():
    username = request.get_json()['username']
    password = request.get_json()['password']
    # username = "mm92"
    # password = "12345"
    result = ""

    user = Users.query.filter_by(username=username).first()

    if not user:
        result = {'success' : "false",
        'error' : "Incorrect username"}
    # elif bcrypt.check_password_hash(pass_test, password):
    #     result = {'first_name' : user.first_name,
    #     'last_name' : user.last_name}
    elif user.password == password:
        result = {'success' : "true",
        'error' : ""}
    else:
        result = {'success' : "true",
        'error' : "Incorrect password"}

    return jsonify({'result': result})