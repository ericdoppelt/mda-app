import React from 'react';
import Row from '../../../components/UIzard/Row';
import Card from '../../../components/UIzard/Card';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import * as Constants from '../../../constants'
import { ThemeProvider } from '@material-ui/core/styles';
import UserProfile from '../../../components/Custom/UserProfile';
import Calendar from '../../../components/Custom/Calendar/Calendar';

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
              <UserProfile/>
            </Row>
            <Calendar/>
          </Card>
        </Row>
        </main>
      </div>
    </ThemeProvider>
  );
};
