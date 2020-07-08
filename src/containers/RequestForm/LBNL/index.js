import React from 'react';
import { createContext } from "react";
import {Redirect} from 'react-router-dom';

import Row from '../../../components/UIzard/Row';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import * as Constants from '../../../constants'
import {ThemeProvider } from '@material-ui/core/styles';
import Card from '../../../components/UIzard/Card';
import Stack from '../../../components/UIzard/Stack';

import TesterForm from '../../../components/Custom/RequestForms/TesterForm';
import ExperimentForm from '../../../components/Custom/RequestForms/ExpirementForm';
import TesterStorage from '../../../stores/TesterStore';
import ExpirementStore from '../../../stores/ExpirementStore';
import LBNLStorage from '../../../stores/LBNLStore';
import LBNLForm from '../../../components/Custom/RequestForms/LBNL/LBNLForm';
import LBNLHeader from '../../../components/Custom/RequestForms/LBNL/LBNLHeader';
import LBNLSubmit from '../../../components/Custom/RequestForms/LBNL/LBNLSubmit';
import DiscreteIons from '../../../components/Custom/RequestForms/DiscreteIons';
import StartDatePicker from '../../../components/Custom/RequestForms/StartDatePicker';

const TesterStore = createContext(TesterStorage);
const ExpirementStorage = createContext(ExpirementStore);
const LBNLStore = createContext(LBNLStorage);
 
export default function LBNL() {
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
              <LBNLHeader/>
              <TesterStore.Provider>
                <ExpirementStorage.Provider>
                  <LBNLStore.Provider>
                    <TesterForm/>
                    <ExperimentForm/>
                    <DiscreteIons facility="LBNL"/>
                    <StartDatePicker/>
                    <LBNLForm/>
                    <LBNLSubmit/>
                  </LBNLStore.Provider>
                </ExpirementStorage.Provider>
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
