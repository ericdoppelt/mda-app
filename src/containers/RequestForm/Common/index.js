import React, {useState} from 'react';
import Card from '../../../components/UIzard/Card';
import Row from '../../../components/UIzard/Row';
import RequestFormCommon from '../../../components/Custom/RequestForms/Common';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import * as Constants from '../../../constants'
import { ThemeProvider } from '@material-ui/core/styles';


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
                <RequestFormCommon/>
              </Row>
            </Card>
          </Row>
        </main>
      </div>
    </ThemeProvider>
  );
};
