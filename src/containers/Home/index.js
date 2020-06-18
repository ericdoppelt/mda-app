import React from 'react';
import Image from '../../components/UIzard/Image';
import Main from '../../components/UIzard/Main';
import Row from '../../components/UIzard/Row';
import Stack from '../../components/UIzard/Stack';
import Title from '../../components/UIzard/Title';
import MDAHeader from '../../components/Custom/MDAHeader';

export default () => (
  <Main style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
    <MDAHeader/>
    <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
      <Stack style={{ justifyContent: 'flex-start', flexGrow: '0', alignSelf: 'auto', minWidth: '50px', minHeight: '50px' }}>
        <Row style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Image style={{ width: '250px', height: '250px', backgroundImage: 'url(/images/MDALogo.png)' }} />
          <Image style={{ width: '250px', height: '250px', backgroundImage: 'url(/images/ISEEULogo.png)' }} />
          <Image style={{ width: '250px', height: '250px', backgroundImage: 'url(/images/phoenix.png)' }} />
        </Row>
        <Title>
          COMING SOON...
        </Title>
      </Stack>
    </Row>
  </Main>
);
