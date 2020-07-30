import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import LoginForm from '../../../components/Custom/LoginForm';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import Card from '../../../components/UIzard/Card';
import Image from '../../../components/UIzard/Image';
import Row from '../../../components/UIzard/Row';
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
            <Card style={{ justifyContent: 'center', minWidth: '50px', minHeight: '570px', width: '720px', flexGrow: '0' }}>
              <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
                <Image style={{ width: '120px', height: '120px', backgroundImage: 'url(/images/ISEEULogo.png)' }} />

              </Row>
              
                <Typography style={{marginTop: '20px', marginBottom: '20px',}} variant='subtitle2'>Sign in to continue</Typography>
              
              <LoginForm/>
            </Card>
          </Row>
        </main>
      </div>
    </ThemeProvider>
  );
};
