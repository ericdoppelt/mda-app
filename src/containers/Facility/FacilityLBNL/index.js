import React from 'react';

import Card from '../../../components/UIzard/Card';
import Image from '../../../components/UIzard/Image';
import Paragraph from '../../../components/UIzard/Paragraph';
import Row from '../../../components/UIzard/Row';
import Stack from '../../../components/UIzard/Stack';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import VerticalLinearStepper from '../../../components/Custom/FacilityPages/FacilityLBNL';
import * as Constants from '../../../constants'
import { ThemeProvider } from '@material-ui/core/styles';


export default function Home() {

  const classes = Constants.useStyles();
  return (
    <ThemeProvider theme={Constants.darkTheme}>
      <div className={classes.root}>
        <MDAHeader2/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
            <Card style={{ justifyContent: 'center', minWidth: '50px', minHeight: '570px', flexGrow:'0'}}>
              <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
                <h1>Lawrence Berkeley National Laboratory</h1>
              </Row>
              <Stack style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
                <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
                  <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/LBNLLogo.jpg)' }} />
                </Row>
              </Stack>
              <Row>
                <Stack style={{justifyContent: 'flex-start'}}>
                  <h2>Contact Information</h2>
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
                </Stack>
                <Stack style={{justifyContent: 'flex-start'}}>
                  <h2>Additional Information</h2>
                  <Paragraph>
                    <a href="http://cyclotron.lbl.gov/beam-request" target="_blank" rel="noopener noreferrer">Beam Request</a>
                    <br/>
                    <a href="http://cyclotron.lbl.gov/new-user-checklist" target="_blank" rel="noopener noreferrer">New User Checklist</a>
                    <br/>
                    <a href="http://cyclotron.lbl.gov/schedule" target="_blank" rel="noopener noreferrer">Schedule</a>
                    <br/>
                    <a href="http://cyclotron.lbl.gov/procedures" target="_blank" rel="noopener noreferrer">Procedures</a>
                    <br/>
                    <a href="https://commute.lbl.gov/resource/maps-directions-to-berkeley-lab/" target="_blank" rel="noopener noreferrer">Directions and Parking</a>
                    <br/>
                    <a href="https://commute.lbl.gov/resource/maps-directions-to-berkeley-lab/" target="_blank" rel="noopener noreferrer">Directions and Parking</a>
                  </Paragraph>
                  <h2>Additional Documents</h2>
                  <Paragraph>
                    <a href="https://drive.google.com/file/d/0B-7RPAKnuE05XzRSYlJ3RU1Dc2xEaFJOaUdBVkJ2OFdJeEFz/view" target="_blank" rel="noopener noreferrer">Affiliate Forms</a>
                  </Paragraph>
                </Stack>
              </Row>
              <h3>Guide to Reserving Testing Time</h3>
              <VerticalLinearStepper/>
            </Card>
          </Row>
        </main>
      </div>
    </ThemeProvider>
  );
};
