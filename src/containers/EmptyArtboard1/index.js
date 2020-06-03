import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../components/Card';
import CircleImage from '../../components/CircleImage';
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
      <Link to="/e3308636ddad4d50adcf41cdb793f31f-jpeg">
        <CircleImage style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/placeholder-03.jpg)' }} />
      </Link>
      <Link to="/a2f310241f66477195c4bb216a1ae169-jpeg">
        <CircleImage style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/placeholder-01.jpg)' }} />
      </Link>
      <Link to="/empty-artboard">
        <CircleImage style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/placeholder-02.jpg)' }} />
      </Link>
      <Link to="/">
        <CircleImage style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/placeholder-04.jpg)' }} />
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
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Paragraph>
            Coming soon...
          </Paragraph>
        </Row>
      </Card>
    </Row>
  </Main>
);
