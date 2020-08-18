from main import app
# Development
from gevent.pywsgi import WSGIServer
# from gevent import monkey
# monkey.patch_all()
if __name__ == '__main__':
    # Development
    # app.run(debug=True)
    # Production
    try:
        print("1")
        http_server = WSGIServer(('127.0.0.1', 5000), app)
        print("2", flush=True)
        # http_server.serve_forever()
        print("3")
    except Exception as e:
        print(e)

print("end")