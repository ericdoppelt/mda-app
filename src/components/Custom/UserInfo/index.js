import React from 'react';

import './UserInfo.css'

import Stack from '../../UIzard/Stack';
import Header from '../../UIzard/Header';
import Row from '../../UIzard/Row';
import Subheader from '../../UIzard/Subheader';

export default (props) => (
    <div>
        <Stack style={{ justifyContent: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
        <Header>
          Hello, {props.name}
        </Header>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Subheader>
            Username:
            <br/>
            Affiliation:
            <br/>
            User Type:
            <br/>
            Phone:
            <br/>
            Email:
          </Subheader>
          <Subheader>
            {props.username}
            <br/>
            {props.affiliation}
            <br/>
            {props.userType}
            <br/>
            {props.phone}
            <br/>
            {props.email}
          </Subheader>
        </Row>
      </Stack>
    </div>
)