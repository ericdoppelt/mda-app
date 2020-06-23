import React from 'react';

import Card from '../../../components/UIzard/Card';
import Image from '../../../components/UIzard/Image';
import Main from '../../../components/UIzard/Main';
import MDAHeader from '../../../components/Custom/MDAHeader';
import Paragraph from '../../../components/UIzard/Paragraph';
import Row from '../../../components/UIzard/Row';
import Stack from '../../../components/UIzard/Stack';
import VerticalLinearStepper from '../../../components/Custom/FacilityPages/FacilityNSRL'

export default () => (
  <Main style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
    <MDAHeader/>
    <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
      <Card style={{ justifyContent: 'center', minWidth: '50px', minHeight: '570px', width: '720px', flexGrow: '0' }}>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <h1>Brookhaven National Laboratory NSRL</h1>
        </Row>
        <Stack style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Image style={{ width: '250px', height: '120px', backgroundImage: 'url(/images/brnllogo.png)' }} />
          </Row>
        </Stack>
        <h2>Contact Information</h2>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
        <Paragraph>
            Physical Address:
            <br/>
            <br/>
            1 Cyclotron Rd. Bldg. 88,
            <br/>
            Berkeley, CA 94720
            <br/>
            <br/>
            Admin Office Address:
            <br/>
            <br/>
            Lawrence Berkeley National Laboratory
            <br/>
            88-Inch Cyclotron Admin Office
            <br/>
            One Cyclotron Road, MS 88R0192
          </Paragraph>
        </Row>
        <h2>Additional Information</h2>
        <Paragraph>
          <a href="https://www.bnl.gov/nsrl/userguide/" target="_blank" rel="noopener noreferrer">First Time User Info</a>
          <br/>
          <a href="https://www.bnl.gov/nsrl/about.php" target="_blank" rel="noopener noreferrer">About The Site</a>
          <br/>
          <a href="https://www.bnl.gov/nsrl/facility-users/" target="_blank" rel="noopener noreferrer">Beam Request Portal</a>
          <br/>
          <a href="https://www.bnl.gov/maps/" target="_blank" rel="noopener noreferrer">Maps and Directions</a>
          <br/>
          <a href="https://www.bnl.gov/guv/id.php" target="_blank" rel="noopener noreferrer">Identification Requirements</a>
          <br/>
          <a href="https://www.bnl.gov/nsrl/facility-users/steps.php" target="_blank" rel="noopener noreferrer">Required Training Steps</a>
          <br/>
          <a href="https://www.bnl.gov/training/pass/" target="_blank" rel="noopener noreferrer">Training Portal</a>
        </Paragraph>
        <h2>Additional Documents</h2>
        <Paragraph>
          <a href="https://drive.google.com/file/d/0B-7RPAKnuE05XzRSYlJ3RU1Dc2xEaFJOaUdBVkJ2OFdJeEFz/view" target="_blank" rel="noopener noreferrer">Affiliate Forms</a>
        </Paragraph>
        <h3>Guide to Reserving Testing Time</h3>
        <VerticalLinearStepper/>
      </Card>
    </Row>
  </Main>
);
