import React from 'react';

import Image from '../../components/Image';
import Main from '../../components/Main';
import Stack from '../../components/Stack';
import Subheader from '../../components/Subheader';
import UserInfo from '../../components/UserInfo';
import MDAHeader from '../../components/MDAHeader';
import axios from 'axios';

export default class UserProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      username: "",
      affiliation: "",
      userType: "",
      phone: "",
      email: ""
    }
  }

  
  async componentDidMount() {
    const url = "Http://127.0.0.1:5000/user";
  
    var self = this;
    console.log(self.props.location.state.token);
    await axios.post(url, null, {
      headers: { Authorization: `Bearer ${self.props.location.state.token}` }
    }).then(response => {
      console.log(response);
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
    <Main style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
      <MDAHeader/>
      <Stack style={{ justifyContent: 'flex-start', minWidth: '50px', minHeight: '50px' }}>
        <UserInfo name={this.state.name} username={this.state.username} affiliation={this.state.affiliation} userType={this.state.userType} phone = {this.state.phone} email = {this.state.email}/>
        <Subheader>
          Update Contact Info
        </Subheader>
        <Image style={{ width: '1000px', height: '600px', backgroundImage: 'url(/images/userCalendar.png)' }} />
      </Stack>
    </Main>
    )
  }
}
