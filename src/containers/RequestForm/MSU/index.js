import React from 'react';
import { createContext } from "react";
import {Redirect} from 'react-router-dom';

import Card from '../../../components/UIzard/Card';
import Row from '../../../components/UIzard/Row';
import Stack from '../../../components/UIzard/Stack';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import * as Constants from '../../../constants'
import { ThemeProvider } from '@material-ui/core/styles';

import TesterForm from '../../../components/Custom/RequestForms/TesterForm';
import ExperimentForm from '../../../components/Custom/RequestForms/ExpirementForm';
import TesterStorage from '../../../stores/TesterStore';
import ExpirementStorage from '../../../stores/ExpirementStore';
import MSUHeader from '../../../components/Custom/RequestForms/MSU/MSUHeader';
import MSUSubmit from '../../../components/Custom/RequestForms/MSU/MSUSubmit';
import DiscreteIons from '../../../components/Custom/RequestForms/DiscreteIons';
import StartDatePicker from '../../../components/Custom/RequestForms/StartDatePicker';

const TesterStore = createContext(TesterStorage);
const ExpirementStore = createContext(ExpirementStorage);

export default function Home() {
  if (window.sessionStorage.getItem("access_token") === null) return <Redirect to='user-login'/>;

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
              <Stack>
                  <MSUHeader/>
                  <TesterStore.Provider>
                    <ExpirementStore.Provider>
                      <TesterForm/>
                      <ExperimentForm facility="MSU"/>
                      <DiscreteIons/>
                      <StartDatePicker/>
                      <MSUSubmit/>
                    </ExpirementStore.Provider>
                  </TesterStore.Provider> 
                </Stack>
              </Row>
            </Card>
          </Row>
        </main>
      </div>
    </ThemeProvider>
  );
};
