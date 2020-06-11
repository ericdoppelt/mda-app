from main import db, bcrypt
from sqlalchemy.dialects.postgresql import JSON
from flask_login import UserMixin

        
class Test(db.Model):
    """Model for the stations table"""
    __tablename__ = 'test'

    id = db.Column(db.Integer, primary_key = True)
    text = db.Column(db.String())

    def __repr__(self):
        return "<User(id=%s, text=%s)>" % (self.id, self.text)

class Users(UserMixin, db.Model):
    """Model for the stations table"""
    __tablename__ = 'Users'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String())
    password = db.Column(db.String())
    first_name = db.Column(db.String())
    last_name = db.Column(db.String())
    affiliation = db.Column(db.String())
    user_type = db.Column(db.String())
    phone = db.Column(db.String())
    email = db.Column(db.String())
    pass_test = db.Column(db.LargeBinary())

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password.encode('utf-8')).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def __repr__(self):
        return "<User(id=%s, first_name=%s, last_name=%s)>" % (self.id, self.first_name, self.last_name)

class Calendar(db.Model):
    """Model for the stations table"""
    __tablename__ = 'Calendar'

    username = db.Column(db.String(), primary_key = True)
    facility = db.Column(db.String())
    integrator = db.Column(db.String())
    totalTime = db.Column(db.Integer())
    startDate = db.Column(db.DateTime())
    cannotRun = db.Column(db.DateTime())

    def __repr__(self):
        return "<Calendar(username=%s)>" % (self.username)

class TokenBlacklist(db.Model):
    """Model for the stations table"""
    __tablename__ = 'TokenBlacklist'
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False)
    token_type = db.Column(db.String(10), nullable=False)
    user_identity = db.Column(db.String(50), nullable=False)
    revoked = db.Column(db.Boolean, nullable=False)
    expires = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            'token_id': self.id,
            'jti': self.jti,
            'token_type': self.token_type,
            'user_identity': self.user_identity,
            'revoked': self.revoked,
            'expires': self.expires
        }
