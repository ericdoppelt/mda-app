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

# Create a range of time that an integrator has bought
@app.route('/api/integrator/set-range', methods=['POST'])
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
        entry = Ranges(org_id=myOrg.id, start_date=date, hours=req['hours'],
                        facility=req['facility'], scheduled=False)
        result = entry.create_range()

        return jsonify({'success': True}), 200

    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}

    return jsonify(result)

# Gets ranges
@app.route('/api/integrator/get-range', methods=['GET'])
@jwt_required
def get_range():
    username = get_jwt_identity()
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
            entry = {"facility" : rang.facility, "hours" : rang.hours,
            "startDate" : start, "endDate" : end, "id" : rang.id, "scheduled" : rang.scheduled}
            myList.append(entry)

        return {"ranges" : myList}, 200

    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}

    return jsonify(result)

# Sets priority for requests to be scheduled
# Handled in frontend so depreciated
@app.route('/api/request/priority', methods=['POST'])
@jwt_required
def set_priority():
    result = ""
    req = request.get_json()

    try:
        beam_requests = requests.query.filter(requests.id.in_(req['ids']))
        if req['add']:
            for form in beam_requests:
                form.priority = True
        else:
            for form in beam_requests:
                form.priority = False

        db.session.commit()
        
        result = {'success' : True}

    except Exception as e:
        print(e)
        result = {'error' : str(e),
        'success' : False}

    return result