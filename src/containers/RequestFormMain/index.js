import React from 'react';

import Main from '../../components/Main';
import Row from '../../components/Row';
import MDAHeader from '../../components/MDAHeader';
import FacilitiesSelector from '../../components/FacilitiesSelector';



export default () => (
  
  <Main style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
    <MDAHeader/>
    <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
      <FacilitiesSelector/>
    </Row>
  </Main>
);
