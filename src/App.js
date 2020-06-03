import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import UserMain from './containers/UserMain';
import FacilityMain from './containers/FacilityMain';
import CalendarMain from './containers/CalendarMain';
import RequestMain from './containers/RequestMain';
import FacilityTamu from './containers/FacilityTamu';
import HomePage from './containers/HomePage';
import EmptyArtboard from './containers/EmptyArtboard';
import EmptyArtboard1 from './containers/EmptyArtboard1';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={UserMain} />
      <Route path="/facility-main" component={FacilityMain} />
      <Route path="/calendar-main" component={CalendarMain} />
      <Route path="/request-main" component={RequestMain} />
      <Route path="/facility-tamu" component={FacilityTamu} />
      <Route path="/home-page" component={HomePage} />
      <Route path="/empty-artboard" component={EmptyArtboard} />
      <Route path="/empty-artboard-1" component={EmptyArtboard1} />
    </Switch>
  </BrowserRouter>
);

export default App;
