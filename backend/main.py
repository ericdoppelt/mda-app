import time
from flask import Flask
from extensions import db
from models import Test
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app)

app.config.from_pyfile("config.py")

db.init_app(app)

import routes