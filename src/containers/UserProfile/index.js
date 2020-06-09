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
      username: "",
      password: "",
      displayedText: "",
    }
  }

  async componentDidMount() {
    const url = "https://mda-phoenix.herokuapp.com/" + this.props.location.state.user;
    console.log(url);
    
    await axios.post(url, {}).then(response => {
      console.log(response);
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
        <UserInfo name="Mike McKenna" username={this.props.location.state.user} affiliation="MDA" userType="Integrator" phone = "555-555-5555" email = "mike@mda.mil"/>
        <Subheader>
          Update Contact Info
        </Subheader>
        <Image style={{ width: '1000px', height: '600px', backgroundImage: 'url(/images/userCalendar.png)' }} />
      </Stack>
    </Main>
    )
  }
}
