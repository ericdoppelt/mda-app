from main import app
from models import Test
from sqlalchemy import func
from werkzeug.security import check_password_hash

@app.route('/time')
def get_current_time():
    sample = Test.query.first()
    sample = sample.text
    print(sample)
    return {'time': sample}

@app.route('/users/register', methods=['POST'])
def register():
    cur = mysql.connection.cursor()
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    created = datetime.utcnow()
	
    user = Users.query\
        .filter(func.lower(user.username)==func.lower(username)).first()
    
    


    result = {
		'first_name' : first_name,
		'last_name' : last_name,
		'email' : email,
		'password' : password,
		'created' : created
	}

    return jsonify({'result' : result})
	

@app.route('/users/login', methods=['POST'])
def login():
    cur = mysql.connection.cursor()
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""
    
    user = Users.query.filter_by(username=username).first()

    if not user:
        return "User already in database"
    elif not check_password_hash(user.password, password):
        return "Password incorrect"
    else:
        login_user(user)
        return "Go to user logged in page"

	
    if bcrypt.check_password_hash(rv['password'], password):
        access_token = create_access_token(identity = {'first_name': rv['first_name'],'last_name': rv['last_name'],'email': rv['email']})
        result = access_token
    else:
        result = jsonify({"error":"Invalid username and password"})
    
    return result