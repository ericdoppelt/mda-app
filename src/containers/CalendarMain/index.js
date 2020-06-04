import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../components/Card';
import Checkbox from '../../components/Checkbox';
import Header from '../../components/Header';
import Image from '../../components/Image';
import Main from '../../components/Main';
import NavigationHeader from '../../components/NavigationHeader';
import Paragraph from '../../components/Paragraph';
import Radio from '../../components/Radio';
import Row from '../../components/Row';
import Stack from '../../components/Stack';
import Switch from '../../components/Switch';
import Title from '../../components/Title';

export default () => (
  <Main style={{ justifyContent: 'center', alignItems: 'center' }}>
    <NavigationHeader>
      <Link to="/home">
        <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/homelogo.png)' }} />
      </Link>
      <Link to="/facility-main">
        <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/a544991c-8004-402e-a784-9d0a51d6d3b0.png)' }} />
      </Link>
      <Image style={{ width: '120px', height: '90px', backgroundImage: 'url(/images/62187f3a-3839-43dc-8b2e-76b97b7ae0b1.png)' }} />
      <Link to="/request-form-main">
        <Image style={{ width: '170px', height: '90px', backgroundImage: 'url(/images/c8a8db2c-5298-4115-ba33-dc56f20bf50a.png)' }} />
      </Link>
      <Link to="/view-requests-main">
        <Image style={{ width: '150px', height: '90px', backgroundImage: 'url(/images/viewlogo.png)' }} />
      </Link>
      <Link to="/">
        <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/d102a6df-a42a-4af3-bfdc-8da28402a42d.png)' }} />
      </Link>
    </NavigationHeader>
    <Row style={{ minWidth: '50px', minHeight: '50px' }}>
      <Stack style={{ justifyContent: 'flex-end', alignSelf: 'auto', minWidth: '50px', minHeight: '50px' }}>
        <Image style={{ width: '900px', height: '800px', backgroundImage: 'url(/images/calendar2.png)' }} />
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
