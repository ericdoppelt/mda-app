import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../components/Card';
import Header from '../../components/Header';
import Image from '../../components/Image';
import Main from '../../components/Main';
import NavigationHeader from '../../components/NavigationHeader';
import Paragraph from '../../components/Paragraph';
import Row from '../../components/Row';
import Stack from '../../components/Stack';
import Title from '../../components/Title';

export default () => (
  <Main style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
    <NavigationHeader>
      <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/homelogo.png)' }} />
      <Link to="/facility-main">
        <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/a544991c-8004-402e-a784-9d0a51d6d3b0.png)' }} />
      </Link>
      <Link to="/calendar-main">
        <Image style={{ width: '120px', height: '90px', backgroundImage: 'url(/images/62187f3a-3839-43dc-8b2e-76b97b7ae0b1.png)' }} />
      </Link>
      <Link to="/request-main">
        <Image style={{ width: '170px', height: '90px', backgroundImage: 'url(/images/c8a8db2c-5298-4115-ba33-dc56f20bf50a.png)' }} />
      </Link>
      <Image style={{ width: '150px', height: '90px', backgroundImage: 'url(/images/viewlogo.png)' }} />
      <Link to="/">
        <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/d102a6df-a42a-4af3-bfdc-8da28402a42d.png)' }} />
      </Link>
    </NavigationHeader>
    <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
      <Card style={{ justifyContent: 'center', minWidth: '50px', minHeight: '570px', width: '720px', flexGrow: '0' }}>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Title>
            Texas A&M Facility Information
          </Title>
        </Row>
        <Stack style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/1388bb77-92c9-4f33-843b-4978f4a94606.png)' }} />
          </Row>
        </Stack>
        <Header>
          Contact Information
        </Header>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Paragraph>
            Our physical address (use this for equipment shipments): 
            <br/>
            <br/>
            Cyclotron Institute<br/>
            Texas A&M University<br/>
            120 Spence St.<br/>
            College Station, TX 77843-3366
            <br/>
            <br/>
            Our Mailing Address:
            <br/>
            Cyclotron Institute<br/>
            Texas A&M University<br/>
            3366 TAMU<br/>
            College Station, TX 77843-3366
          </Paragraph>
        </Row>
        <Header>
          Beam Information
        </Header>
        <Image style={{ width: '50px', height: '50px', backgroundImage: 'url(/images/placeholder-01.jpg)' }} />
        <Header>
          Additional Documents
        </Header>
        <Paragraph>
          Beam Time Request Form (offline)<br/>
Parking Map<br/>
Cryogenic Safety Guidelines<br/>
Building Entry<br/>
Safety Orientation<br/>
Heavy Ion Beam List<br/>
Beam Change Times<br/>
Beam Characterization and Verification<br/><br/>

Facility Brochures:<br/>
Full Brochure<br/>
Heavy Ion Facility Brochure<br/>
Proton Facility Brochure

        </Paragraph>
      </Card>
    </Row>
  </Main>
);
