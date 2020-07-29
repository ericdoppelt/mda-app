import React from 'react';
import clsx from 'clsx';
import {AppBar, Tabs, Tab, Menu, MenuItem} from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import DvrRoundedIcon from '@material-ui/icons/DvrRounded';
import { Link, Redirect } from 'react-router-dom';
import Row from '../../UIzard/Row';

import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import axios from 'axios';

import * as Constants from '../../../constants'

const icons = [<HomeRoundedIcon />,
               <CalendarTodayRoundedIcon />,
               <AccountBalanceRoundedIcon />,
               <AssignmentRoundedIcon />,
               <FaceRoundedIcon />,
               <DvrRoundedIcon />,
               <ImportContactsIcon />,]

const links = ['/', '/calendar', '/facilities','/request-form','/user-login','/view-requests','/scheduler']
const facilityLinks = ['facilities-tamu', 'facilities-MSU', 'facilities-LBNL', 'facilities-NSRL']
const formLinks = ['request-tamu', 'request-MSU', 'request-LBNL', 'request-NSRL']

const drawerWidth = 240;


const useStyles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#424242",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    zIndex: theme.zIndex.drawer + 1,
    width: '100%',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#424242",
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: "#424242",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#424242",
    overflowX: 'hidden',
  },
  drawerContainer: {
    overflow: 'auto',
    overflowX: 'hidden',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#424242",
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflow: 'hidden',
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
    backgroundColor: "#424242",
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
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
  nested: {
    paddingLeft: theme.spacing(4),
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

class MDAHeader2 extends React.Component {

  constructor(props) {
    super(props);
    this.openFacilitiesMenu = this.openFacilitiesMenu.bind(this);
    this.openFormsMenu = this.openFormsMenu.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleFormsClick = this.handleFormsClick.bind(this);
    this.drawerMenu = this.drawerMenu.bind(this);
    this.state = {
      menuAnchor: null,
      facilitiesOpen: false,
      formsOpen: false,
      loggedIn: false,
      drawerOpen: false,
    }
  }

  handleFacilitiesClick () {
    this.setState(state => ({
      facilitiesOpen: !this.state.facilitiesOpen
      }))
  };

  handleFormsClick () {
    this.setState(state => ({
      formsOpen: !this.state.formsOpen
      }))
    if (!this.state.drawerOpen) {
      this.handleDrawerOpen();
    }
  };

  handleDrawerOpen () {
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  openFacilitiesMenu(event) {
    this.setState({
      menuAnchor: event.target,
      facilitiesOpen: true
    })
  }

  openFormsMenu(event) {
    this.setState({
      menuAnchor: event.target,
      formsOpen: true
    })
  }

  handleLogOut() {
    var self = this;
    if (window.sessionStorage !== null) {
      window.sessionStorage.clear();
      this.setState({loggedIn: false})
    }
  }

  LoginButtons = () => {
    //console.log("Logged in state:");
    //console.log(this.state.loggedIn);
    if (window.sessionStorage.getItem('access_token') !== null) {
      return (
        <Row style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Link to='user-login' onClick={this.handleLogOut} style={{ color: '#FFF' }}>
            <ListItem button key='Log Out'>
              <ListItemText primary='Log Out'/>
            </ListItem>
          </Link>
        </Row>
      )
    } else {
      return (
        <Row style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Link to='user-login' style={{ color: '#FFF' }}>
            <ListItem button key='Log In'>
              <ListItemText primary='Log In'/>
            </ListItem>
          </Link>
          <Link to='user-registration' style={{ color: '#FFF' }}>
            <ListItem button key='Register'>
              <ListItemText primary='Register' />
            </ListItem>
          </Link>
        </Row>
      )
    }
  }

  drawerMenu () {
    const { classes } = this.props;
    return (
      <div
        className={classes.drawerPaper}
        role="presentation"
      >
        <Divider />
        <List>
          {/*----HOME----*/}
          <Link to={links[0]} style={{ color: '#FFF' }}>
            <ListItem button key='Home'>
              <ListItemIcon>{icons[0]}</ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem>
          </Link>
          {/*----CALENDAR----*/}
          <Link to={links[1]} style={{ color: '#FFF' }}>
            <ListItem button key='Calendar'>
              <ListItemIcon>{icons[1]}</ListItemIcon>
              <ListItemText primary='Calendar' />
            </ListItem>
          </Link>
          {/*----SITES----*/}
          <Link to={links[2]} style={{color: '#FFF'}}>
            <ListItem button key='Facilities'>
              <ListItemIcon>{icons[2]}</ListItemIcon>
              <ListItemText primary='Facilities'/>
            </ListItem>
          </Link>
        </List>

        <Divider />
        {/*----USER AND VIEW REQUESTS----*/}
        <List>
          <Link to={
            window.sessionStorage.getItem('access_token')
            ? 'user-profile'
            : 'user-login'}
            style={{ color: '#FFF' }}>
            <ListItem button key='User'>
              <ListItemIcon>{icons[4]}</ListItemIcon>
              <ListItemText primary='User' />
            </ListItem>
          </Link>
          <Link to={links[5]} style={{ color: '#FFF' }}>
            <ListItem button key='View Requests'>
              <ListItemIcon>{icons[5]}</ListItemIcon>
              <ListItemText primary='View Requests' />
            </ListItem>
          </Link>
          <Link to={links[6]} style={{ color: '#FFF' }}>
            <ListItem button key='Scheduler'>
              <ListItemIcon>{icons[6]}</ListItemIcon>
              <ListItemText primary='Scheduler' />
            </ListItem>
          </Link>
          {/*----REQUEST FORMS----*/}
          <ListItem button onClick={this.handleFormsClick} style={{ color: '#FFF' }}>
            <ListItemIcon>{icons[3]}</ListItemIcon>
            <ListItemText primary='Request Forms' />
            {this.state.drawerOpen ? (this.state.formsOpen ? <ExpandLess /> : <ExpandMore />) : null}
          </ListItem>
          <Collapse in={this.state.formsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/*----FORM ITEMS----*/}
              {['TAMU','MSU','LBNL','NSRL'].map((text, index) => (
                <Link to={formLinks[index]} style={{ color: '#FFF' }}>
                  <ListItem button key={text}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }

  async componentDidMount() {
    const url = "https://mda-phoenix.herokuapp.com/user";

    var self = this;
    this.setState(state => ({loggedIn: false}));
    await axios.get(url, {
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
        loggedIn: true,
      });
      })
      .catch(error => {
        console.log("error");
        console.log(error);
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.drawerClose}>
        <ThemeProvider theme={Constants.darkTheme}>
        <CssBaseline />
        <AppBar 
          position="fixed" 
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.state.drawerOpen,
          })}
          color="paper"
        >
          <Toolbar style={{}}>
            <IconButton
              color="white"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton)}
            >
              <MenuIcon />
            </IconButton>
            <Link to={links[0]} style={{ color: '#FFF' }}>
              <img src="images/ISEEULogoWhite.png" alt="logo" className={classes.logo} />
            </Link>
            {/*----RIGHT TOOLBAR WITH LOGIN----*/}

            <section className={classes.rightToolbar}>
              {this.LoginButtons()}
            </section>
          </Toolbar>
        </AppBar>

        
        {/* Drawer */}

        <Drawer
          variant="permanent"
          className={clsx( 
            classes.drawerClose
          )}
          classes={{
            paper: clsx(classes.drawerClose
            ),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          {this.drawerMenu()}
        </Drawer>

        <div
          className={classes.drawerPaper}
        >
          <SwipeableDrawer
              anchor='left'
              open={this.state.drawerOpen}
              onClose={this.handleDrawerOpen}
              onOpen={this.handleDrawerOpen}
              PaperProps={{ className: classes.drawerPaper }}
          >
            <div className={classes.toolbar}>
              <IconButton style={{justifyContent: 'left'}}>
                <Link to={links[0]} style={{ color: '#FFF' }}>
                  <img src="images/ISEEULogoWhite.png" alt="logo" className={classes.logo} />
                </Link>
              </IconButton>
              
            </div>
            {this.drawerMenu()}
          </SwipeableDrawer>
        </div>
        </ThemeProvider>
      </div>
    );
  }
}

export default withStyles(useStyles)(MDAHeader2)
