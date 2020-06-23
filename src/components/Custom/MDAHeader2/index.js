import React from 'react';
import {AppBar, Tabs, Tab, Menu, MenuItem} from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import DvrRoundedIcon from '@material-ui/icons/DvrRounded';
import { Link } from 'react-router-dom';
import Image from '../../UIzard/Image';
import Row from '../../UIzard/Row';

import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const icons = [<HomeRoundedIcon />, 
               <CalendarTodayRoundedIcon />, 
               <AccountBalanceRoundedIcon />, 
               <AssignmentRoundedIcon />, 
               <FaceRoundedIcon />,
               <DvrRoundedIcon />]

const links = ['/', '/calendar', '/facilities','/request-form','/user-login','/view-requests']

const drawerWidth = 240;

const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logo: {
    maxWidth: 140,
  },
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    //background: '#FFC0CB'
    background: {
      default: "#fafafa"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)"
    }
  },
});

 
class MDAHeader2 extends React.Component {
  
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
    const { classes } = this.props;
    return (
      <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar} color="paper">
          <Toolbar>
            <img src="images/ISEEULogoWhite.png" alt="logo" className={classes.logo} />

            <section className={classes.rightToolbar}>
              <Row style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
                <Link to='user-login' style={{ color: '#FFF' }}>
                  <ListItemText primary='Log In' style={{paddingRight: '20px'}}/>
                </Link>
                <Link to='user-registration' style={{ color: '#FFF' }}>
                  <ListItemText primary='Register' />
                </Link>
              </Row>
            </section>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              {['Home', 'Calendar', 'Sites', 'Request Forms'].map((text, index) => (
                <Link to={links[index]} style={{ color: '#FFF' }}>
                  <ListItem button key={text}>
                    <ListItemIcon>{icons[index]}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
            <List>
              {['User', 'View Requests'].map((text, index) => (
                <Link to={links[index+4]} style={{ color: '#FFF' }}>
                  <ListItem button key={text}>
                    <ListItemIcon>{icons[index+4]}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </div>
        </Drawer>
      </div>
      </ThemeProvider>
    );
  }
}

export default withStyles(useStyles)(MDAHeader2)