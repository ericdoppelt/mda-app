import time
from flask import Flask
from extensions import db
from models import Test

app = Flask(__name__)

app.config.from_pyfile("config.py")

db.init_app(app)

import routes