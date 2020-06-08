import React from 'react';

import Image from '../../components/Image';
import Main from '../../components/Main';
import MDAHeader from '../../components/MDAHeader';
import Stack from '../../components/Stack';
import Title from '../../components/Title';

export default () => (
  <Main style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
    <MDAHeader/>
    <Stack style={{ justifyContent: 'flex-start', minWidth: '50px', minHeight: '50px' }}>
      <Image style={{ width: '200px', height: '200px', backgroundImage: 'url(/images/MDALogo.png)' }} />
      <Title>
        Beam Request Forms
      </Title>
      <Image style={{ width: '1000px', height: '500px', backgroundImage: 'url(/images/ViewRequestsForm.png)' }} />
    </Stack>
  </Main>
);
