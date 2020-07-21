import React from 'react';
import Card from '../../../components/UIzard/Card';
import Row from '../../../components/UIzard/Row';
import Stack from '../../../components/UIzard/Stack';
import RegistrationForm from '../../../components/Custom/RegistrationForm';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import * as Constants from '../../../constants'
import { ThemeProvider } from '@material-ui/core/styles';
import Image from '../../../components/UIzard/Image';
import Title from '../../../components/UIzard/Title';
import ResetPassword from '../../../components/Custom/UserReset/resetpassword';

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
                  <ResetPassword/>
                </Row>
              </Stack>
            </Card>
          </Row>
        </main>
      </div>
    </ThemeProvider>
  );
};
