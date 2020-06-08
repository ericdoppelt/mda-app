import React from 'react';
import { Link } from 'react-router-dom';

import NavigationHeader from '../NavigationHeader';
import Image from '../Image';

import './MDAHeader.css';

export default() => (
      <NavigationHeader>
        <Link to="/home">
          <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/homeIcon.png)' }} />
        </Link>
        <Link to="/">
          <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/a544991c-8004-402e-a784-9d0a51d6d3b0.png)' }} />
        </Link>
        <Link to="/calendar-main">
          <Image style={{ width: '120px', height: '90px', backgroundImage: 'url(/images/62187f3a-3839-43dc-8b2e-76b97b7ae0b1.png)' }} />
        </Link>
        <Link to="/request-form-main">
          <Image style={{ width: '170px', height: '90px', backgroundImage: 'url(/images/c8a8db2c-5298-4115-ba33-dc56f20bf50a.png)' }} />
        </Link>
        <Link to="/view-requests-main">
          <Image style={{ width: '170px', height: '90px', backgroundImage: 'url(/images/viewRequests.png)' }} />
        </Link>
        <Link to="/user-main">
          <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/d102a6df-a42a-4af3-bfdc-8da28402a42d.png)' }} />
        </Link>
      </NavigationHeader>
)