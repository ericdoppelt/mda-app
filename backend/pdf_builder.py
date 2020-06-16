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

    def fill(self):
        REQUEST_TEMPLATE_PATH = 'TAMU_request_template.pdf'
        INVOICE_OUTPUT_PATH = 'TAMU_request.pdf'
        template_pdf = pdfrw.PdfReader(REQUEST_TEMPLATE_PATH)
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
        pdfrw.PdfWriter().write(INVOICE_OUTPUT_PATH, template_pdf)

