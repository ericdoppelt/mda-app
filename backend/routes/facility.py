from flask import jsonify, request, json
from flask_jwt_extended import jwt_required
from datetime import timedelta, datetime

from main import app, jwt
from setup.extensions import db
from models import Organization



@app.route('/facility', methods=['GET'])
def facilities():
    myList = []
    facilities = Organization.query.filter_by(org_type='facility').all()
    for entry in facilities:
            entry_info = {'name': entry.name,
            'abbreviation': entry.abbrv, 'id': entry.id}
            myList.append(entry_info)
    return jsonify({'entries' : myList})