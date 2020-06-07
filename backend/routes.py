from main import app
from models import Test
from flask import jsonify

@app.route('/time', methods=['GET'])
def get_current_time():
    sample = Test.query.first_or_404()
    sample = sample.text
    print(sample)
    return jsonify({'time': sample})