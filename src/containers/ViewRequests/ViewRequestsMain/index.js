import React from 'react';
import {Redirect} from 'react-router-dom';
import Image from '../../../components/UIzard/Image';
import Stack from '../../../components/UIzard/Stack';
import {Typography} from '@material-ui/core';
import ViewRequests from '../../../components/Custom/ViewRequests';
import CardNoShadow from '../../../components/UIzard/CardNoShadow';
import Row from '../../../components/UIzard/Row';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import * as Constants from '../../../constants'
import { ThemeProvider } from '@material-ui/core/styles';

export default function Home() {
  if (window.sessionStorage.getItem("access_token") === null) return <Redirect to='user-login'/>;

  const classes = Constants.useStyles();
  return (
    <ThemeProvider theme={Constants.darkTheme}>
      <div className={classes.root}>
        <MDAHeader2/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Row style={{ justifyContent: 'center', alignSelf: 'auto', minWidth: '50px', minHeight: '50px' }}>
            {/*<CardNoShadow style={{ justifyContent: 'center', alignItems: 'auto', minWidth: '50px', minHeight: '600px', flexGrow: '0' }}>*/}
              <Stack style={{ justifyContent: 'flex-start', minWidth: '50px', minHeight: '50px' }}>
                <ViewRequests/>
              </Stack>
            {/*</CardNoShadow>*/}
          </Row>
        </main>
      </div>
    </ThemeProvider>
  );
};
