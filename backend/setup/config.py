import os 
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
SECRET_KEY = os.environ.get('SECRET_KEY')
SQLALCHEMY_TRACK_MODIFICATIONS = False
JWT_BLACKLIST_ENABLED = True
JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']
#EMAIL SETTINGS
MAIL_SERVER='smtp.gmail.com'
MAIL_PORT=465
MAIL_USE_SSL=True
MAIL_USERNAME = 'app.MDA2020@gmail.com'
MAIL_PASSWORD = os.environ.get('EMAIL_PASSWORD')
MAIL_DEFAULT_SENDER = 'app.MDA2020@gmail.com'