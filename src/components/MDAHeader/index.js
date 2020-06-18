import React from 'react';
import './MDAHeader.css';
import {AppBar, Tabs, Tab} from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import DvrRoundedIcon from '@material-ui/icons/DvrRounded';

export default() => (
  <div>
    <AppBar
      >
      <Tabs
        variant="fullWidth"
        >
          <Tab icon={<HomeRoundedIcon />}label="Home" href="/"/>
          <Tab icon={<AccountBalanceRoundedIcon/>}label="Sites" href="/facilities"/>
          <Tab icon={<CalendarTodayRoundedIcon/>} label="Calendar" href="/calendar"/>
          <Tab icon={<AssignmentRoundedIcon/>} label="Request Forms" href="/request-form"/>
          <Tab icon={<DvrRoundedIcon/>}label="View Requests" href="/view-requests"/>
          <Tab icon={<FaceRoundedIcon/>}label="User" href="/user-login"/>
        </Tabs>
    </AppBar>
  </div>

)

/*

export default class MDAHeader extends React.Component {

  render() {
    const { width, height } = this.props.size
    return (
      <NavigationHeader>
        <Link to="/">
          <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/homeIcon.png)' }} />
        </Link>
        <Link to="/facilities">
          <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/a544991c-8004-402e-a784-9d0a51d6d3b0.png)' }} />
        </Link>
        <Link to="/calendar">
          <Image style={{ width: '120px', height: '90px', backgroundImage: 'url(/images/62187f3a-3839-43dc-8b2e-76b97b7ae0b1.png)' }} />
        </Link>
        <Link to="/request-form">
          <Image style={{ width: '170px', height: '90px', backgroundImage: 'url(/images/c8a8db2c-5298-4115-ba33-dc56f20bf50a.png)' }} />
        </Link>
        <Link to="/view-requests">
          <Image style={{ width: '170px', height: '90px', backgroundImage: 'url(/images/viewRequests.png)' }} />
        </Link>
        <Link to="/user-login">
          <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/d102a6df-a42a-4af3-bfdc-8da28402a42d.png)' }} />
        </Link>
      </NavigationHeader>)
  }

}

/*
function MDAHeader ({ size }) {
  if (width > 600) {
    <NavigationHeader>
      <Link to="/">
        <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/homeIcon.png)' }} />
      </Link>
      <Link to="/facilities">
        <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/a544991c-8004-402e-a784-9d0a51d6d3b0.png)' }} />
      </Link>
      <Link to="/calendar">
        <Image style={{ width: '120px', height: '90px', backgroundImage: 'url(/images/62187f3a-3839-43dc-8b2e-76b97b7ae0b1.png)' }} />
      </Link>
      <Link to="/request-form">
        <Image style={{ width: '170px', height: '90px', backgroundImage: 'url(/images/c8a8db2c-5298-4115-ba33-dc56f20bf50a.png)' }} />
      </Link>
      <Link to="/view-requests">
        <Image style={{ width: '170px', height: '90px', backgroundImage: 'url(/images/viewRequests.png)' }} />
      </Link>
      <Link to="/user-login">
        <Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/d102a6df-a42a-4af3-bfdc-8da28402a42d.png)' }} />
      </Link>
    </NavigationHeader>
  } else {
    <Title>hey man</Title>
  }
}
const {width} = size.bounds;

export default() => (MDAHeader)*/


/*
function MyComponent({ size }) {
  return (
    <SizeMe
      monitorHeight
      render={({ size }) => {
        return <h1>I am {size.height}px tall!</h1>;
      }}
    />
  );
}

export default withSize()(MyComponent)
*/
