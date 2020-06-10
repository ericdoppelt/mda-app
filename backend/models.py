from main import db, bcrypt, login
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

@login.user_loader
def load_user(username):
    print(Users.query.filter_by(username=username).first())
    return Users.query.filter_by(username=username).first()
