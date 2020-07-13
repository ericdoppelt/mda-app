import React from 'react';
import {Redirect} from 'react-router-dom';
import Image from '../../../components/UIzard/Image';
import Stack from '../../../components/UIzard/Stack';
import Title from '../../../components/UIzard/Title';
import {Typography} from '@material-ui/core';
import ViewRequests from '../../../components/Custom/ViewRequests';
import Card from '../../../components/UIzard/Card';
import Row from '../../../components/UIzard/Row';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import * as Constants from '../../../constants'
import { ThemeProvider } from '@material-ui/core/styles';
import Scheduler from '../../../components/Custom/Scheduling/Scheduler';
import RangeButton from '../../../components/Custom/Scheduling/RangeButton';


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
            <Card style={{ justifyContent: 'center', alignItems: 'auto', minWidth: '50px', minHeight: '600px', flexGrow: '0' }}>
              <Stack style={{ justifyContent: 'flex-start', minWidth: '50px', minHeight: '50px' }}>
                <Typography variant="h3">
                  Scheduling
                </Typography>
                <RangeButton/>
                <Scheduler/>
              </Stack>
            </Card>
          </Row>
        </main>
      </div>
    </ThemeProvider>
  );
};
