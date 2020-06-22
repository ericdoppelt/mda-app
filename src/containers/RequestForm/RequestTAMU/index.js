import React, {useState} from 'react';

import Main from '../../../components/UIzard/Main';
import Row from '../../../components/UIzard/Row';
import MDAHeader from '../../../components/Custom/MDAHeader';
import RequestFormTAMU from '../../../components/Custom/RequestFormTAMU';
import Card from '../../../components/UIzard/Card';

export default () => (
  

  <Main style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
    <MDAHeader/>
    <Row style={{ justifyContent: 'flex-start', alignSelf: 'auto', minWidth: '50px', minHeight: '50px' }}>
      <Card style={{ justifyContent: 'center', alignItems: 'flex-end', minWidth: '50px', minHeight: '600px', width: '900px', flexGrow: '0' }}>
        <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
          <RequestFormTAMU/>
        </Row>
      </Card>
    </Row>
  </Main>
);
