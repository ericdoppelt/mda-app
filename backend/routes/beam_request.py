import copy
from flask import request, json, jsonify
from flask_mail import Message
from flask_jwt_extended import (jwt_required, get_jwt_identity)
from datetime import timedelta, datetime

from main import app, jwt, mail
from setup.extensions import db
from models import (Test, Users, Calendar, TokenBlacklist, Beams, Organization, requests,
                    Integrator, Ranges)

from .request_helper import FormBuilder


def add_request(form, username):

    if form['billingPO'] == "":
        form['billingPO'] = None
    ion_ids = []
    print(form)
    for i, ion in enumerate(form['ions']):
        beam = Beams.query.filter_by(ion=ion, amev=form['energies'][i]).one()
        ion_ids.append(beam.id)
    print(ion_ids)
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
                    beam_time = form['hours'],
                    username = username,
                    date_of_request = datetime.now(),
                    modified = False,
                    status = "Awaiting approval from integrator",
                    rejected = False)
    entry.create_request()

@app.route('/requestform', methods=['POST'])
# @jwt_required
def requestform():
    try:
        form = request.get_json()
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
            if badDates[0] != None:
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
            # msg.recipients = ['88beamrequest@lbl.gov']
            msg.body = pdf.mail()
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
        print(form)
        # username = form['username'] # TODO change get_jwt_identity()
        username = 'test123'
        add_request(form, username)

        return jsonify({'success': True, 'msg': 'Mail sent!'}), 200
    except Exception as e:
        print(e)
        return jsonify({'success': False, 'msg': str(e)}), 404