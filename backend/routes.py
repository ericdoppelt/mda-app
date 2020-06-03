from main import app
from models import Test

@app.route('/time')
def get_current_time():
    sample = Test.query.first_or_404()
    sample = sample.text
    print(sample)
    return {'time': sample}