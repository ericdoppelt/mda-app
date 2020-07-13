from main import db, bcrypt
from sqlalchemy.dialects.postgresql import JSON
from flask_login import UserMixin
from sqlalchemy_utils import DateTimeRangeType


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
    org_type = db.Column(db.String(15))
    type_id = db.Column(db.Integer)

    def __repr__(self):
        return "<Organization(id=%s, name=%s, poc_name=%s)>" % (self.id, self.name, self.poc_name)

class Facility(db.Model):
    """Model for the facility table"""
    __tablename__ = 'Facility'

    id = db.Column(db.Integer(), primary_key = True)
    name = db.Column(db.String())

    def __repr__(self):
        return "<Facility(id=%s, name=%s, poc_name=%s)>" % (self.id, self.name)

class Integrator(db.Model):
    """Model for the facility table"""
    __tablename__ = 'Integrator'

    org_id = db.Column(db.Integer(), primary_key = True)
    range = db.Column(db.ARRAY(db.DateTime()))
    facility = db.Column(db.ARRAY(db.String()))
    hours = db.Column(db.ARRAY(db.Integer()))

    def __repr__(self):
        return "<Integrator(id=%s)>" % (self.org_id)

class Ranges(db.Model):
    """Model for the facility table"""
    __tablename__ = 'Ranges'

    org_id = db.Column(db.Integer(), primary_key = True)
    start_date = db.Column(db.DateTime())
    facility = db.Column(db.String())
    hours = db.Column(db.Integer())

    def create_range(self):
        result = ""
        try:
            db.session.add(self)
            db.session.commit()
            result = {
                'success' : True
            }
        except Exception as e:
            print(e)
            result = {'error' : "Unable to create range entry",
            'success' : False}
        return result

    def __repr__(self):
        return "<Range(id=%s, facility=%s)>" % (self.org_id, self.facility)


class Calendar(db.Model):
    """Model for the calendar table"""
    __tablename__ = 'Calendar'

    id = db.Column(db.Integer(), primary_key = True)
    username = db.Column(db.String(50), nullable=False)
    facility = db.Column(db.String(50))
    integrator = db.Column(db.String(50))
    totalTime = db.Column(db.Integer())
    startDate = db.Column(db.DateTime(), nullable=False)
    private = db.Column(db.Boolean())
    title = db.Column(db.String(50))
    steps = db.Column(db.ARRAY(db.Boolean()))

    def create_entry(self):
        result = ""
        try:
            db.session.add(self)
            db.session.commit()
            result = {
                'success' : True
            }
        except Exception as e:
            print(e)
            result = {'error' : "Unable to create calendar entry",
            'success' : False}
        return result

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

class requests(db.Model):
    """Model for the Requests table"""
    __tablename__ = 'requests'

    name = db.Column(db.String(50))
    email = db.Column(db.String(128))
    cell = db.Column(db.String(15))
    company = db.Column(db.String(30))
    integrator = db.Column(db.String(30))
    funding_contact = db.Column(db.String(50))
    address = db.Column(db.String(128))
    city = db.Column(db.String(50))
    state = db.Column(db.String(30))
    zipcode = db.Column(db.Integer())
    approved_integrator = db.Column(db.Boolean())
    approved_facility = db.Column(db.Boolean())
    facility = db.Column(db.String(30))
    ion = db.Column(db.String(30))
    energy = db.Column(db.Float())
    id = db.Column(db.Integer(), primary_key = True)
    funding_cell = db.Column(db.String(15))
    funding_email = db.Column(db.String(128))
    start = db.Column(db.DateTime, nullable=False)
    ions = db.Column(db.ARRAY(db.Integer()))
    comments = db.Column(db.String(200))
    po_number = db.Column(db.Integer())
    username = db.Column(db.String(200))
    beam_time = db.Column(db.Integer())
    approval_date = db.Column(db.DateTime)
    integrator_comment = db.Column(db.String(200))
    modified = db.Column(db.Boolean())
    date_of_request = db.Column(db.DateTime)
    status = db.Column(db.String(40))
    rejected = db.Column(db.Boolean())
    order = db.Column(db.Integer())
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)


    def create_request(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return "<Beam(id=%s, name=%s, facility=%s)>" % (self.id, self.name, self.facility)

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
