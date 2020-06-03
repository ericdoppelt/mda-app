import React from 'react';

import Card from '../../components/Card';
import CircleImage from '../../components/CircleImage';
import Image from '../../components/Image';
import Main from '../../components/Main';
import NavigationHeader from '../../components/NavigationHeader';
import Paragraph from '../../components/Paragraph';
import Row from '../../components/Row';
import Stack from '../../components/Stack';

export default () => (
  <Main style={{ justifyContent: 'space-between', alignItems: 'center' }}>
    <NavigationHeader>
      <CircleImage style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/placeholder-03.jpg)' }} />
      <CircleImage style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/placeholder-01.jpg)' }} />
      <CircleImage style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/placeholder-02.jpg)' }} />
      <CircleImage style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/placeholder-04.jpg)' }} />
    </NavigationHeader>
    <Row style={{ justifyContent: 'flex-start', alignSelf: 'auto', minWidth: '50px', minHeight: '50px' }}>
      <Card style={{ justifyContent: 'center', alignItems: 'flex-end', minWidth: '50px', minHeight: '600px', width: '900px', flexGrow: '0' }}>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Paragraph>
            Lorem ipsum dolor sit id
          </Paragraph>
        </Row>
        <Stack style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/placeholder-05.jpg)' }} />
            <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/placeholder-06.jpg)' }} />
          </Row>
          <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/placeholder-07.jpg)' }} />
            <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/placeholder-08.jpg)' }} />
          </Row>
        </Stack>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Paragraph>
            Consectetur leo
          </Paragraph>
        </Row>
      </Card>
    </Row>
  </Main>
);
