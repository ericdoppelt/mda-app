import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import UserMain from './containers/UserMain';
import FacilityMain from './containers/FacilityMain';
import CalendarMain from './containers/CalendarMain';
import RequestMain from './containers/RequestMain';
import FacilityTamu from './containers/FacilityTamu';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={UserMain} />
      <Route path="/facility-main" component={FacilityMain} />
      <Route path="/calendar-main" component={CalendarMain} />
      <Route path="/request-main" component={RequestMain} />
      <Route path="/facility-tamu" component={FacilityTamu} />
    </Switch>
  </BrowserRouter>
);

export default App;
