import copy
from flask import request, json, jsonify
from flask_mail import Message
from flask_jwt_extended import (jwt_required, get_jwt_identity)
from datetime import timedelta, datetime
from sqlalchemy import and_, or_, between, func, inspect

from main import app, jwt, mail
from setup.extensions import db
from models import (Test, Users, Calendar, TokenBlacklist, Beams, Organization, requests,
                    Integrator, Ranges, LBNL, TAMU, NSRL)

from .request_helper import attach

import linecache
import sys

# Adds a request to the database
def add_request(form, username):
    # Quick fix to map facilities to their facility ids, easier than a 
    # more complex query but should be changed
    IDs = {}
    IDs['TAMU'] = 3
    IDs['LBNL'] = 4
    IDs['NSRL'] = 5
    IDs['MSU'] = 6
    facId = IDs[form['facility']]

    # Comes in as "" instead of Null, so make sure that 
    # it is instead stored as null
    if form['billingPO'] == "":
        form['billingPO'] = None
    ion_ids = []
    shifts = []
    hoursOn = []
    hoursOff = []
    energyHours = []
    nsrlEnergy = []
    beamTime = 0

    # Messy way of getting beam id from a given ion. NSRL
    # is continuous so there is a different process
    if form['facility'] == 'NSRL':
        for i, energy in enumerate(form['energies']):
            hours = int(form['shifts'][i]) * int(form['hoursOn'][i])
            beamTime += hours

            for ion in form['ions'][i]:
                beams = Beams.query.filter(and_(Beams.ion==ion, Beams.amev>=energy)).all()
                beam = beams[0]
                # Quickfix for random error with getting multiple ions
                minAmev = beams[0].amev
                for b in beams:
                    if minAmev > b.amev:
                        beam = b
                        minAmev = b.amev
                ion_ids.append(beam.id)
                shifts.append(int(form['shifts'][i]))
                hoursOn.append(int(form['hoursOn'][i]))
                hoursOff.append(int(form['hoursOff'][i]))
                nsrlEnergy.append(int(energy))
                energyHours.append(hours)
    else:
        for i, energy in enumerate(form['energies']):
            hours = int(form['shifts'][i]) * int(form['hoursOn'][i])
            beamTime += hours
            for ion in form['ions'][i]:
                beam = Beams.query.filter_by(ion=ion, amev=energy, org_id=facId).one()
                ion_ids.append(beam.id)
                shifts.append(int(form['shifts'][i]))
                hoursOn.append(int(form['hoursOn'][i]))
                hoursOff.append(int(form['hoursOff'][i]))
                energyHours.append(hours)

    entry = requests(name = form['name'],
                    email = form['email'],
                    cell = form['cell'],
                    company = form['company'],
                    integrator = form['integrator'],
                    funding_contact = form['financierName'],
                    address = form['billingAddress'],
                    city = form['billingCity'],
                    state = form['billingState'],
                    zipcode = form['billingZip'],
                    approved_integrator = False,
                    approved_facility = True,
                    facility = form['facility'],
                    funding_cell = form['financierPhone'],
                    funding_email = form['financierEmail'],
                    start = form['date'],
                    ions = ion_ids,
                    comments = form['comments'],
                    po_number = form['billingPO'],
                    title = form['title'],
                    beam_time = beamTime,
                    username = username,
                    date_of_request = datetime.now(),
                    modified = False,
                    status = "Pending",
                    rejected = False,
                    shifts = shifts,
                    hoursOn = hoursOn,
                    hoursOff = hoursOff,
                    totalHours = energyHours,
                    personnel = form['personnel'])
    entry.create_request()
    request_id = entry.id
    # Each facility has extra info, so this fills that out
    if form['facility'] == 'TAMU':
        facility_form = TAMU(request_id = request_id,
                            bad_dates = form['badDates'])
        facility_form.create_request()

    if form['facility'] == 'LBNL':
        facility_form = LBNL(request_id = request_id,
                            address = form['address'],
                            officePhone = form['officePhone'],
                            abstract = form['abstract'],
                            alternateDate = form['alternateDate'],
                            targetMaterials = form['targetMaterials'],
                            safetyConcerns = form['safetyConcerns'],
                            beamType = form['beamType'],
                            specialIons = form['specialIons'],
                            specialEnergies = form['specialEnergies'],
                            desiredIntensity = form['desiredIntensity'],
                            airOrVacuum = form['airOrVacuum'],
                            controlRestrictions = form['controlRestrictions'],
                            electricallySafe = form['electricallySafe'])
        facility_form.create_request()

    if form['facility'] == 'NSRL':
        if form['isNasa'] == "":
            form['isNasa'] = None
        if form['endDate'] == "":
            form['endDate'] = None
        facility_form = NSRL(request_id = request_id,
                            endDate = form['endDate'],
                            experimentType = form['experimentType'],
                            isNasa = form['isNasa'],
                            let = form['let'],
                            beamSize = form['beamSize'],
                            maxDose = form['maxDose'],
                            energies = nsrlEnergy)
        facility_form.create_request()

