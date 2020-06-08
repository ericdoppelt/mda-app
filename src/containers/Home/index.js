import React from 'react';
import Image from '../../components/Image';
import Main from '../../components/Main';
import Row from '../../components/Row';
import Stack from '../../components/Stack';
import Title from '../../components/Title';

import MDAHeader from '../../components/MDAHeader';

export default () => (
  <Main style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
    <MDAHeader/>
    <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
      <Stack style={{ justifyContent: 'flex-start', flexGrow: '0', alignSelf: 'auto', minWidth: '50px', minHeight: '50px' }}>
        <Row style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Image style={{ width: '250px', height: '250px', backgroundImage: 'url(/images/MDALogo.png)' }} />
          <Image style={{ width: '250px', height: '250px', backgroundImage: 'url(/images/phoenix.png)' }} />
        </Row>
        <Title>
          COMING SOON...
        </Title>
      </Stack>
    </Row>
  </Main>
);
