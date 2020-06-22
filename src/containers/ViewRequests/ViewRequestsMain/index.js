import React from 'react';

import Image from '../../../components/UIzard/Image';
import Main from '../../../components/UIzard/Main';
import MDAHeader from '../../../components/Custom/MDAHeader';
import Stack from '../../../components/UIzard/Stack';
import Title from '../../../components/UIzard/Title';
import ViewRequests from '../../../components/Custom/ViewRequests';
import Card from '../../../components/UIzard/Card';
import Row from '../../../components/UIzard/Row';

export default () => (
  <Main style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
    <MDAHeader/>
    <Row style={{ justifyContent: 'flex-start', alignSelf: 'auto', minWidth: '50px', minHeight: '50px' }}>
      <Card style={{ justifyContent: 'center', alignItems: 'flex-end', minWidth: '50px', minHeight: '600px', width: '900px', flexGrow: '0' }}>
        <Stack style={{ justifyContent: 'flex-start', minWidth: '50px', minHeight: '50px' }}>
          <Image style={{ width: '200px', height: '200px', backgroundImage: 'url(/images/MDALogo.png)' }} />
          <Title>
            Beam Request Forms
          </Title>
          <ViewRequests/>
        </Stack>
      </Card>
    </Row>
  </Main>
);
