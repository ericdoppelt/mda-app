import { ThemeProvider } from '@material-ui/core/styles';
import { observable } from "mobx";
import React from 'react';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import UserProfile from '../../../components/Custom/UserProfile';
import Row from '../../../components/UIzard/Row';
import * as Constants from '../../../constants';

const samp = observable({ text: "John" })
//const UserProfileStore = createContext(UserProfileStorage);

export default function Home() {


  const classes = Constants.useStyles();
  return (
    <ThemeProvider theme={Constants.darkTheme}>
      <div className={classes.root}>
        <MDAHeader2/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <UserProfile samp={samp}/>
          </Row>
        </main>
      </div>
    </ThemeProvider>
  );
};
