# mda-app
## Initial Installation
When downloading the app for the first time, react needs to be initialized along with the virtual environment along with its dependencies need to be installed locally. After cloning the repository, open up your python termal, cd into the mda-app. To initialize the react app, run 
```
npm install
npm install node-sass
npm install fullcalendar
npm install --save @fullcalendar/core @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction @fullcalendar/core @fullcalendar/react
npm install axios
npm install --save redux react-redux
npm install @material-ui/core
npm install @material-ui/icons
npm i @material-ui/pickers
npm i @date-io/date-fns
npm install react-infinite-calendar --save
npm install fontsource-roboto
npm install mobx mobx-react --save

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

## Deploying to heroku
First create a Heroku repository at heroku.com. You can get free 500 Mb app, 1000 hours free run time, and a free 10,000 entry database under a single user (Heroku teams do not have the free run time). Once you have done that, connect your heroku repository to your github deployment by running 
```
heroku git:remote -a repository
```
where repository is the name of your Heroku app.
Then, you can push your backend changes to Heroku with
```
git subtree push --prefix backend heroku master
```
This will push only the backend folder to the Heroku app. The other frontend files are not necessary, and since there is a 500 Mb limit, you shouldn't push the rest of your frontend files. If you want to push the entire folder, you would use the following command
```
git push heroku master
```
## Explanation of the files
The following files compose the react frontend contents within the top level directory:
* public/* - this folder contains the html resources to display
* src/components - this folder contains the web components such as buttons, calendar, dropdowns, etc
* src/containers - this folder contains the web pages for each section of the website
* src/App.js - this file contains the frontend routes for each section of the website
* package.js - this contains the scripts for yarn

The following files compose the flask backend contents within the backend folder:
* venv/* - this folder contains all the contents of the virtual environment
* .flaskenv - this file contains the flask environmental variables, such as the database URI
* config.py - this file configures the app with Flask
* extensions.py - this file initializes any extensions
* main.py - this is the main file that runs the backend
* models.py - this file creates the features of the tables in the database
* routes.py - this file creates the endpoints for the app, which represent and render the different pages
