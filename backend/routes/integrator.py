from flask import jsonify, request, json

from main import app
from setup.extensions import db
from models import Organization, Integrator



@app.route('/integrator', methods=['GET'])
def get_integrators():
    myList = []

    try:
        integrators = Organization.query.filter_by(org_type='Integrator').all()
        for org in integrators:
            myList.append(org.abbrv)
        print(myList)
    except Exception as e:
        print(e)

    return {'integrators' : myList}