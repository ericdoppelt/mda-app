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

from .request_helper import FormBuilder


def add_request(form, username):
    IDs = {}
    IDs['TAMU'] = 3
    IDs['LBNL'] = 4
    IDs['NSRL'] = 5
    IDs['MSU'] = 6
    facId = IDs[form['facility']]

    if form['billingPO'] == "":
        form['billingPO'] = None
    ion_ids = []
    shifts = []
    hoursOn = []
    hoursOff = []
    energyHours = []
    nsrlEnergy = []
    beamTime = 0
    if form['facility'] == 'NSRL':
        for i, energy in enumerate(form['energies']):
            hours = int(form['shifts'][i]) * int(form['hoursOn'][i])
            beamTime += hours

            for ion in form['ions'][i]:
                beams = Beams.query.filter(and_(Beams.ion==ion, Beams.amev>=energy)).all()
                beam = beams[0]
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
                print(ion, energy, facId)
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
                    # energy = '',
                    funding_cell = form['financierPhone'],
                    funding_email = form['financierEmail'],
                    start = form['date'],
                    ions = ion_ids,
                    comments = form['comments'],
                    po_number = form['billingPO'],
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

@app.route('/requestform', methods=['POST'])
@jwt_required
def requestform():
    
    try:
        form = request.get_json()
        print(form)
        facility = form['facility']
        if facility == 'TAMU':
            form['signature'] = form['name']
            badDates = copy.deepcopy(form['badDates'])
            if badDates is not []:
                for i, date in enumerate(badDates):
                    date = datetime.strptime(date, '%Y-%m-%dT%H:%M:%S.%fZ')
                    if i != 0 or i != len(badDates) - 1:
                        form['badDates'] += ', '
                    if i == 0:
                        form['badDates'] = date.strftime('%m/%d/%Y')
                    else:
                        form['badDates'] += date.strftime('%m/%d/%Y')
        if facility == 'LBNL':
            if form['alternateDate'] == "":
                form['alternateDate'] = None
        username = get_jwt_identity()
        add_request(form, username)

        return jsonify({'success': True, 'msg': 'Mail sent!'}), 200
    except Exception as e:
        print(e)
        return jsonify({'success': False, 'msg': str(e)}), 500


@app.route('/request/send-forms', methods=['POST'])
@jwt_required
def send_forms():
    
    try:
        req = request.get_json()
        ids = req['ids']
        requests = requests.Beams.query.filter(requests.id.in_(ids)).all()

        msg = Message("Send Request Form Demo", cc=[req['email']])

        msg.body = "Here are the dates, times, and ions requested:\n\n"

        msg.body += "Attached are the details of each request\n\n"

        msg.body += ("Please do not reply to this email. Please email "
                    + req['email'] + " for questions.\n\n\n")

        msg.body += "Thanks and have a wonderful day!\n\n"
        msg.body += "ISEEU"
        if req['facility'] == 'TAMU':
            # msg.recipients = ['clark@comp.tamu.edu']

            baseName = 'request_forms/TAMU/'
            for i, form in enumerate(requests):
                extraInfo = TAMU.query.filter_by(request_id=form.id).first()
                form['badDates'] = extraInfo.badDates
                pdf = FormBuilder(form)
                template = "TAMU_request_template.pdf"
                output = baseName + form.company + '_' + i
                pdf.fill(template, output)

                with app.open_resource(output + '.pdf') as fp:
                    msg.attach(output + '.pdf', output + '/pdf', fp.read())
        if req['facility'] == 'LBNL':
            # msg.recipients = ['88beamrequest@lbl.gov']

            baseName = 'request_forms/LBNL/'
            for i, form in enumerate(requests):
                extraInfo = LBNL.query.filter_by(request_id=form.id).first()
                textBuilder = FormBuilder(form)
                text = textBuilder.lbnl(extraInfo)
                filename = baseName + form.company + '_' + i
                text_file = open(filename + '.txt', "w+")
                n = text_file.write()
                text_file.close()

                with app.open_resource(filename + '.txt') as fp:
                    msg.attach(filename + '.txt', filename + '/txt', fp.read())
        if req['facility'] == 'NSRL':
            # msg.recipients = ['88beamrequest@lbl.gov']
            
            baseName = 'request_forms/NSRL/'
            for i, form in enumerate(requests):
                extraInfo = NSRL.query.filter_by(request_id=form.id).first()
                textBuilder = FormBuilder(form)
                text = textBuilder.lbnl(extraInfo)
                filename = baseName + form.company + '_' + i
                text_file = open(filename + '.txt', "w+")
                n = text_file.write()
                text_file.close()

                with app.open_resource(filename + '.txt') as fp:
                    msg.attach(filename + '.txt', filename + '/txt', fp.read())
        print(msg)

    except Exception as e:
        print(e)
        return jsonify({'success': False, 'msg': str(e)}), 500