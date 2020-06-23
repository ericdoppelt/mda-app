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
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

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
    this.openUserMenu = this.openUserMenu.bind(this);
    this.state = {
      menuAnchor: null,
      open: false,
    }
  }

  handleClick () {
    this.setState(state => ({
      open: !this.state.open
      }))
  };
  
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
              <ListItem button onClick={() => this.handleClick()} style={{ color: '#FFF' }}>
                <ListItemIcon>{icons[2]}</ListItemIcon>
                <ListItemText primary="Sites"/>
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {/*----TAMU----*/}
                  <Link to='facilities-tamu' style={{ color: '#FFF' }}>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                      </ListItemIcon>
                      <ListItemText primary="TAMU" />
                    </ListItem>
                  </Link>
                  {/*----MSU----*/}
                  <Link to='facilities-msu' style={{ color: '#FFF' }}>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                      </ListItemIcon>
                      <ListItemText primary="MSU" />
                    </ListItem>
                  </Link>
                  {/*----LBNL----*/}
                  <Link to='facilities-lbnl' style={{ color: '#FFF' }}>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                      </ListItemIcon>
                      <ListItemText primary="LBNL" />
                    </ListItem>
                  </Link>
                  {/*----NSRL----*/}
                  <Link to='facilities-nsrl' style={{ color: '#FFF' }}>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                      </ListItemIcon>
                      <ListItemText primary="NSRL" />
                    </ListItem>
                  </Link>
                </List>
              </Collapse>
              {/*----REQUEST FORMS----*/}
              <Link to={links[3]} style={{ color: '#FFF' }}>
                <ListItem button key='Request Forms'>
                  <ListItemIcon>{icons[3]}</ListItemIcon>
                  <ListItemText primary='Request Forms' />
                </ListItem>
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