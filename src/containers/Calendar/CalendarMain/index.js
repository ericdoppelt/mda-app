import React from 'react';
import Card from '../../../components/UIzard/Card';
import Row from '../../../components/UIzard/Row';
import Calendar from '../../../components/Custom/Calendar/Calendar';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import * as Constants from '../../../constants'
import { ThemeProvider } from '@material-ui/core/styles';


export default function CalendarMain() {

  const classes = Constants.useStyles();
  return (
    <ThemeProvider theme={Constants.darkTheme}>
      <div className={classes.root}>
        <MDAHeader2/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Row style={{ justifyContent: 'center', alignSelf: 'auto', minWidth: '800px', minHeight: '50px'}}>
            <Card style={{ justifyContent: 'center', alignItems: 'auto', minWidth: '800px', minHeight: '400px', flexGrow: '0' }}>
              <Calendar/>
            </Card>
          </Row>
        </main>
      </div>
    </ThemeProvider>
  );
};
