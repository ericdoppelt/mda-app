import React from 'react';

import Main from '../../../components/UIzard/Main';
import Calendar from '../../../components/Custom/Calendar/Calendar';
import MDAHeader from '../../../components/Custom/MDAHeader';

export default () => (
  <Main style={{ justifyContent: 'center', alignItems: 'center' }}>
    <MDAHeader/>
    <Calendar/>

  </Main>
);
