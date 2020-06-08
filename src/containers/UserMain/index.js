import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/Button';
import Card from '../../components/Card';
import InputField from '../../components/InputField';
import Main from '../../components/Main';
import Paragraph from '../../components/Paragraph';
import Row from '../../components/Row';
import Stack from '../../components/Stack';
import LoginForm from '../../components/LoginForm';
import HerokuText from '../../HerokuText';
import MDAHeader from '../../components/MDAHeader';


let text = "caleb";
              
export default () => (
  <Main style={{ justifyContent: 'center', alignItems: 'center' }}>
    <MDAHeader/>
    <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
      <Card style={{ justifyContent: 'center', minWidth: '50px', minHeight: '570px', width: '720px', flexGrow: '0' }}>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Paragraph>
            Login Form
          </Paragraph>
        </Row>
        <Stack style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Paragraph>
              Username
            </Paragraph>
            <InputField placeholder="Input Field" style={{ width: '370px' }} />
          </Row>
          <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Paragraph>
              Password
            </Paragraph>
            <InputField placeholder="Input Field" style={{ width: '370px' }} />
          </Row>
        </Stack>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Link to="/user-profile">
            <Button>
              Log In
            </Button>
          </Link>
          <Button>
            Create Account
          </Button>
        </Row>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <HerokuText/>
        </Row>
        <LoginForm/>
      </Card>
    </Row>
  </Main>
);
