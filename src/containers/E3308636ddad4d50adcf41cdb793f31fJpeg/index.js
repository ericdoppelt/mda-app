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
  <Main style={{ justifyContent: 'space-between', alignItems: 'center' }}>
    <NavigationHeader>
      <CircleImage style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/placeholder-03.jpg)' }} />
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
    <Row style={{ justifyContent: 'flex-start', alignSelf: 'auto', minWidth: '50px', minHeight: '50px' }}>
      <Card style={{ justifyContent: 'center', alignItems: 'flex-end', minWidth: '50px', minHeight: '600px', width: '900px', flexGrow: '0' }}>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Title>
            Facility Information
          </Title>
        </Row>
        <Stack style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Link to="/empty-artboard-1">
              <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/tamulogo.png)' }} />
            </Link>
            <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/BASE Logo 2018.png)' }} />
          </Row>
          <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Image style={{ width: '210px', height: '100px', backgroundImage: 'url(/images/brnllogo.png)' }} />
            <Image style={{ width: '280px', height: '50px', backgroundImage: 'url(/images/msu.png)' }} />
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
