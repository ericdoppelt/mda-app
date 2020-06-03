import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Artboard5dd5bcb83f4346fb8421eed5bc0b1ddfJpeg from './containers/Artboard5dd5bcb83f4346fb8421eed5bc0b1ddfJpeg';
import E3308636ddad4d50adcf41cdb793f31fJpeg from './containers/E3308636ddad4d50adcf41cdb793f31fJpeg';
import A2f310241f66477195c4bb216a1ae169Jpeg from './containers/A2f310241f66477195c4bb216a1ae169Jpeg';
import EmptyArtboard from './containers/EmptyArtboard';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Artboard5dd5bcb83f4346fb8421eed5bc0b1ddfJpeg} />
      <Route path="/e3308636ddad4d50adcf41cdb793f31f-jpeg" component={E3308636ddad4d50adcf41cdb793f31fJpeg} />
      <Route path="/a2f310241f66477195c4bb216a1ae169-jpeg" component={A2f310241f66477195c4bb216a1ae169Jpeg} />
      <Route path="/empty-artboard" component={EmptyArtboard} />
    </Switch>
  </BrowserRouter>
);

export default App;
