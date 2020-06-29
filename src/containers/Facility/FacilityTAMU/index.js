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
              <TabsTAMU/>
            </Card>
          </Row>
        </main>
      </div>
    </ThemeProvider>
  );
};
