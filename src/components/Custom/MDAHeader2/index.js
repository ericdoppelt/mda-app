import React from 'react';
import {AppBar, Tabs, Tab, Menu, MenuItem} from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import DvrRoundedIcon from '@material-ui/icons/DvrRounded';
import { Link } from 'react-router-dom';
import Row from '../../UIzard/Row';

import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const icons = [<HomeRoundedIcon />, 
               <CalendarTodayRoundedIcon />, 
               <AccountBalanceRoundedIcon />, 
               <AssignmentRoundedIcon />, 
               <FaceRoundedIcon />,
               <DvrRoundedIcon />]

const links = ['/', '/calendar', '/facilities','/request-form','/user-login','/view-requests']
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
    backgroundColor: "#424242"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#424242"
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
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

class MDAHeader2 extends React.Component {
  
  constructor(props) {
    super(props);
    this.openFacilitiesMenu = this.openFacilitiesMenu.bind(this);
    this.openFormsMenu = this.openFormsMenu.bind(this);
    this.state = {
      menuAnchor: null,
      facilitiesOpen: false,
      formsOpen: false,
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
  };
  
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
  
  render() {
    const { classes } = this.props;
    return (
      <div className='column'>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar} color="paper">
          <Toolbar>
            <Link to={links[0]} style={{ color: '#FFF' }}>
              <img src="images/ISEEULogoWhite.png" alt="logo" className={classes.logo} />
            </Link>
            <section className={classes.rightToolbar}>
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
              <ListItem button onClick={() => this.handleFacilitiesClick()} style={{ color: '#FFF' }}>
                <ListItemIcon>{icons[2]}</ListItemIcon>
                <ListItemText primary="Sites"/>
                {this.state.facilitiesOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.facilitiesOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {/*----FORM ITEMS----*/}
                  {['TAMU','MSU','LBNL','NSRL'].map((text, index) => (
                    <Link to={facilityLinks[index]} style={{ color: '#FFF' }}>
                      <ListItem button key={text}>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Collapse>
              {/*----REQUEST FORMS----*/}
              <ListItem button onClick={() => this.handleFormsClick()} style={{ color: '#FFF' }}>
                <ListItemIcon>{icons[3]}</ListItemIcon>
                <ListItemText primary='Request Forms' />
                {this.state.formsOpen ? <ExpandLess /> : <ExpandMore />}
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
              <Link to={links[3]} style={{ color: '#FFF' }}>
                
              </Link>
            </List>
            <Divider />
            {/*----USER AND VIEW REQUESTS----*/}
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
    );
  }
}

export default withStyles(useStyles)(MDAHeader2)