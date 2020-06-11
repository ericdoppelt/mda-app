import React from 'react';
import { Router, Route} from 'react-router-dom';
import UserMain from './containers/UserMain';
import CalendarMain from './containers/CalendarMain';
import RequestFormMain from './containers/RequestFormMain';

import FacilityMain from './containers/FacilityMain';
import FacilityTAMU from './containers/FacilityTamu';
import FacilityLBNL from './containers/FacilityLBNL';
import FacilityBNL from './containers/FacilityNSRL';
import FacilityMSU from './containers/FacilityMSU';

import Home from './containers/Home';
import UserProfile from './containers/UserProfile';
import ViewRequestsMain from './containers/ViewRequestsMain';
import UserRegistration from './containers/UserRegistration';
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
      <Route path="/view-requests" component={ViewRequestsMain} />
      <Route path="/user-login" component={UserMain} />
      <Route path="/user-profile" component={UserProfile} />
      <Route path="/user-registration" component={UserRegistration}/>
    </div>
  </Router>
);

export default App;
