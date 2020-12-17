import axios from 'axios';
import { observer } from "mobx-react";
import React from 'react';
import Stack from '../../UIzard/Stack';
import TabsProfile from '../UserProfile/tabs';

class UserProfile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isAdmin: false,

      loadError:false,
    }
  }

  async componentDidMount() {
    var self = this;
    let url = 'https://vcm-17934.vm.duke.edu/api/user/user';
    await axios.get(url, {
      headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
      }).then(response => {
      console.log(response.data);
      self.setState({
          isAdmin: response.data.isAdmin,
          loadError: false,
        });
      if(response.data.success===false){
        self.setState({
          loadError: true,
        });
      }
      }).catch(error => {
        console.log("error");
        console.log(error);
    });
  }
  //Displays TabsProfile component
  //Add more components below if desired
  render() {
    return (
      <Stack style={{ justifyContent: 'flex-start', minWidth: '50px', minHeight: '50px' }}>
        <TabsProfile isAdmin={this.state.isAdmin}/>
      </Stack>
    )
  }
}

export default observer(UserProfile);
