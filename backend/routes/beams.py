from flask import jsonify, request, json

from main import app, jwt
from setup.extensions import db
from models import Beams, Organization

# Gets all beams for a facility
@app.route('/api/beams', methods=['POST'])
def beams():
    myList = {}
    req = request.get_json()
    facility = Organization.query.filter_by(abbrv=req['facility']).one()
    beams = Beams.query.filter_by(org_id=facility.id).all()
    for beam in beams:
        if beam.amev in myList:
            myList[beam.amev].append(beam.ion)
        else:
            myList[beam.amev] = [beam.ion]

    return myList