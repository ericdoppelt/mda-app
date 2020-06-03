import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/Button';
import Card from '../../components/Card';
import Image from '../../components/Image';
import InputField from '../../components/InputField';
import InputDropdown from '../../components/InputDropdown';
import Main from '../../components/Main';
import NavigationHeader from '../../components/NavigationHeader';
import Paragraph from '../../components/Paragraph';
import Row from '../../components/Row';
import Stack from '../../components/Stack';

export default () => (
  <Main style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
    <NavigationHeader>
      <Link to="/home-page">
        <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/homelogo.png)' }} />
      </Link>
      <Link to="/facility-main">
        <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/a544991c-8004-402e-a784-9d0a51d6d3b0.png)' }} />
      </Link>
      <Link to="/calendar-main">
        <Image style={{ width: '120px', height: '90px', backgroundImage: 'url(/images/62187f3a-3839-43dc-8b2e-76b97b7ae0b1.png)' }} />
      </Link>
      <Image style={{ width: '170px', height: '90px', backgroundImage: 'url(/images/c8a8db2c-5298-4115-ba33-dc56f20bf50a.png)' }} />
      <Link to="/empty-artboard-1">
        <Image style={{ width: '150px', height: '90px', backgroundImage: 'url(/images/viewlogo.png)' }} />
      </Link>
      <Link to="/">
        <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/d102a6df-a42a-4af3-bfdc-8da28402a42d.png)' }} />
      </Link>
    </NavigationHeader>
    <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
      <Card style={{ justifyContent: 'center', minWidth: '50px', minHeight: '570px', width: '720px', flexGrow: '0' }}>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Paragraph>
            Beam Request - General Information
          </Paragraph>
        </Row>
        <Stack style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Paragraph>
              Facility
            </Paragraph>
            <InputDropdown style={{ width: '370px' }} />
          </Row>
          <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Paragraph>
              Total Time Requested
            </Paragraph>
            <InputField placeholder="Input Field" style={{ width: '370px' }} />
          </Row>
        </Stack>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Paragraph>
            Preferred Start Date
          </Paragraph>
          <InputField placeholder="Input Field" style={{ width: '370px' }} />
        </Row>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Paragraph>
            Dates you cannot run
          </Paragraph>
          <InputField placeholder="Input Field" style={{ width: '370px' }} />
        </Row>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Paragraph>
            Integrator
          </Paragraph>
          <InputDropdown style={{ width: '370px' }} />
        </Row>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Button>
            Previous Section
          </Button>
          <Button>
            Next Section
          </Button>
        </Row>
      </Card>
    </Row>
  </Main>
);
