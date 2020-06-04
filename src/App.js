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
      <Route path="/" exact component={UserMain} />
      <Route path="/facility-main" component={FacilityMain} />
      <Route path="/calendar-main" component={CalendarMain} />
      <Route path="/request-form-main" component={RequestFormMain} />
      <Route path="/facility-tamu" component={FacilityTamu} />
      <Route path="/home" component={Home} />
      <Route path="/user-profile" component={UserProfile} />
      <Route path="/view-requests-main" component={ViewRequestsMain} />
    </Switch>
  </BrowserRouter>
);

export default App;
