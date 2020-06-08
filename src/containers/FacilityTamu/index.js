import React from 'react';

import Card from '../../components/Card';
import Image from '../../components/Image';
import Main from '../../components/Main';
import Paragraph from '../../components/Paragraph';
import Row from '../../components/Row';
import Stack from '../../components/Stack';
import MDAHeader from '../../components/MDAHeader';

export default () => (
  <Main style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
    <MDAHeader/>
    <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
      <Card style={{ justifyContent: 'center', minWidth: '50px', minHeight: '570px', width: '720px', flexGrow: '0' }}>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Paragraph>
            Texas A&M Facility Information
          </Paragraph>
        </Row>
        <Stack style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/1388bb77-92c9-4f33-843b-4978f4a94606.png)' }} />
          </Row>
        </Stack>
        <Paragraph>
          Contact Information
        </Paragraph>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Paragraph>
            Our physical address (use this for equipment shipments):
<br/><br/>
Cyclotron Institute<br/>
Texas A&M University<br/>
120 Spence St.<br/>
College Station, TX 77843-3366
<br/><br/>
Our Mailing Address:
<br/>
Cyclotron Institute<br/>
Texas A&M University<br/>
3366 TAMU<br/>
College Station, TX 77843-3366

          </Paragraph>
        </Row>
        <Paragraph>
          Beam Information
        </Paragraph>
        <Image style={{ width: '50px', height: '50px', backgroundImage: 'url(/images/placeholder-01.jpg)' }} />
        <Paragraph>
          Additional Documents
        </Paragraph>
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
