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






@app.route('/calendar', methods=['POST'])
def entries():
    myList = []
    entries = Calendar.query.all()
    for entry in entries:
        if entry.private != True:
            startDate = entry.startDate.strftime("%Y-%m-%dT%H:%M")
            entry_info = {'username': entry.username,
            'facility': entry.facility, 'integrator': entry.integrator, 'startDate': startDate,
            'totalTime': entry.totalTime}
            myList.append(entry_info)
    return jsonify({'entries' : myList})

@app.route('/calendar/personal', methods=['POST'])
@jwt_required
def personal_entries():
    username = get_jwt_identity()

    myList = []
    entries = Calendar.query.filter_by(username=username).all()
    for entry in entries:
        startDate = entry.startDate.strftime("%Y-%m-%dT%H:%M")
        entry_info = {'username': entry.username,
        'facility': entry.facility, 'integrator': entry.integrator, 'startDate': startDate,
        'totalTime': entry.totalTime}
        myList.append(entry_info)
    return jsonify({'entries' : myList})

@app.route('/calendar/tasks', methods=['GET', 'POST'])
@jwt_required
def tasks():
    if request.method == 'POST':
        req = request.get_json()
        modifyEntry = Calendar.query.filter_by(id=req['id']).first()
        modifyEntry.steps = req['steps']
        db.session.commit()

    eventArray = []
    username = get_jwt_identity()
    # today = datetime.now().strftime('%Y-%m-%d')
    entries = Calendar.query.filter(and_(Calendar.username==username, Calendar.startDate >= datetime.now())).all()
    # entries = Calendar.query.filter(Calendar.username==username).all()
    for entry in entries:
        print(entry.startDate)
        date = entry.startDate.strftime("%m/%d/%Y")
        time = entry.startDate.strftime("%I %p")
        adder = {"site" : entry.facility, "date" : date,
                "time" : time, "integrator" : entry.integrator,
                "steps" : entry.steps, "id" : entry.id, "startDate" : entry.startDate}
        eventArray.append(adder)
    return jsonify({'eventArray' : eventArray})


@app.route('/calendar-entry', methods=['POST'])
# @jwt_required
def create_entry():

    username = get_jwt_identity()
    req = request.get_json()
    result = ""

    # date = datetime.strptime(form['date'], '%Y-%m-%dT%H:%M:%S.%fZ')

    try:
        entry = Calendar(
            username = req['username'], # username
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

def add_calendar(beam_request):
    result = ""

    try:
        print(beam_request.facility)
        print(beam_request.username)
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
    print(result)

    return result