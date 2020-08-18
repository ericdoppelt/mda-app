from flask import Flask 
from gevent.pywsgi import WSGIServer
  
# Flask constructor takes the name of  
# current module (__name__) as argument. 
app = Flask(__name__) 
  
# The route() function of the Flask class is a decorator,  
# which tells the application which URL should call  
# the associated function. 
@app.route('/') 
# ‘/’ URL is bound with hello_world() function. 
def hello_world(): 
    return 'Hello World'
  
# main driver function 
if __name__ == '__main__': 
  
    # run() method of Flask class runs the application  
    # on the local development server. 
    # app.run() 
    http_server = WSGIServer(('127.0.0.1', 5000), app)
    print("asd")
    http_server.serve_forever()