# route for adding a request form to the database
@app.route('/api/requestform', methods=['POST'])
@jwt_required
def requestform():
    
    try:
        form = request.get_json()
        facility = form['facility']
        if form['date'] is None:
            raise Exception('You must fill out the start date')
        if facility == 'TAMU':
            # Signature for the form, depreciated
            form['signature'] = form['name']
            badDates = copy.deepcopy(form['badDates'])
            # Need to make bad dates an array of date objects
            if badDates is not []:
                for i, date in enumerate(badDates):
                    date = datetime.strptime(date, '%Y-%m-%dT%H:%M:%S.%fZ')
                    if i == 0:
                        form['badDates'] = [date]
                    else:
                        form['badDates'].append(date)
        # Frontend gives "" instead of null, needs to made null
        if facility == 'LBNL':
            if form['alternateDate'] == "":
                form['alternateDate'] = None
        username = get_jwt_identity()
        add_request(form, username)

        return jsonify({'success': True, 'msg': 'Mail sent!'}), 200
    except Exception as e:
        print(e)
        return jsonify({'success': False, 'msg': str(e)}), 500

# Creates an entry in the table for a beam request
def create_calendar_entry(req, reqId, rangeId, startDate, hours, energy):
    result = ""

    if reqId:
        title = req.title
        beam = True
    else:
        title = 'Downtime'
        beam = False

    entry = Calendar(
        username = req.username,
        facility = req.facility,
        integrator = req.integrator,
        totalTime = hours,
        startDate = startDate,
        private = False,
        title = title,
        requestId = reqId,
        rangeId = rangeId,
        beam = beam,
        energy = float(energy)
    )
    
    result = entry.create_entry()

    return result

# Gets the energies and beams from database
def getBeams(form):
    ions = {}
    if form.facility == 'NSRL':
        extraInfo = NSRL.query.filter_by(request_id=form.id).one()
        if form.ions != None or form.ions != []:
            for i, ion in enumerate(form.ions):
                beam = Beams.query.filter_by(id=ion).one()
                if extraInfo.energies[i] in ions:
                    ions[str(extraInfo.energies[i])].append(beam.ion)
                else:
                    ions[str(extraInfo.energies[i])] = [beam.ion]
    else:
        for i, ion in enumerate(form.ions):
            beam = Beams.query.filter_by(id=ion).one()
            if beam.amev in ions:
                ions[str(beam.amev)].append(beam.ion)
            else:
                ions[str(beam.amev)] = [beam.ion]

    return ions

# Sends an email to the tester of the request
def sendTesterMail(beamReq, beamMsgs):
    msg = Message("Beam Time Request Scheduled")
    msg.recipients = [beamReq.email]
    
    msg.body = "Your beam time request " + beamReq.title
    msg.body += " has been scheduled start on " + beamReq.scheduled_start.strftime('%m/%d/%Y')
    msg.body += " at " + beamReq.scheduled_start.strftime('%I %p') + "\n\n"
    msg.body += "Each energy has been scheduled for: \n\n"
    for beamMsg in beamMsgs:
        msg.body += beamMsg
    msg.body += "\n\n"
    msg.body += "Thanks and have a wonderful day!\n"
    msg.body += "The ISEEU Team"

    mail.send(msg)

