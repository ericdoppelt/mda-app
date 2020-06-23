import React from 'react';
import Card from '../../../components/UIzard/Card';
import Main from '../../../components/UIzard/Main';
import Paragraph from '../../../components/UIzard/Paragraph';
import Row from '../../../components/UIzard/Row';
import Stack from '../../../components/UIzard/Stack';
import RegistrationForm from '../../../components/Custom/RegistrationForm';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import * as Constants from '../../../constants'
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


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
              <Stack style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
                <Paragraph>
                  Registration
                </Paragraph>
                <RegistrationForm/>
              </Stack>
            </Card>
          </Row>
        </main>
      </div>
    </ThemeProvider>
  );
};
