import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from 'react';
import { Router, Route} from 'react-router-dom';
import UserMain from './containers/User/UserMain';
import CalendarMain from './containers/Calendar/CalendarMain';
import RequestTAMU from './containers/RequestForm/TAMU';
import RequestLBNL from './containers/RequestForm/LBNL';
import RequestMSU from './containers/RequestForm/MSU';
import RequestNSRL from './containers/RequestForm/NSRL';
import RequestCommon from './containers/RequestForm/Common';
import axios from 'axios';

import FacilityMain from './containers/Facility/FacilityMain';
import FacilityTAMU from './containers/Facility/FacilityTAMU';
import FacilityLBNL from './containers/Facility/FacilityLBNL';
import FacilityBNL from './containers/Facility/FacilityNSRL';
import FacilityMSU from './containers/Facility/FacilityMSU';

import Home from './containers/Home';
import UserProfile from './containers/User/UserProfile';
import ViewRequestsMain from './containers/ViewRequests/ViewRequestsMain';
import SchedulerMain from './containers/Scheduler/SchedulerMain';
import UserRegistration from './containers/User/UserRegistration';
import ForgotPassword from  './containers/User/ForgotPassword';
import ForgotUsername from './containers/User/ForgotUsername';
import ResetPassword from './containers/User/ResetPassword';
import history from './history';


const App = () => (
  <Router history={history}>
    <div className='App' style={{display: 'flex', width:'100%'}}>
      <Route path="/" exact component={Home} />
      <Route path="/facilities" component={FacilityMain} />
      <Route path="/facilities-tamu" component={FacilityTAMU} />
      <Route path="/facilities-lbnl" component={FacilityLBNL}/>
      <Route path="/facilities-nsrl" component={FacilityBNL}/>
      <Route path="/facilities-msu" component={FacilityMSU}/>
      <Route path="/calendar" component={CalendarMain} />
      <Route path="/request-tamu" component={RequestTAMU}/>
      <Route path="/request-lbnl" component={RequestLBNL}/>
      <Route path="/request-msu" component={RequestMSU}/>
      <Route path="/request-nsrl" component={RequestNSRL}/>
      <Route path="/scheduler" component={SchedulerMain} />
      <Route path="/view-requests" component={ViewRequestsMain} />
      <Route path="/user-login" component={UserMain} />
      <Route path="/user-profile" component={UserProfile} />
      <Route path="/user-registration" component={UserRegistration}/>
      <Route path="/forgot-password" component={ForgotPassword}/>
      <Route path="/forgot-username" component={ForgotUsername}/>
      <Route path="/reset-password" component={ResetPassword}/>
    </div>
  </Router>
);

window.addEventListener("beforeunload", (ev) =>
{
  if (window.sessionStorage.getItem("access_token") !== null) {
    let url = "https://mda-phoenix.herokuapp.com/logout"
    axios.delete(url, {
      headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
    })
  }
});

export default App;
