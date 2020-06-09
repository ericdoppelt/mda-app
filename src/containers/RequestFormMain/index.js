import React from 'react';

import Button from '../../components/Button';
import Card from '../../components/Card';
import InputField from '../../components/InputField';
import InputDropdown from '../../components/InputDropdown';
import Main from '../../components/Main';
import Paragraph from '../../components/Paragraph';
import Row from '../../components/Row';
import Stack from '../../components/Stack';
import MDAHeader from '../../components/MDAHeader';
import BeamRequest1 from '../../components/BeamRequest1';

export default () => (
  <Main style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
    <MDAHeader/>
    <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
      <Card style={{ justifyContent: 'center', minWidth: '50px', minHeight: '570px', width: '720px', flexGrow: '0' }}>
        <BeamRequest1/>
        {/*<Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
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
        </Row>*/}
      </Card>
    </Row>
  </Main>
);
