import React from 'react';

import Main from '../../components/Main';
import Row from '../../components/Row';
import MDAHeader from '../../components/MDAHeader';
import RequestFormTAMU from '../../components/RequestFormTAMU';



export default () => (
  
  <Main style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
    <MDAHeader/>
    <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
      <RequestFormTAMU/>
    </Row>
  </Main>
);
