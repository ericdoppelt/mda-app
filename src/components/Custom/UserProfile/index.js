import React from 'react';
import Stack from '../../UIzard/Stack';
import { observer } from "mobx-react"
import { observable } from "mobx"
import TabsProfile from '../UserProfile/tabs';

class UserProfile extends React.Component {
  //Displays TabsProfile component
  //Add more components below if desired
  render() {
    return (
      <Stack style={{ justifyContent: 'flex-start', minWidth: '50px', minHeight: '50px' }}>
        <TabsProfile/>
      </Stack>
    )
  }
}

export default observer(UserProfile);
