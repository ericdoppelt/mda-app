import time
from flask import Flask
from extensions import db
from models import Test
from flask_cors import CORS
from datetime import datetime
from flask_bcrypt import Bcrypt


app = Flask(__name__)
cors = CORS(app)

app.config.from_pyfile("config.py")

db.init_app(app)
bcrypt = Bcrypt(app)
#jwt = JWTManager(app)
#login = LoginManager(app)

import routes