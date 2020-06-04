# mda_app
## Initial Installation
When downloading the app for the first time, react needs to be initialized along with the virtual environment along with its dependencies need to be installed locally. After cloning the repository, open up your python termal, cd into the mda-app. To initialize the react app, run 
```
npm install
```
To initialize the virtual environment, cd in to the backend directory, and create the virtual environment by running 
```
python3 -m venv venv
```
This should take a moment. Then, go into your virtual environment by typing 

`source venv/bin/activate` for mac or `venv\Scripts\activate` for windows

Then install the needed dependencies by running
```
pip install -r requirements.txt
```

## Running the app
To run the backend, run `yarn start-api` for mac users or `yart start-windows` for windows users.

To run the frontend, run
```
yarn start
```
This will automatically open a window to the frontend, and the web address will be http://127.0.0.1:3000/

## Explanation of the files
The following files compose the react frontend contents within the top level directory:
* config/* - this file configures the react frontend
* public/* - this contains the built html
* scripts/* - this contains the scripts used in react
* src/* - this contains the react source files

The following files compose the flask backend contents within the backend folder:
* venv/* - this folder contains all the contents of the virtual environment
* .flaskenv - this file contains the flask environmental variables, such as the database URI
* config.py - this file configures the app with Flask
* extensions.py - this file initializes any extensions
* main.py - this is the main file that runs the backend
* models.py - this file creates the features of the tables in the database
* routes.py - this file creates the endpoints for the app, which represent and render the different pages
