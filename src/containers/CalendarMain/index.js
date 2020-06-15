import React from 'react';

import Main from '../../components/Main';
import DemoApp from '../../components/Calendar/DemoApp';
import MDAHeader from '../../components/MDAHeader';

export default () => (
  <Main style={{ justifyContent: 'center', alignItems: 'center' }}>
    <MDAHeader/>
    <DemoApp/>

  </Main>
);
