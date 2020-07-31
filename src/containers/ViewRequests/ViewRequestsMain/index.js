import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Redirect } from 'react-router-dom';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import ViewRequests from '../../../components/Custom/ViewRequests';
import Row from '../../../components/UIzard/Row';
import Stack from '../../../components/UIzard/Stack';
import * as Constants from '../../../constants';

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
