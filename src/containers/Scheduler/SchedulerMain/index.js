import React from 'react';
import {Redirect} from 'react-router-dom';
import {Typography} from '@material-ui/core';
import Card from '../../../components/UIzard/Card';
import Row from '../../../components/UIzard/Row';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import CalendarSched from '../../../components/Custom/CalendarSched/CalendarSched';
import * as Constants from '../../../constants'
import { ThemeProvider } from '@material-ui/core/styles';
import RangeButton from '../../../components/Custom/Scheduling/RangeButton';
import ScheduleStorage from '../../../stores/SchedulingStore';
import { createContext } from "react";
import Stack from '../../../components/UIzard/Stack';
import AllPrioritizers from '../../../components/Custom/Scheduling/AllPrioritizers';

const ScheduleStore = createContext(ScheduleStorage);

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
                <ScheduleStore.Provider>
                  <AllPrioritizers/>
                  <RangeButton/>
                  <CalendarSched/>
                </ScheduleStore.Provider>
              </Stack>
            </Card>
          </Row>
        </main>
      </div>
    </ThemeProvider>
  );
};
