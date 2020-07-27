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
                    totalHours = energyHours)
    entry.create_request()
    request_id = entry.id
    if form['facility'] == 'TAMU':
        facility_form = TAMU(request_id = request_id,
                            bad_dates = form['badDates'])
        facility_form.create_request()

    if form['facility'] == 'LBNL':
        if form['alternateDate'] == "":
            form['alternateDate'] = None
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
        form['signDate'] = datetime.today().strftime("%m/%d/%Y")
        template = ""
        output = ""
        pdf = FormBuilder(form)
        msg = Message("Send Request Form Demo", cc=[form['email']])
        # msg.recipients = ['edopp4182@gmail.com']
        if facility == 'TAMU':
            # msg.recipients = ['clark@comp.tamu.edu']
            form['signature'] = form['name']
            if form['date'] != "":
                date = datetime.strptime(form['date'], '%Y-%m-%dT%H:%M:%S.%fZ')
                form['date'] = date.strftime('%m/%d/%Y')
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
            template = "TAMU_request_template.pdf"
            output = "TAMU_request.pdf"
            pdf.fill(template, output)
            msg.body = "Here is the request form for beam time"
            with app.open_resource("TAMU_request.pdf") as fp:
                msg.attach("TAMU_request.pdf", "TAMU_request/pdf", fp.read())
        if facility == 'LBNL':
            pass
            # msg.recipients = ['88beamrequest@lbl.gov']
            # msg.body = pdf.mail()
        if facility == 'MSU':
            # msg.recipients = ['88beamrequest@lbl.gov']
            if form['date'] != "":
                date = datetime.strptime(form['date'], '%Y-%m-%dT%H:%M:%S.%fZ')
                form['date'] = date.strftime('%m/%d/%Y')
            template = "Universal_request_template.pdf"
            output = "Universal_request.pdf"
            pdf.fill(template, output)
            msg.body = "Here is the request form for beam time"
            with app.open_resource("Universal_request.pdf") as fp:
                msg.attach("Universal_request.pdf", "Universal_request/pdf", fp.read())
        if facility == 'NSRL':
            # msg.recipients = ['88beamrequest@lbl.gov']
            if form['date'] != "":
                date = datetime.strptime(form['date'], '%Y-%m-%dT%H:%M:%S.%fZ')
                form['date'] = date.strftime('%m/%d/%Y')
            template = "Universal_request_template.pdf"
            output = "Universal_request.pdf"
            pdf.fill(template, output)
            msg.body = "Here is the request form for beam time"
            with app.open_resource("Universal_request.pdf") as fp:
                msg.attach("Universal_request.pdf", "Universal_request/pdf", fp.read())
        # mail.send(msg)
        username = get_jwt_identity()
        add_request(form, username)

        return jsonify({'success': True, 'msg': 'Mail sent!'}), 200
    except Exception as e:
        print(e)
        return jsonify({'success': False, 'msg': str(e)}), 404