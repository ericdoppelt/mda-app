import React from 'react';
import { Router, Route} from 'react-router-dom';
import UserMain from './containers/User/UserMain';
import CalendarMain from './containers/Calendar/CalendarMain';
import RequestFormMain from './containers/RequestForm/RequestFormMain';
import RequestTAMU from './containers/RequestForm/RequestTAMU';
import axios from 'axios';

import FacilityMain from './containers/Facility/FacilityMain';
import FacilityTAMU from './containers/Facility/FacilityTAMU';
import FacilityLBNL from './containers/Facility/FacilityLBNL';
import FacilityBNL from './containers/Facility/FacilityNSRL';
import FacilityMSU from './containers/Facility/FacilityMSU';

import Home from './containers/Home';
import UserProfile from './containers/User/UserProfile';
import ViewRequestsMain from './containers/ViewRequests/ViewRequestsMain';
import UserRegistration from './containers/User/UserRegistration';
import history from './history';

const App = () => (
  <Router history={history}>
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/facilities" component={FacilityMain} />
      <Route path="/facilities-tamu" component={FacilityTAMU} />
      <Route path="/facilities-lbnl" component={FacilityLBNL}/>
      <Route path="/facilities-nsrl" component={FacilityBNL}/>
      <Route path="/facilities-msu" component={FacilityMSU}/>
      <Route path="/calendar" component={CalendarMain} />
      <Route path="/request-form" component={RequestFormMain} />
      <Route path="/request-tamu" component={RequestTAMU}/>
      <Route path="/view-requests" component={ViewRequestsMain} />
      <Route path="/user-login" component={UserMain} />
      <Route path="/user-profile" component={UserProfile} />
      <Route path="/user-registration" component={UserRegistration}/>
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
