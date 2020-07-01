import React from 'react';
import { createContext } from "react";

import Card from '../../../components/UIzard/Card';
import Row from '../../../components/UIzard/Row';
import Stack from '../../../components/UIzard/Stack';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import * as Constants from '../../../constants'
import {ThemeProvider } from '@material-ui/core/styles';
import NSRLHeader from '../../../components/Custom/RequestForms/NSRL/NSRLHeader';
import NSRLForm from '../../../components/Custom/RequestForms/NSRL/NSRLForm';
import NSRLStorage from '../../../stores/NSRLStore';
import TesterForm from '../../../components/Custom/RequestForms/TesterForm';
import ExperimentForm from '../../../components/Custom/RequestForms/ExpirementForm';
import TesterStorage from '../../../stores/TesterStore';
import ExpirementStorage from '../../../stores/ExpirementStore';
import NSRLSubmit from '../../../components/Custom/RequestForms/NSRL/NSRLSubmit';

const TesterStore = createContext(TesterStorage);
const ExpirementStore = createContext(ExpirementStorage);
const NSRLStore = createContext(NSRLStorage);

export default function Home() {

  const classes = Constants.useStyles();
  return (
    <ThemeProvider theme={Constants.darkTheme}>
      <div className={classes.root}>
        <MDAHeader2/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px'}}>
            <Card style={{ justifyContent: 'center', minWidth: '50px', minHeight: '570px', flexGrow:'0'}}>
              <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
                <Stack>
                  <NSRLHeader/>
                  <TesterStore.Provider>
                    <ExpirementStore.Provider>
                      <NSRLStore.Provider>
                        <TesterForm/>
                        <ExperimentForm facility="NSRL"/>
                        <NSRLForm/>
                        <NSRLSubmit/>
                      </NSRLStore.Provider>
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
