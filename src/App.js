import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import UserMain from './containers/UserMain';
import FacilityMain from './containers/FacilityMain';
import CalendarMain from './containers/CalendarMain';
import RequestFormMain from './containers/RequestFormMain';
import FacilityTamu from './containers/FacilityTamu';
import Home from './containers/Home';
import UserProfile from './containers/UserProfile';
import ViewRequestsMain from './containers/ViewRequestsMain';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/facilities" component={FacilityMain} />
      <Route path="/facilities-tamu" component={FacilityTamu} />
      <Route path="/calendar" component={CalendarMain} />
      <Route path="/request-form" component={RequestFormMain} />
      <Route path="/view-requests" component={ViewRequestsMain} />
      <Route path="/user-login" component={UserMain} />
      <Route path="/user-profile" component={UserProfile} />
    </Switch>
  </BrowserRouter>
);

export default App;
