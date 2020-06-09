import React from 'react';
import {useLocation} from "react-router-dom";

import Image from '../../components/Image';
import Main from '../../components/Main';
import Stack from '../../components/Stack';
import Subheader from '../../components/Subheader';
import UserInfo from '../../components/UserInfo';
import MDAHeader from '../../components/MDAHeader';

export default () => (
  <Main style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
    <MDAHeader/>
    <Stack style={{ justifyContent: 'flex-start', minWidth: '50px', minHeight: '50px' }}>
      <UserInfo name="Mike McKenna" username={useLocation().state.user} affiliation="MDA" userType="Integrator" phone = "555-555-5555" email = "mike@mda.mil"/>
      <Subheader>
        Update Contact Info
      </Subheader>
      <Image style={{ width: '1000px', height: '600px', backgroundImage: 'url(/images/userCalendar.png)' }} />
    </Stack>
  </Main>
);
