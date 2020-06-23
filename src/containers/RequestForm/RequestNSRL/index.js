import React, {useState} from 'react';

import Row from '../../../components/UIzard/Row';
import RequestFormTAMU from '../../../components/Custom/RequestFormTAMU';
import Stack from '../../../components/UIzard/Stack';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import * as Constants from '../../../constants'
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


export default function Home() {

  const classes = Constants.useStyles();
  return (
    <ThemeProvider theme={Constants.darkTheme}>
      <div className={classes.root}>
        <MDAHeader2/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
        <Row style={{ justifyContent: 'flex-start', alignSelf: 'auto', minWidth: '50px', minHeight: '50px' }}>
          <Stack style={{ justifyContent: 'center', alignItems: 'flex-end', minWidth: '50px', minHeight: '600px', width: '900px', flexGrow: '0' }}>
            <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
              Coming Soon
            </Row>
          </Stack>
        </Row>
        </main>
      </div>
    </ThemeProvider>
  );
};
