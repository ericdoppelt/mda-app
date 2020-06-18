import React from 'react';
import './MDAHeader.css';
import {AppBar, Tabs, Tab, Menu, MenuItem, ClickAwayListener} from '@material-ui/core';
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
    this.closeMenu = this.closeMenu.bind(this);
    this.state = {
      menuAnchor: null,
      open: false,
    }
  }
    
  
  logout() {

  }

  closeMenu() {
      this.setState({
          open: false
      })
  }
  openUserMenu(event) {
    console.log("hello");
    this.setState({
      menuAnchor: event.target,
      open: true
    })
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
            <Tab onClick={this.openUserMenu()} icon={<FaceRoundedIcon/>} label="User"/>
          </Tabs>
          <ClickAwayListener onClickAway={this.closeMenu()}>
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
          <Menu>
            open={!this.state.open}
            anchorEl={this.state.menuAnchor}
            >
              <MenuItem
                component={Link}
                to="/user-profile"
                >
                Profile
              </MenuItem>
              <MenuItem
                component={Link}
                to="/"
                onClick={this.logout()}
                >
                Logout
              </MenuItem>
          </Menu>
          </ClickAwayListener>
        </AppBar>
      </div>
  );
}
}

export default MDAHeader;


