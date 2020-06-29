from main import db, bcrypt
from sqlalchemy.dialects.postgresql import JSON
from flask_login import UserMixin


class Test(db.Model):
    """Model for the test table"""
    __tablename__ = 'test'

    id = db.Column(db.Integer, primary_key = True)
    text = db.Column(db.String())

    def __repr__(self):
        return "<User(id=%s, text=%s)>" % (self.id, self.text)

class Users(UserMixin, db.Model):
    """Model for the users table"""
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
    org_id = db.Column(db.Integer)

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password.encode('utf-8')).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def register_user(self):
        result = ""
        try:
            db.session.add(self)
            db.session.commit()
            result = {
                'success' : True
            }
        except Exception as e:
            print(e)
            result = {'error' : "Unable to register user",
            'success' : False}
        return result

    def __repr__(self):
        return "<User(id=%s, first_name=%s, last_name=%s)>" % (self.id, self.first_name, self.last_name)

class Organization(db.Model):
    """Model for the organization table"""
    __tablename__ = 'Organization'

    id = db.Column(db.Integer(), primary_key = True)
    name = db.Column(db.String(50))
    poc_name = db.Column(db.String(50))
    poc_email = db.Column(db.String(254))
    poc_phone = db.Column(db.String(15))
    address = db.Column(db.String(95))
    city = db.Column(db.String(50))
    state = db.Column(db.String(20))
    zipcode = db.Column(db.Integer)
    abbrv = db.Column(db.String(6))

    def __repr__(self):
        return "<Organization(id=%s, name=%s, poc_name=%s)>" % (self.id, self.name, self.poc_name)

class Facility(db.Model):
    """Model for the facility table"""
    __tablename__ = 'Facility'

    id = db.Column(db.Integer(), primary_key = True)
    name = db.Column(db.String())

    def __repr__(self):
        return "<Organization(id=%s, name=%s, poc_name=%s)>" % (self.id, self.name, self.poc_name)


class Calendar(db.Model):
    """Model for the calendar table"""
    __tablename__ = 'Calendar'

    id = db.Column(db.Integer(), primary_key = True)
    username = db.Column(db.String())
    facility = db.Column(db.String())
    integrator = db.Column(db.String())
    totalTime = db.Column(db.Integer())
    startDate = db.Column(db.DateTime())
    cannotRun = db.Column(db.DateTime())

    def __repr__(self):
        return "<Calendar(username=%s)>" % (self.username)

class Beams(db.Model):
    """Model for the Beams table"""
    __tablename__ = 'Beams'

    id = db.Column(db.Integer(), primary_key = True)
    org_id = db.Column(db.Integer())
    ion = db.Column(db.String(30))
    amev = db.Column(db.Float())
    max_energy = db.Column(db.Float())
    let = db.Column(db.ARRAY(db.Float()))
    beam_range = db.Column(db.Float())
    max_flux = db.Column(db.Float())
    air = db.Column(db.Boolean())
    device = db.Column(db.String(30))
    let_peak = db.Column(db.Float())

    def __repr__(self):
        return "<Beam(org_id=%s, ion=%s)>" % (self.org_id, self.ion)

class TokenBlacklist(db.Model):
    """Model for the token blacklist table"""
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
