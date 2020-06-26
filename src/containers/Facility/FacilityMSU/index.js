import React from 'react';

import Card from '../../../components/UIzard/Card';
import Image from '../../../components/UIzard/Image';
import Paragraph from '../../../components/UIzard/Paragraph';
import Row from '../../../components/UIzard/Row';
import Stack from '../../../components/UIzard/Stack';
import MDAHeader2 from '../../../components/Custom/MDAHeader2'
import TabsMSU from '../../../components/Custom/FacilityPages/FacilityMSU'
import { ThemeProvider } from '@material-ui/core/styles';
import * as Constants from '../../../constants'

export default function FacilityNSRL() {

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
              <h1>Michigan State NSCL</h1>
            </Row>
            <Stack style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
              <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
                <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/MSULogo.png)' }} />
              </Row>
            </Stack>
            <h1><strong>Guide to Reserving Testing Time</strong></h1>
            <TabsMSU/>
          </Card>
        </Row>
      </main>
    </div>
    </ThemeProvider>
  );
};
