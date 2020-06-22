import React from 'react';
import Card from '../../../components/UIzard/Card';
import Main from '../../../components/UIzard/Main';
import Paragraph from '../../../components/UIzard/Paragraph';
import Row from '../../../components/UIzard/Row';
import Stack from '../../../components/UIzard/Stack';
import RegistrationForm from '../../../components/Custom/RegistrationForm';
import MDAHeader from '../../../components/Custom/MDAHeader';

export default () => (
  <Main style={{ justifyContent: 'center', alignItems: 'center' }}>
    <MDAHeader/>
    <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
      <Card style={{ justifyContent: 'center', minWidth: '50px', minHeight: '570px', width: '720px', flexGrow: '0' }}>
        <Stack style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Paragraph>
            Registration
          </Paragraph>
          <RegistrationForm/>
        </Stack>
      </Card>
    </Row>
  </Main>
);