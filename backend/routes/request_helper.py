import os
import pdfrw
import copy
import numpy as np
from datetime import datetime
from fpdf import FPDF
from flask_mail import Message

from models import (requests, LBNL, TAMU, NSRL)
from main import app


ANNOT_KEY = '/Annots'
ANNOT_FIELD_KEY = '/T'
ANNOT_VAL_KEY = '/V'
ANNOT_RECT_KEY = '/Rect'
SUBTYPE_KEY = '/Subtype'
WIDGET_SUBTYPE_KEY = '/Widget'

def attach(beamRequest, msg, rangeId, date, idx, stringIons):
    idx = str(idx)

    if beamRequest.facility == 'TAMU':
        # msg.recipients = ['clark@comp.tamu.edu']

        baseName = 'routes/request_forms/TAMU/'
        extraInfo = TAMU.query.filter_by(request_id=beamRequest.id).first()
        dictReq = beamRequest.__dict__
        dictReq['blocks'] = np.ceil(np.sum(dictReq['hoursOn']) / 8)
        dictReq['cocktail'] = stringIons
        dictReq['badDates'] = extraInfo.badDates
        template = "routes/TAMU_request_template.pdf"
        addName = beamRequest.title.replace(" ", "_") + '_' + idx
        output = baseName + addName + '.pdf'
        fill(dictReq, template, output)

        with app.open_resource(output) as fp:
            msg.attach(addName + '.pdf', addName + '/pdf', fp.read())


    if beamRequest.facility == 'LBNL':
        # msg.recipients = ['88beamrequest@lbl.gov']

        baseName = 'routes/request_forms/LBNL/'
        extraInfo = LBNL.query.filter_by(request_id=beamRequest.id).first()
        text = lbnl(beamRequest, extraInfo)
        addName = beamRequest.title.replace(" ", "_") + '_' + idx
        filename = baseName + addName + '.txt'
        text_file = open(filename + '.txt', "w+")
        text_file.write(text)
        text_file.close()

        with app.open_resource(filename + '.txt') as fp:
            msg.attach(addName + '.txt', "text/plain", fp.read())

    if beamRequest.facility == 'NSRL':
        # msg.recipients = ['sivertz@lbl.gov']
        
        baseName = 'routes/request_forms/NSRL/'
        extraInfo = NSRL.query.filter_by(request_id=beamRequest.id).first()
        baseDict = beamRequest.__dict__
        extraDict = extraInfo.__dict__
        dictReq = {**baseDict, **extraDict}
        dictReq['cocktail'] = stringIons
        template = "routes/NSRL_request_template.pdf"
        addName = beamRequest.title.replace(" ", "_") + '_' + idx
        output = baseName + addName + '.pdf'
        fill(dictReq, template, output)

        with app.open_resource(output) as fp:
            msg.attach(addName + '.pdf', addName + '/pdf', fp.read())

    if beamRequest.facility == 'MSU':
        # msg.recipients = ['88beamrequest@lbl.gov']
        
        baseName = 'routes/request_forms/MSU/'
        dictReq = beamRequest.__dict__
        dictReq['cocktail'] = stringIons
        template = "routes/Universal_request_template.pdf"
        addName = beamRequest.title.replace(" ", "_") + '_' + idx
        output = baseName + addName + '.pdf'
        fill(dictReq, template, output)

        with app.open_resource(output) as fp:
            msg.attach(addName + '.pdf', addName + '/pdf', fp.read())

    

    return msg

def fill(form, template, output):
    template_pdf = pdfrw.PdfReader(template)
    for page in template_pdf.pages:
        annotations = page[ANNOT_KEY]
        for annotation in annotations:
            if annotation[SUBTYPE_KEY] == WIDGET_SUBTYPE_KEY:
                if annotation[ANNOT_FIELD_KEY]:
                    key = annotation[ANNOT_FIELD_KEY][1:-1]
                    if key in form.keys():
                        annotation.update(
                            pdfrw.PdfDict(V='{}'.format(form[key]))
                        )
    template_pdf.Root.AcroForm.update(pdfrw.PdfDict(NeedAppearances=pdfrw.PdfObject('true')))
    pdfrw.PdfWriter().write(output, template_pdf)

def lbnl(form, extraInfo):

    body = "Principal Investigator Name: " + form.name + "\n\n\n"
    body += "Principal Investigator Organization: " + form.company + "\n\n\n"
    body += "Principal Investigator E-mail: " + form.email + "\n\n\n"
    body += "Principal Investigator Address:" + form.address + "\n\n\n"
    body += "Principal Investigator Office Phone: " + extraInfo.officePhone + "\n\n\n"
    body += "Principal Investigator Cell Phone During Experiment: " + form.cell + "\n\n\n"
    body += "Contract/Financial Point of Contact Name: " + form.financierName + "\n\n\n"
    body += "Contract/Financial Point of Contact E-mail: " + form.financierEmail + "\n\n\n"
    body += "Contract/Financial Point of Contact Telephone: " + form.financierPhone + "\n\n\n"
    body += "Title of Experiment/Proposal: " + form.title + "\n\n\n"
    body += "Abstract of Experiment/Proposal: " + extraInfo.abstract + "\n\n\n"
    body += "Desired Start Date of Run: " + form.scheduled_start + "\n\n\n"
    body += "Alternate Start Date of Run: " + extraInfo.alternateDate + "\n\n\n"
    body += "Total Tune & Run Hours Needed: " + form.hours + "\n\n\n"
    body += "Target Material(s) and Thickness: " + extraInfo.targetMaterials + "\n\n\n"
    # body += "Funding Source: " + form['fundingSource'] + "\n\n\n"
    body += "Potential Safety Concerns: " + extraInfo.safetyConcerns + "\n\n\n"
    body += "Type of Beam Desired: " + form.beamType + "\n\n\n"
    body += "Special Request Ions: " + form.specialIons + "\n\n\n"
    body += "Desired Energy: " + extraInfo.energies + "\n\n\n"
    body += "Desired Intensity/Flux: " + extraInfo.desiredIntensity + "\n\n\n"
    body += "Will the run be conducted in air or vacuum?: " + extraInfo.airOrVacuum + "\n\n\n"
    body += "Does this work have export control restrictions?: " + extraInfo.controlRestrictions + "\n\n\n"
    body += "Are all electrical/electronic equipment that will be used onsite electrically safe? " + extraInfo.electricallySafe + "\n\n\n"
    body += "List the names of ALL personnel participating in the experiment: " + form.personnel + "\n\n\n"
    body += "Comments: " + form.comments + "\n\n\n"

    return body