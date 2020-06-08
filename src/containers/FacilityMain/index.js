import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../components/Card';
import Image from '../../components/Image';
import Main from '../../components/Main';
import Paragraph from '../../components/Paragraph';
import Row from '../../components/Row';
import Stack from '../../components/Stack';
import MDAHeader from '../../components/MDAHeader';

export default () => (
  <Main style={{ justifyContent: 'space-between', alignItems: 'center' }}>
    <MDAHeader/>
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
