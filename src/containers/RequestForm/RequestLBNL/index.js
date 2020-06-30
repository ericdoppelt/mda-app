import React from 'react';

import Row from '../../../components/UIzard/Row';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import * as Constants from '../../../constants'
import {ThemeProvider } from '@material-ui/core/styles';
import Card from '../../../components/UIzard/Card';
import { createContext } from "react";
import Stack from '../../../components/UIzard/Stack';

import TesterForm from '../../../components/Custom/TesterForm';
import ExperimentForm from '../../../components/Custom/ExpirementForm';
import TesterStorage from '../../../stores/TesterStore';
import ExpirementStorage from '../../../stores/ExpirementStore';
import LBNLStorage from '../../../stores/LBNLStore';
import LBNLForm from '../../../components/Custom/LBNLForm';
import LBNLSubmit from '../../../components/Custom/LBNLSubmit';

const TesterStore = createContext(TesterStorage);
const ExpirementStore = createContext(ExpirementStorage);
const LBNLStore = createContext(LBNLStorage);
 
export default function Home() {

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
              <TesterStore.Provider>
                <ExpirementStore.Provider>
                  <LBNLStore.Provider>
                    <TesterForm/>
                    <ExperimentForm/>
                    <LBNLForm/>
                    <LBNLSubmit/>
                  </LBNLStore.Provider>
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
