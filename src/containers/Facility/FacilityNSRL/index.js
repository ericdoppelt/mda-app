import React from 'react';

import Card from '../../../components/UIzard/Card';
import Image from '../../../components/UIzard/Image';
import Paragraph from '../../../components/UIzard/Paragraph';
import Row from '../../../components/UIzard/Row';
import Stack from '../../../components/UIzard/Stack';
import VerticalLinearStepper from '../../../components/Custom/FacilityPages/FacilityNSRL'
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import * as Constants from '../../../constants'

export default function FacilityNSRL() {

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
              <h1>Brookhaven National Laboratory NSRL</h1>
            </Row>
            <Stack style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
              <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
                <Image style={{ width: '250px', height: '120px', backgroundImage: 'url(/images/brnllogo.png)' }} />
              </Row>
            </Stack>
            <Row>
              <Stack style={{justifyContent:'flex-start'}}>
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
              <Stack>
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
