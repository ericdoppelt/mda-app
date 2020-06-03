import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../components/Card';
import Image from '../../components/Image';
import Main from '../../components/Main';
import NavigationHeader from '../../components/NavigationHeader';
import Paragraph from '../../components/Paragraph';
import Row from '../../components/Row';
import Stack from '../../components/Stack';

export default () => (
  <Main style={{ justifyContent: 'space-between', alignItems: 'center' }}>
    <NavigationHeader>
      <Link to="/home-page">
        <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/homelogo.png)' }} />
      </Link>
      <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/a544991c-8004-402e-a784-9d0a51d6d3b0.png)' }} />
      <Link to="/calendar-main">
        <Image style={{ width: '120px', height: '90px', backgroundImage: 'url(/images/62187f3a-3839-43dc-8b2e-76b97b7ae0b1.png)' }} />
      </Link>
      <Link to="/request-main">
        <Image style={{ width: '170px', height: '90px', backgroundImage: 'url(/images/c8a8db2c-5298-4115-ba33-dc56f20bf50a.png)' }} />
      </Link>
      <Link to="/empty-artboard-1">
        <Image style={{ width: '150px', height: '90px', backgroundImage: 'url(/images/viewlogo.png)' }} />
      </Link>
      <Link to="/">
        <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/d102a6df-a42a-4af3-bfdc-8da28402a42d.png)' }} />
      </Link>
    </NavigationHeader>
    <Row style={{ justifyContent: 'flex-start', alignSelf: 'auto', minWidth: '50px', minHeight: '50px' }}>
      <Card style={{ justifyContent: 'center', alignItems: 'flex-end', minWidth: '50px', minHeight: '600px', width: '900px', flexGrow: '0' }}>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Paragraph>
            Facility Information
          </Paragraph>
        </Row>
        <Stack style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Link to="/facility-tamu">
              <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/tamulogo.png)' }} />
            </Link>
            <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/LBNLLogo.jpg)' }} />
          </Row>
          <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Image style={{ width: '210px', height: '120px', backgroundImage: 'url(/images/brnllogo.png)' }} />
            <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/MSULogo.png)' }} />
          </Row>
        </Stack>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Paragraph>
            Choose a facility to continue...
          </Paragraph>
        </Row>
      </Card>
    </Row>
  </Main>
);
