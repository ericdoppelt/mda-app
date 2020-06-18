import React from 'react';

import Image from '../../../components/UIzard/Image';
import Main from '../../../components/UIzard/Main';
import MDAHeader from '../../../components/Custom/MDAHeader';
import Stack from '../../../components/UIzard/Stack';
import Title from '../../../components/UIzard/Title';
import ViewRequests from '../../../components/Custom/ViewRequests';

export default () => (
  <Main style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
    <MDAHeader/>
    <Stack style={{ justifyContent: 'flex-start', minWidth: '50px', minHeight: '50px' }}>
      <Image style={{ width: '200px', height: '200px', backgroundImage: 'url(/images/MDALogo.png)' }} />
      <Title>
        Beam Request Forms
      </Title>
      <ViewRequests/>
    </Stack>
  </Main>
);
