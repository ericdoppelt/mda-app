import os
import pdfrw
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

    def build(self):
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size=12)

        """
        Under Construction

        pdf.cell(200, 10, txt="Beam Time Parameters", ln=1, align="C")

        first_name_text = "First Name: " + first_name
        pdf.cell(200, 10, txt=first_name_text, ln=1, align="L")

        last_name_text = "Last Name: " + last_name
        pdf.cell(200, 10, txt=last_name_text, ln=1, align="L")

        company_text = "Company: " + company
        pdf.cell(200, 10, txt=company_text, ln=1, align="L")

        integrator_text = "Integrator: " + integrator
        pdf.cell(200, 10, txt=integrator_text, ln=1, align="L")

        total_hours_text = "Total Hours: " + str(total_hours)
        pdf.cell(200, 10, txt=total_hours_text, ln=1, align="L")

        start_date_text = "Start Date: " + start_date
        pdf.cell(200, 10, txt=start_date_text, ln=1, align="L")

        # TODO change when sent as a list of dates
        # cannot_run_text = "Dates we cannot run: " + ", ".join(self.cannot_run)
        cannot_run_text = "Dates we cannot run: " + cannot_run
        pdf.multi_cell(180, 10, txt=cannot_run_text, align="L")

        pdf.output("simple_demo.pdf") 
        """

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
        body = "Principal Investigator Name: " + self.form['investigatorName'] + "\n\n\n"
        body += "Principal Investigator Organization: " + self.form['investigatorOrg'] + "\n\n\n"
        body += "Principal Investigator E-mail: " + self.form['investigatorEmail'] + "\n\n\n"
        body += "Principal Investigator Address:" + self.form['investigatorAddress'] + "\n\n\n"
        body += "Principal Investigator Office Phone: " + self.form['investigatorOfficePhone'] + "\n\n\n"
        body += "Principal Investigator Cell Phone During Experiment: " + self.form['investigatorCell'] + "\n\n\n"
        body += "Contract/Financial Point of Contact Name: " + self.form['financierName'] + "\n\n\n"
        body += "Contract/Financial Point of Contact E-mail: " + self.form['financierEmail'] + "\n\n\n"
        body += "Contract/Financial Point of Contact Telephone: " + self.form['financierTelephone'] + "\n\n\n"
        body += "Title of Experiment/Proposal: " + self.form['experimentTitle'] + "\n\n\n"
        body += "Abstract of Experiment/Proposal: " + self.form['experimentAbstract'] + "\n\n\n"
        body += "Desired Start Date of Run: " + self.form['desiredStartDate'] + "\n\n\n"
        body += "Alternate Start Date of Run: " + self.form['alternateStartDate'] + "\n\n\n"
        body += "Total Tune & Run Hours Needed: " + self.form['totalHours'] + "\n\n\n"
        body += "Target Material(s) and Thickness: " + self.form['targetMaterials'] + "\n\n\n"
        body += "Funding Source: " + self.form['fundingSource'] + "\n\n\n"
        body += "Potential Safety Concerns: " + self.form['safetyConcerns'] + "\n\n\n"
        body += "Type of Beam Desired: " + self.form['beamType'] + "\n\n\n"
        body += "Special Request Ions: " + self.form['specialIons'] + "\n\n\n"
        body += "Desired Energy: " + self.form['desiredEnergy'] + "\n\n\n"
        body += "Desired Intensity/Flux: " + self.form['desiredIntensity'] + "\n\n\n"
        body += "Will the run be conducted in air or vacuum?: " + self.form['airOrVacuum'] + "\n\n\n"
        body += "Does this work have export control restrictions?: " + self.form['controlRestrictions'] + "\n\n\n"
        body += "Are all electrical/electronic equipment that will be used onsite electrically safe? " + self.form['electricallySafe'] + "\n\n\n"
        body += "List the names of ALL personnel participating in the experiment: " + self.form['personnel'] + "\n\n\n"
        body += "Comments: " + self.form['comments'] + "\n\n\n"

        return body

