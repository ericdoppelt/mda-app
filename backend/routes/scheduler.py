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
from setup.exceptions import TokenNotFound
from pdf_builder import FormBuilder


@app.route('/integrator/set-range', methods=['POST'])
@jwt_required
def set_range():
    username = get_jwt_identity()
    req = request.get_json()
    result = ""

    try:
        user = Users.query.filter_by(username=username).first()
        if user.user_type != 'Integrator':
            raise Exception("You must be an integrator to view this page!")
        myOrg = Organization.query.filter_by(abbrv=user.affiliation).first()
        startDate = req['startDate']
        startTime = req['startTime']
        date = datetime.strptime(startDate, "%Y-%m-%dT%H:%M:%S.%fZ")
        time = datetime.strptime(startTime, "%Y-%m-%dT%H:%M:%S.%fZ")
        timeDelta = timedelta(hours = time.hour, minutes = time.minute)
        date = date + timeDelta
        print(date)
        entry = Ranges(org_id=myOrg.id, start_date=date, hours=req['hours'],
                        facility=req['facility'])
        result = entry.create_range()

        return jsonify({'success': True}), 200

    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}

    return jsonify(result)

@app.route('/integrator/get-range', methods=['GET'])
@jwt_required
def get_range():
    username = get_jwt_identity()
    req = request.get_json()
    result = ""

    try:
        user = Users.query.filter_by(username=username).first()
        if user.user_type != 'Integrator':
            raise Exception("You must be an integrator to view this page!")
        myOrg = Organization.query.filter_by(abbrv=user.affiliation).first()
        myList = []
        ranges = Ranges.query.filter_by(org_id=myOrg.id).all()
        for rang in ranges:
            timeDelta = timedelta(hours = rang.hours)
            end = rang.start_date + timeDelta
            start = rang.start_date.strftime("%Y-%m-%dT%H:%M:%S")
            end = end.strftime("%Y-%m-%dT%H:%M:%S")
            # startDate = rang.start_date.strftime("%m/%d/%Y")
            # startTime = rang.start_date.strftime("%I %p")
            # endDate = end.strftime("%m/%d/%Y")
            # endTime = end.strftime("%I %p")
            entry = {"facility" : rang.facility, "hours" : rang.hours,
            "startDate" : start, "endDate" : end, "id" : rang.id}
            myList.append(entry)

        return {"ranges" : myList}, 200

    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}

    return jsonify(result)