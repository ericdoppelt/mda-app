import React from 'react';
import { Link } from 'react-router-dom';

import Image from '../../components/Image';
import Main from '../../components/Main';
import NavigationHeader from '../../components/NavigationHeader';
import Row from '../../components/Row';
import Stack from '../../components/Stack';
import Title from '../../components/Title';

export default () => (
  <Main style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
    <NavigationHeader>
      <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/homeIcon.png)' }} />
      <Link to="/facility-main">
        <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/a544991c-8004-402e-a784-9d0a51d6d3b0.png)' }} />
      </Link>
      <Link to="/calendar-main">
        <Image style={{ width: '120px', height: '90px', backgroundImage: 'url(/images/62187f3a-3839-43dc-8b2e-76b97b7ae0b1.png)' }} />
      </Link>
      <Link to="/request-form-main">
        <Image style={{ width: '170px', height: '90px', backgroundImage: 'url(/images/c8a8db2c-5298-4115-ba33-dc56f20bf50a.png)' }} />
      </Link>
      <Link to="/view-requests-main">
        <Image style={{ width: '170px', height: '90px', backgroundImage: 'url(/images/viewRequests.png)' }} />
      </Link>
      <Link to="/">
        <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/d102a6df-a42a-4af3-bfdc-8da28402a42d.png)' }} />
      </Link>
    </NavigationHeader>
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
