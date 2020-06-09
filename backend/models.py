from main import db
from sqlalchemy.dialects.postgresql import JSON

        
class Test(db.Model):
    """Model for the stations table"""
    __tablename__ = 'test'

    id = db.Column(db.Integer, primary_key = True)
    text = db.Column(db.String())

    def __repr__(self):
        return "<User(id=%s, text=%s)>" % (self.id, self.text)

class Users(db.Model):
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

    def __repr__(self):
        return "<User(id=%s, text=%s)>" % (self.id, self.text)
