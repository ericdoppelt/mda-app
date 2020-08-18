from flask import jsonify, request, json

from main import app
from setup.extensions import db
from models import Organization, Integrator



@app.route('/api/integrator', methods=['GET'])
def get_integrators():
    myList = []

    try:
        integrators = Organization.query.filter_by(org_type='integrator').all()
        for org in integrators:
            myList.append(org.abbrv)
            
    except Exception as e:
        print(e)

    return {'integrators' : myList}