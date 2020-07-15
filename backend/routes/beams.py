from flask import jsonify, request, json

from main import app, jwt
from setup.extensions import db
from models import Beams, Organization


@app.route('/beams', methods=['POST'])
def beams():
    myList = {}
    req = request.get_json()
    print(req)
    facility = Organization.query.filter_by(abbrv=req['facility']).one()
    beams = Beams.query.filter_by(org_id=facility.id).all()
    for beam in beams:
        if beam.ion in myList:
            myList[beam.ion].append(beam.amev)
        else:
            myList[beam.ion] = [beam.amev]
        # beam_info = {'ion': beam.ion,
        # 'mass': beam.mass, 'amev': beam.amev, 'max_energy': beam.max_energy,
        # 'max_energy_units': beam.max_energy_units, 'let': beam.let, 'let_units': beam.let_units,
        # 'let_peak': beam.let_peak, 'beam_range': beam.beam_range, 'range_peak': beam.range_peak, 'range_units': beam.range_units,
        # 'max_flux': beam.max_flux, 'max_flux_units': beam.max_flux_units, 'let_material': beam.let_material, 'air': beam.air}

    return myList