import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../components/Card';
import CircleImage from '../../components/CircleImage';
import Icon from '../../components/Icon';
import Image from '../../components/Image';
import Main from '../../components/Main';
import NavigationHeader from '../../components/NavigationHeader';
import Paragraph from '../../components/Paragraph';
import Radio from '../../components/Radio';
import Row from '../../components/Row';
import Stack from '../../components/Stack';
import Title from '../../components/Title';

export default () => (
  <Main style={{ justifyContent: 'center', alignItems: 'center' }}>
    <NavigationHeader>
      <Link to="/e3308636ddad4d50adcf41cdb793f31f-jpeg">
        <CircleImage style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/placeholder-03.jpg)' }} />
      </Link>
      <CircleImage style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/placeholder-01.jpg)' }} />
      <Link to="/empty-artboard">
        <CircleImage style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/placeholder-02.jpg)' }} />
      </Link>
      <Link to="/">
        <CircleImage style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/placeholder-04.jpg)' }} />
      </Link>
    </NavigationHeader>
    <Row style={{ minWidth: '50px', minHeight: '50px' }}>
      <Stack style={{ justifyContent: 'flex-end', alignSelf: 'auto', minWidth: '50px', minHeight: '50px' }}>
        <Image style={{ width: '910px', height: '680px', backgroundImage: 'url(/images/calendarsample.png)' }} />
      </Stack>
      <Card style={{ justifyContent: 'center', minWidth: '50px', minHeight: '700px', width: '350px', flexGrow: '0' }}>
        <Title style={{ width: 'calc(100% - 20px)' }}>
          Filter
        </Title>
        <Row style={{ justifyContent: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Paragraph>
            Testing Site
          </Paragraph>
        </Row>
        <Row style={{ justifyContent: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Stack style={{ alignItems: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Radio style={{ width: '20px', height: '20px' }} />
            <Radio style={{ width: '20px', height: '20px' }} />
            <Icon liga="dot-circle" />
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
          <Paragraph>
            Integrator
          </Paragraph>
        </Row>
        <Row style={{ justifyContent: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Stack style={{ justifyContent: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
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
