import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Artboard5dd5bcb83f4346fb8421eed5bc0b1ddfJpeg from './containers/Artboard5dd5bcb83f4346fb8421eed5bc0b1ddfJpeg';
import E3308636ddad4d50adcf41cdb793f31fJpeg from './containers/E3308636ddad4d50adcf41cdb793f31fJpeg';
import A2f310241f66477195c4bb216a1ae169Jpeg from './containers/A2f310241f66477195c4bb216a1ae169Jpeg';
import EmptyArtboard from './containers/EmptyArtboard';

<<<<<<< HEAD
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
=======
  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>The current time is now .</p>
      </header>
    </div>
  );
}
>>>>>>> 671724d23c50d961c53bb79344269faf249ef2d9

export default App;
