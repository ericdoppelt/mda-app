import React from 'react';

import Image from '../../UIzard/Image';
import Stack from '../../UIzard/Stack';
import Subheader from '../../UIzard/Subheader';
import UserInfo from '../UserInfo';
import axios from 'axios';
import { observer } from "mobx-react"
import { observable } from "mobx"
import UserProfileStore from '../../../stores/UserProfileStore';

class UserProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      username: "",
      affiliation: "",
      userType: "",
      phone: "",
      email: "",
      sampText: UserProfileStore.sampText,
    }
  }

  
  async componentDidMount() {
    var self = this;

    let url = "https://mda-phoenix.herokuapp.com/user";
    await axios.post(url, null, {
      headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
      }).then(response => {
      //console.log(response);
      self.setState({
        name: response.data.first_name + " " + response.data.last_name,
        username: response.data.user,
        affiliation: response.data.affiliation,
        userType: response.data.user_type,
        phone: response.data.phone,
        email: response.data.email,
      });
      })
      .catch(error => {
        console.log("error");
        console.log(error);
    });

  }

  render() {
    return (
      <Stack style={{ justifyContent: 'flex-start', minWidth: '50px', minHeight: '50px' }}>
        <UserInfo name={this.state.name} username={this.state.username} affiliation={this.state.affiliation} userType={this.state.userType} phone = {this.state.phone} email = {this.state.email}/>
        <Subheader>
          Update Contact UserInfo
          <br/>
        </Subheader>
      </Stack>
    )
  }
}

export default observer(UserProfile);