import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ButtonNSRL from '../../../components/Custom/FacilityPages/FacilityNSRL/button';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import Image from '../../../components/UIzard/Image';
import Row from '../../../components/UIzard/Row';
import Stack from '../../../components/UIzard/Stack';
import * as Constants from '../../../constants';


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
              <h2>Guide to Reserving Testing Time</h2>
            <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
              <ButtonNSRL/>
            </Row>
        </Stack>
      </main>
    </div>
    </ThemeProvider>
  );
};
