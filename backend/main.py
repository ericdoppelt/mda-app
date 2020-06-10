import time
from flask import Flask
from extensions import db
from flask_cors import CORS
from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_login import LoginManager


app = Flask(__name__)
cors = CORS(app)

app.config.from_pyfile("config.py")

db.init_app(app)
bcrypt = Bcrypt(app)
login = LoginManager(app)
#jwt = JWTManager(app)
#login = LoginManager(app)

import routes