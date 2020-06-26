import React from 'react';
import Image from '../../../components/UIzard/Image';
import Paragraph from '../../../components/UIzard/Paragraph';
import Row from '../../../components/UIzard/Row';
import Card from '../../../components/UIzard/Card';
import Stack from '../../../components/UIzard/Stack';
import TabsTAMU from '../../../components/Custom/FacilityPages/FacilityTAMU';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import { ThemeProvider } from '@material-ui/core/styles';
import * as Constants from '../../../constants'

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
                <h1>Texas A&M University Cyclotron</h1>
              </Row>
              <Stack style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
                <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
                  <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/1388bb77-92c9-4f33-843b-4978f4a94606.png)' }} />
                </Row>
              </Stack>
              <h1>Guide to Reserving Testing Time</h1>
              <TabsTAMU/>
            </Card>
          </Row>
        </main>
      </div>
    </ThemeProvider>
  );
};
