import React from 'react';
import './MDAHeader.css';
import {AppBar, Tabs, Tab, Menu, MenuItem} from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import DvrRoundedIcon from '@material-ui/icons/DvrRounded';
import { Link } from 'react-router-dom';

 
class MDAHeader extends React.Component {
  
  constructor(props) {
    super(props);
    this.openUserMenu = this.openUserMenu.bind(this);
    this.state = {
      menuAnchor: null,
      open: false,
    }
  }
    
  
  openUserMenu(event) {
    this.setState({
      menuAnchor: event.target,
      open: true
    })
    console.log(this.state);
  }

  render() {
    return(
      <div>
        <AppBar
          position="sticky"
          >
          <Tabs>
            <Tab icon={<HomeRoundedIcon />} label="Home" component={Link} to="/"/>
            <Tab icon={<AccountBalanceRoundedIcon/>}label="Sites" component={Link} to="/facilities"/>
            <Tab icon={<CalendarTodayRoundedIcon/>} label="Calendar" component={Link} to="/calendar"/>
            <Tab icon={<AssignmentRoundedIcon/>} label="Request Forms" component={Link}  to="/request-form"/>
            <Tab icon={<DvrRoundedIcon/>}label="View Requests" component={Link}  to="/view-requests"/>
            <Tab onClick={this.openUserMenu} icon={<FaceRoundedIcon/>} label="User"/>
          </Tabs>
          <Menu
          open={this.state.open}
          anchorEl={this.state.menuAnchor}
            >
            <MenuItem
              component={Link}
              to="/user-login"
              >
              Login
            </MenuItem>
            <MenuItem
              component={Link}
              to="/user-registration"
              >
              Register
            </MenuItem>
          </Menu>
        </AppBar>
      </div>
  );
}
}

export default MDAHeader;

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
