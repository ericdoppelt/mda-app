import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Typography} from '@material-ui/core';
import Card from '../../../components/UIzard/Card';
import Row from '../../../components/UIzard/Row';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import * as Constants from '../../../constants'
import { ThemeProvider } from '@material-ui/core/styles';
import { createContext } from "react";
import Stack from '../../../components/UIzard/Stack';
import { observer } from "mobx-react"
import ScheduleContainer from '../../../components/Custom/Scheduling/ScheduleContainer';


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
            <Card style={{ justifyContent: 'center', alignItems: 'auto', minWidth: '50px', minHeight: '600px', flexGrow: '0' }}>
              <Stack style={{ justifyContent: 'flex-start', minWidth: '50px', minHeight: '50px' }}>
                <ScheduleContainer/>
              </Stack>
            </Card>
          </Row>
        </main>
      </div>
    </ThemeProvider>
  );
};
