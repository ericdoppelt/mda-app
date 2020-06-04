import React from 'react';
import { Link } from 'react-router-dom';

import Image from '../../components/Image';
import Main from '../../components/Main';
import NavigationHeader from '../../components/NavigationHeader';
import Stack from '../../components/Stack';
import Title from '../../components/Title';

export default () => (
  <Main style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
    <NavigationHeader>
      <Link to="/home">
        <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/homePage.png)' }} />
      </Link>
      <Link to="/facility-main">
        <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/a544991c-8004-402e-a784-9d0a51d6d3b0.png)' }} />
      </Link>
      <Link to="/calendar-main">
        <Image style={{ width: '120px', height: '90px', backgroundImage: 'url(/images/62187f3a-3839-43dc-8b2e-76b97b7ae0b1.png)' }} />
      </Link>
      <Link to="/request-form-main">
        <Image style={{ width: '170px', height: '90px', backgroundImage: 'url(/images/c8a8db2c-5298-4115-ba33-dc56f20bf50a.png)' }} />
      </Link>
      <Image style={{ width: '150px', height: '90px', backgroundImage: 'url(/images/viewRequests.png)' }} />
      <Link to="/">
        <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/d102a6df-a42a-4af3-bfdc-8da28402a42d.png)' }} />
      </Link>
    </NavigationHeader>
    <Stack style={{ justifyContent: 'flex-start', minWidth: '50px', minHeight: '50px' }}>
      <Image style={{ width: '200px', height: '200px', backgroundImage: 'url(/images/MDALogo.png)' }} />
      <Title>
        Beam Request Forms
      </Title>
      <Image style={{ width: '1000px', height: '500px', backgroundImage: 'url(/images/ViewRequestsForm.png)' }} />
    </Stack>
  </Main>
);
