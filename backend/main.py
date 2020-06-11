import time
from flask import Flask
from extensions import db, bcrypt, jwt
from flask_cors import CORS
from datetime import datetime



app = Flask(__name__)
cors = CORS(app)

app.config.from_pyfile("config.py")

db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)

import routes