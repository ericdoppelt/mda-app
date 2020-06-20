import React, {useState} from 'react';

import Main from '../../../components/UIzard/Main';
import Row from '../../../components/UIzard/Row';
import MDAHeader from '../../../components/Custom/MDAHeader';
import RequestFormTAMU from '../../../components/Custom/RequestFormTAMU';

export default () => (
  

  <Main style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
    <MDAHeader/>
    <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
      <RequestFormTAMU/>
    </Row>
  </Main>
);
