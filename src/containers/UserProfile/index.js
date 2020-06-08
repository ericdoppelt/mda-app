import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Image from '../../components/Image';
import Main from '../../components/Main';
import NavigationHeader from '../../components/NavigationHeader';
import Row from '../../components/Row';
import Stack from '../../components/Stack';
import Subheader from '../../components/Subheader';

export default () => (
  <Main style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
    <NavigationHeader>
      <Link to="/home">
        <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/homeIcon.png)' }} />
      </Link>
      <Link to="/">
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
      <Link to="/user-main">
        <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/d102a6df-a42a-4af3-bfdc-8da28402a42d.png)' }} />
      </Link>
    </NavigationHeader>
    <Stack style={{ justifyContent: 'flex-start', minWidth: '50px', minHeight: '50px' }}>
      <Stack style={{ justifyContent: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
        <Header>
          Hello, John Doe!
        </Header>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Subheader>
            Username:
<br/>
Affiliation:
<br/>
User Type:
<br/>
Phone:
<br/>
Email:

          </Subheader>
          <Subheader>
            @john
<br/>
MDA
<br/>
Integrator
<br/>
555-555-5555
<br/>
johnDoe@mda.mil

          </Subheader>
        </Row>
      </Stack>
      <Subheader>
        Update Contact Info
      </Subheader>
      <Image style={{ width: '1000px', height: '600px', backgroundImage: 'url(/images/userCalendar.png)' }} />
    </Stack>
  </Main>
);
