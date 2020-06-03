from main import db
from sqlalchemy.dialects.postgresql import JSON

        
class Test(db.Model):
    """Model for the stations table"""
    __tablename__ = 'test'

    id = db.Column(db.Integer, primary_key = True)
    text = db.Column(db.String())

    def __repr__(self):
        return "<Station(id=%s, text=%s)>" % (self.id, self.text)

