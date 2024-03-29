import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Redirect } from 'react-router-dom';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import ScheduleContainer from '../../../components/Custom/Scheduling/ScheduleContainer';
import Row from '../../../components/UIzard/Row';
import Stack from '../../../components/UIzard/Stack';
import * as Constants from '../../../constants';


export default function Home() {
  

  const classes = Constants.useStyles();

  if (window.sessionStorage.getItem("access_token") === null) return <Redirect to='user-login'/>;

  return (
    <ThemeProvider theme={Constants.darkTheme}>
      <div className={classes.root}>
        <MDAHeader2/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Row style={{ justifyContent: 'center', alignSelf: 'auto', minWidth: '50px', minHeight: '50px' }}>
              <Stack style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
                <ScheduleContainer/>
              </Stack>
          </Row>
        </main>
      </div>
    </ThemeProvider>
  );
};
