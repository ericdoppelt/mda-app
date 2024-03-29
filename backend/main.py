import time
from flask import Flask
from setup.extensions import db, bcrypt, jwt, mail
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
cors = CORS(app)

app.config.from_pyfile("setup/config.py")

db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)
mail.init_app(app)

# from . import routes
from routes import (beam_request, scheduler, user, calendar, requests, 
            beams, integrator, facility, the_rest)

# if __name__ == '__main__':
#     app.run(debug=False)