import React from 'react';

import Card from '../../../components/UIzard/Card';
import Image from '../../../components/UIzard/Image';
import Paragraph from '../../../components/UIzard/Paragraph';
import Row from '../../../components/UIzard/Row';
import Stack from '../../../components/UIzard/Stack';
import ButtonNSRL from '../../../components/Custom/FacilityPages/FacilityNSRL/button'
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
          <Stack style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
              <h1>Brookhaven National Laboratory NSRL</h1>
            </Row>
            <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
                <Image style={{ width: '250px', height: '120px', backgroundImage: 'url(/images/brnllogo.png)' }} />
            </Row>
              <h1>Guide to Reserving Testing Time</h1>
            <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
              <ButtonNSRL/>
            </Row>
        </Stack>
      </main>
    </div>
    </ThemeProvider>
  );
};
