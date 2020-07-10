import React from 'react';
import { createContext } from "react";
import Row from '../../../components/UIzard/Row';
import Card from '../../../components/UIzard/Card';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import * as Constants from '../../../constants'
import { ThemeProvider } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import UserProfile from '../../../components/Custom/UserProfile';
import UsertodoList from '../../../components/Custom/UserProfile/TodoList/generateList';
import Calendar from '../../../components/Custom/Calendar/Calendar';
import { observer } from "mobx-react"
import { observable } from "mobx"
import UserProfileStorage from '../../../stores/UserProfileStore';

const samp = observable({ text: "John" })
const UserProfileStore = createContext(UserProfileStorage);

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
            <UserProfileStore.Provider>
              <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
                <UserProfile samp={samp}/>
              </Row>
              <Calendar personal={true}/>
            </UserProfileStore.Provider>
          </Card>
          </Row>
          <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
          <Card style={{ justifyContent: 'center', minWidth: '50px', minHeight: '570px', width: '720px', flexGrow: '0' }}>
          <h1>To-do List</h1>
          <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <UsertodoList/>
          </Row>
          </Card>
          </Row>
        </main>
      </div>
    </ThemeProvider>
  );
};
