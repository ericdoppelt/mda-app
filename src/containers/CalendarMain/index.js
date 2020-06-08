import React from 'react';

import Card from '../../components/Card';
import Checkbox from '../../components/Checkbox';
import Header from '../../components/Header';
import Main from '../../components/Main';
import Paragraph from '../../components/Paragraph';
import Radio from '../../components/Radio';
import Row from '../../components/Row';
import Stack from '../../components/Stack';
import Switch from '../../components/Switch';
import Title from '../../components/Title';
import DemoApp from '../../components/Calendar/DemoApp';
import MDAHeader from '../../components/MDAHeader';

export default () => (
  <Main style={{ justifyContent: 'center', alignItems: 'center' }}>
    <MDAHeader/>
    <Row style={{ minWidth: '50px', minHeight: '50px' }}>
      <Stack style={{ justifyContent: 'flex-end', alignSelf: 'auto', minWidth: '50px', minHeight: '50px' }}>
        {/*<Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/d102a6df-a42a-4af3-bfdc-8da28402a42d.png)' }} /> */}
        <DemoApp />
      </Stack>
      <Card style={{ justifyContent: 'center', minWidth: '50px', minHeight: '700px', width: '350px', flexGrow: '0' }}>
        <Header>
          Filter
        </Header>
        <Row style={{ justifyContent: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Title style={{ width: 'calc(100% - 20px)', minHeight: '60px', textAlign: 'center', justifyContent: 'center', alignItems: 'flex-end' }}>
            Testing Site
          </Title>
        </Row>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Stack style={{ alignItems: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Checkbox />
            <Radio style={{ width: '20px', height: '20px' }} />
            <Switch />
          </Stack>
          <Stack style={{ alignItems: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Paragraph>
              Dolor sit
            </Paragraph>
            <Paragraph>
              Amet tortor
            </Paragraph>
            <Paragraph>
              Adipiscing
            </Paragraph>
          </Stack>
        </Row>
        <Row style={{ justifyContent: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Title style={{ width: '180px', minHeight: '60px', textAlign: 'center', justifyContent: 'center', alignItems: 'flex-end' }}>
            Integrator
          </Title>
        </Row>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Stack style={{ justifyContent: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Radio style={{ width: '20px', height: '20px' }} />
            <Radio style={{ width: '20px', height: '20px' }} />
          </Stack>
          <Stack style={{ alignItems: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Paragraph>
              Sapien sit
            </Paragraph>
            <Paragraph>
              Amet arcu
            </Paragraph>
          </Stack>
        </Row>
      </Card>
    </Row>
  </Main>
);
