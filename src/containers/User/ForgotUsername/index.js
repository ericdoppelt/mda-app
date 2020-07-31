import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import ForgotUsername from '../../../components/Custom/UserReset/forgotusername';
import Card from '../../../components/UIzard/Card';
import Image from '../../../components/UIzard/Image';
import Row from '../../../components/UIzard/Row';
import Stack from '../../../components/UIzard/Stack';
import * as Constants from '../../../constants';


export default function Home() {

  const classes = Constants.useStyles();
  return (
    <ThemeProvider theme={Constants.darkTheme}>
      <div className={classes.root}>
        <MDAHeader2/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
            <Card style={{ justifyContent: 'center', minWidth: '50px', minHeight: '500px', width: '500px', flexGrow: '0' }}>
              <Stack style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
                <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
                  <Image style={{ width: '120px', height: '120px', backgroundImage: 'url(/images/ISEEULogo.png)' }} />
                </Row>
                <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
                  <ForgotUsername/>
                </Row>
              </Stack>
            </Card>
          </Row>
        </main>
      </div>
    </ThemeProvider>
  );
};
