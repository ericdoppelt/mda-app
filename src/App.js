import React from 'react';
import { Router, Switch, Route, Link} from 'react-router-dom';
import { Provider } from 'react-redux'
import UserMain from './containers/UserMain';
import FacilityMain from './containers/FacilityMain';
import CalendarMain from './containers/CalendarMain';
import RequestFormMain from './containers/RequestFormMain';
import FacilityTamu from './containers/FacilityTamu';
import Home from './containers/Home';
import UserProfile from './containers/UserProfile';
import ViewRequestsMain from './containers/ViewRequestsMain';
import history from './history';

const App = () => (
  <Router history={history}>
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/facilities" component={FacilityMain} />
      <Route path="/facilities-tamu" component={FacilityTamu} />
      <Route path="/calendar" component={CalendarMain} />
      <Route path="/request-form" component={RequestFormMain} />
      <Route path="/view-requests" component={ViewRequestsMain} />
      <Route path="/user-login" component={UserMain} />
      <Route path="/user-profile" component={UserProfile} />
    </div>
  </Router>
);

export default App;
