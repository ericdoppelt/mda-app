import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/Button';
import Card from '../../components/Card';
import CircleImage from '../../components/CircleImage';
import InputField from '../../components/InputField';
import Main from '../../components/Main';
import NavigationHeader from '../../components/NavigationHeader';
import Paragraph from '../../components/Paragraph';
import Row from '../../components/Row';
import Stack from '../../components/Stack';

export default () => (
  <Main style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
    <NavigationHeader>
      <Link to="/e3308636ddad4d50adcf41cdb793f31f-jpeg">
        <CircleImage style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/placeholder-03.jpg)' }} />
      </Link>
      <Link to="/a2f310241f66477195c4bb216a1ae169-jpeg">
        <CircleImage style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/placeholder-01.jpg)' }} />
      </Link>
      <CircleImage style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/placeholder-02.jpg)' }} />
      <Link to="/">
        <CircleImage style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/placeholder-04.jpg)' }} />
      </Link>
    </NavigationHeader>
    <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
      <Card style={{ justifyContent: 'center', minWidth: '50px', minHeight: '570px', width: '720px', flexGrow: '0' }}>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Paragraph>
            Beam Request Form
          </Paragraph>
        </Row>
        <Stack style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Paragraph>
              Sit amet
            </Paragraph>
            <InputField placeholder="Input Field" style={{ width: '370px' }} />
          </Row>
          <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Paragraph>
              Porttitor
            </Paragraph>
            <InputField placeholder="Input Field" style={{ width: '370px' }} />
          </Row>
        </Stack>
        <Stack style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flexGrow: '0', alignSelf: 'auto', minWidth: '50px', minHeight: '50px' }}>
          <Paragraph>
            Payment details
          </Paragraph>
          <InputField placeholder="First Name" style={{ width: 'calc(100% - 20px)' }} />
          <InputField placeholder="Last Name" style={{ width: 'calc(100% - 20px)' }} />
          <InputField placeholder="Card Number" style={{ width: 'calc(100% - 20px)' }} />
          <Row style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <InputField placeholder="Expiration" style={{ width: 'calc(100% - 20px)' }} />
            <InputField placeholder="CVC" style={{ width: 'calc(100% - 20px)' }} />
          </Row>
          <Button style={{ width: 'calc(100% - 20px)' }}>
            Confirm
          </Button>
        </Stack>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Button>
            Sollicitudin
          </Button>
          <Button>
            Sollicitudin
          </Button>
        </Row>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Paragraph>
            Adipiscing elit sed
          </Paragraph>
        </Row>
      </Card>
    </Row>
  </Main>
);
