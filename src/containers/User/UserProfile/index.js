import React from 'react';
import Paragraph from '../../../components/UIzard/Paragraph';
import Row from '../../../components/UIzard/Row';
import Stack from '../../../components/UIzard/Stack';
import LoginForm from '../../../components/Custom/LoginForm';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import * as Constants from '../../../constants'
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import UserProfile from '../../../components/Custom/UserProfile';

export default function Home() {

  const classes = Constants.useStyles();
  return (
    <ThemeProvider theme={Constants.darkTheme}>
      <div className={classes.root}>
        <MDAHeader2/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
        <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
          <Stack style={{ justifyContent: 'center', minWidth: '50px', minHeight: '570px', width: '720px', flexGrow: '0' }}>
            <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
              <UserProfile/>
            </Row>
            <LoginForm/>
          </Stack>
        </Row>
        </main>
      </div>
    </ThemeProvider>
  );
};