# Gets the request ids and sends the request 
# to the integrator and testers
@app.route('/api/request/send-forms', methods=['POST'])
@jwt_required
def send_forms():
    
    try:
        username = get_jwt_identity()
        user = Users.query.filter_by(username=username).first()
        req = request.get_json()
        ids = req['ids']
        beamReqs = requests.query.filter(requests.id.in_(ids)).all()
        rang = Ranges.query.filter_by(id=req['rangeId']).first()
        rangeId = rang.id

        msg = Message("Send Request Form Demo")
        msg.recipients = [user.email]

        msg.body = user.affiliation + "requests the following energy cocktails at the specified times:\n\n"

        info = {}
        searchedBeams = {}
        for i, beamId in enumerate(req['ids']):
            if beamId is not None and beamId not in searchedBeams:
                beamReq = requests.query.filter_by(id=beamId).first()
                energy = req['energies'][i]
                searchedBeams[beamId] = beamReq
                info[int(beamId)] = []
                date = req['startDate'][i]
                beamReq.status = "Scheduled"
                beamReq.request_range = rangeId
                beamReq.scheduled_start = datetime.strptime(date, '%Y-%m-%dT%H:%M:%S.%fZ')

            start = datetime.strptime(req['startDate'][i], '%Y-%m-%dT%H:%M:%S.%fZ')
            end = datetime.strptime(req['endDate'][i], '%Y-%m-%dT%H:%M:%S.%fZ')
            delta = end - start
            hours = delta.seconds // 3600


            if beamId is not None:
                form = searchedBeams[beamId]
                energyMsg = str(req['energies'][i]) + " MeV \n"
                energyMsg += form.title + " at " + form.company + "\n"
                energyMsg += "scheduled for " + start.strftime('%m/%d/%Y')
                energyMsg += " at " + start.strftime('%I %p')
                energyMsg += " for " + str(hours) + " hours\n\n"
                info[int(beamId)].append(energyMsg)
                

                msg.body += str(req['energies'][i]) + " MeV \n"
                msg.body += form.title + " at " + form.company + "\n"
                msg.body += "scheduled for " + start.strftime('%m/%d/%Y')
                msg.body += " at " + start.strftime('%I %p')
                msg.body += " for " + str(hours) + " hours\n\n"

            else:
                msg.body += 'Downtime' + '\n'
                msg.body += "scheduled for " + start.strftime('%m/%d/%Y')
                msg.body += " at " + start.strftime('%I %p')
                msg.body += " for " + str(hours) + " hours\n\n"

            

            if rang.scheduled and beamId is not None:
                try:
                    entry = Calendar.query.filter_by(requestId=form.id, energy=energy).first()
                    if entry is None:
                        raise Exception("Could not find entry")
                    entry.startDate = req['dates'][i]
                    entry.hours = hours
                except:
                    create_calendar_entry(form, beamId, rangeId, start, hours, energy)
            elif beamId is not None:
                create_calendar_entry(form, beamId, rangeId, start, hours, energy)

        for i, form in enumerate(beamReqs):
            # setValues(form, req['dates'][i], rang.id)
            stringIons = []
            ions = getBeams(form)
            for key in ions:
                cocktail = key + ' MeV: ' + ', '.join(ions[key])
                stringIons.append(cocktail)
            # msg = attach(form, msg, rang.id, i, stringIons)
            sendTesterMail(form, info[form.id])

        msg.body += "Attached are the details of each request\n\n\n"

        msg.body += "Thank you and have a wonderful day!\n\n"
        msg.body += "The ISEEU Team"

        rang.scheduled = True
        db.session.commit()
        
        mail.send(msg)

        return jsonify({'success': True, 'msg': "Scheduled requests successfully"}), 200

    except Exception as e:
        print(e)
        return jsonify({'success': False, 'msg': str(e)}), 500