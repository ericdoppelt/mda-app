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






@app.route('/api/calendar', methods=['POST'])
def entries():
    myList = []
    entries = Calendar.query.all()
    for entry in entries:
        if entry.private != True:
            startDate = entry.startDate.strftime("%Y-%m-%dT%H:%M")
            entry_info = {'username': entry.username,
            'facility': entry.facility, 'integrator': entry.integrator, 'startDate': startDate,
            'totalTime': entry.totalTime, 'requestId' : entry.requestId}
            myList.append(entry_info)
    return jsonify({'entries' : myList})

@app.route('/api/calendar/personal', methods=['POST'])
@jwt_required
def personal_entries():
    username = get_jwt_identity()

    myList = []
    entries = Calendar.query.filter_by(username=username).all()
    for entry in entries:
        startDate = entry.startDate.strftime("%Y-%m-%dT%H:%M")
        entry_info = {'username': entry.username,
        'facility': entry.facility, 'integrator': entry.integrator, 'startDate': startDate,
        'totalTime': entry.totalTime, 'requestId' : entry.requestId}
        myList.append(entry_info)
    return jsonify({'entries' : myList})


@app.route('/api/calendar-entry', methods=['POST'])
@jwt_required
def create_entry():

    req = request.get_json()
    result = ""

    try:
        entry = Calendar(
            username = req['username'],
            facility = req['facility'],
            integrator = req['integrator'],
            totalTime = req['totalTime'],
            startDate = req['startDate'],
            private = req['private'],
            title = req['title']
        )
        result = entry.create_entry()

    except Exception as e:
        result = {'error' : str(e),
        'success' : False}

    return result

@app.route('/api/calendar/delete', methods=['DELETE'])
@jwt_required
def delete_calendar():
    result = ""
    try:
        req = request.get_json()

        entry = Calendar.query.filter_by(id=req['id']).first()

        if entry.requestId is not None:
            try:
                beamReq = requests.query.filter_by(id=entry.requestId).first()
                beamReq.status = "Approved"
                beamReq.scheduled_start = None

                msg = Message("Beam Time Request Date Rescinded")
                msg.recipients = [beamReq.email]
                
                msg.body = "Your beam time request " + beamReq.title
                msg.body += " has had it's scheduled date rescinded.\n\n"
                msg.body += "ISEEU Team"

                mail.send(msg)
            except:
                pass

        Calendar.query.filter_by(id=req['id']).delete()
        db.session.commit()

        result = {'error' : "",
        'success' : True}

    except Exception as e:
        result = {'error' : str(e),
        'success' : False}
    
    return result

def add_calendar(beam_request):
    result = ""

    try:
        entry = Calendar(
            username = beam_request.username,
            facility = beam_request.facility,
            integrator = beam_request.integrator,
            totalTime = beam_request.hours,
            startDate = beam_request.start,
            private = False,
            title = beam_request.title
        )
        result = entry.create_entry()

    except Exception as e:
        result = {'error' : str(e),
        'success' : False}

    return result