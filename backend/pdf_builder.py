import os
import pdfrw
import copy
from datetime import datetime
from fpdf import FPDF

ANNOT_KEY = '/Annots'
ANNOT_FIELD_KEY = '/T'
ANNOT_VAL_KEY = '/V'
ANNOT_RECT_KEY = '/Rect'
SUBTYPE_KEY = '/Subtype'
WIDGET_SUBTYPE_KEY = '/Widget'

class FormBuilder():
    def __init__(self, form):
        self.form = form

    def fill(self, template, output):
        template_pdf = pdfrw.PdfReader(template)
        annotations = template_pdf.pages[0][ANNOT_KEY]
        for annotation in annotations:
            if annotation[SUBTYPE_KEY] == WIDGET_SUBTYPE_KEY:
                if annotation[ANNOT_FIELD_KEY]:
                    key = annotation[ANNOT_FIELD_KEY][1:-1]
                    if key in self.form.keys():
                        annotation.update(
                            pdfrw.PdfDict(V='{}'.format(self.form[key]))
                        )
        template_pdf.Root.AcroForm.update(pdfrw.PdfDict(NeedAppearances=pdfrw.PdfObject('true')))
        pdfrw.PdfWriter().write(output, template_pdf)

    def mail(self):
        # if self.form['startDate1'] != "":
        #     date = datetime.strptime(self.form['startDate1'], '%Y-%m-%dT%H:%M:%S.%fZ')
        #     self.form['startDate1'] = date.strftime('%m/%d/%Y')
        # if self.form['startDate2'] != "":
        #     date = datetime.strptime(self.form['startDate2'], '%Y-%m-%dT%H:%M:%S.%fZ')
        #     self.form['startDate2'] = date.strftime('%m/%d/%Y')
        if self.form['date'] != "":
            date = datetime.strptime(self.form['date'], '%Y-%m-%dT%H:%M:%S.%fZ')
            self.form['date'] = date.strftime('%m/%d/%Y')
        if self.form['alternateDate'] != "":
            date = datetime.strptime(self.form['alternateDate'], '%Y-%m-%dT%H:%M:%S.%fZ')
            self.form['alternateDate'] = date.strftime('%m/%d/%Y')

        body = "Principal Investigator Name: " + self.form['name'] + "\n\n\n"
        body += "Principal Investigator Organization: " + self.form['company'] + "\n\n\n"
        body += "Principal Investigator E-mail: " + self.form['email'] + "\n\n\n"
        body += "Principal Investigator Address:" + self.form['address'] + "\n\n\n"
        body += "Principal Investigator Office Phone: " + self.form['officePhone'] + "\n\n\n"
        body += "Principal Investigator Cell Phone During Experiment: " + self.form['cell'] + "\n\n\n"
        body += "Contract/Financial Point of Contact Name: " + self.form['financierName'] + "\n\n\n"
        body += "Contract/Financial Point of Contact E-mail: " + self.form['financierEmail'] + "\n\n\n"
        body += "Contract/Financial Point of Contact Telephone: " + self.form['financierPhone'] + "\n\n\n"
        body += "Title of Experiment/Proposal: " + self.form['title'] + "\n\n\n"
        body += "Abstract of Experiment/Proposal: " + self.form['abstract'] + "\n\n\n"
        body += "Desired Start Date of Run: " + self.form['date'] + "\n\n\n"
        body += "Alternate Start Date of Run: " + self.form['alternateDate'] + "\n\n\n"
        body += "Total Tune & Run Hours Needed: " + self.form['hours'] + "\n\n\n"
        body += "Target Material(s) and Thickness: " + self.form['targetMaterials'] + "\n\n\n"
        # body += "Funding Source: " + self.form['fundingSource'] + "\n\n\n"
        body += "Potential Safety Concerns: " + self.form['safetyConcerns'] + "\n\n\n"
        body += "Type of Beam Desired: " + self.form['beamType'] + "\n\n\n"
        body += "Special Request Ions: " + self.form['specialIons'] + "\n\n\n"
        body += "Desired Energy: " + self.form['energies'] + "\n\n\n"
        body += "Desired Intensity/Flux: " + self.form['desiredIntensity'] + "\n\n\n"
        body += "Will the run be conducted in air or vacuum?: " + self.form['airOrVacuum'] + "\n\n\n"
        body += "Does this work have export control restrictions?: " + self.form['controlRestrictions'] + "\n\n\n"
        body += "Are all electrical/electronic equipment that will be used onsite electrically safe? " + self.form['electricallySafe'] + "\n\n\n"
        body += "List the names of ALL personnel participating in the experiment: " + self.form['personnel'] + "\n\n\n"
        body += "Comments: " + self.form['comments'] + "\n\n\n"

        return body