import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {AppBar, Box,Tab, Tabs, Typography} from '@material-ui/core';
import ProfileInfo from '../UserProfile/profileInfo';
import AuthenticateUser from '../UserProfile/authenticateUser';
import PasswordChanger from '../UserProfile/password';
import Calendar from '../../../components/Custom/Calendar/Calendar';
import axios from 'axios';

/* Define style and function of TabPanel to be used in the exported function*/
//From material-ui Tab source code
function TabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const useStyles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },


});


/*Exports function that displays tabs and selected tab content*/
class TabsProfile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      isAdmin: false,
      user_type: '',
    }
  }
  async componentDidMount() {
    var self = this;
    let url = 'https://vcm-17934.vm.duke.edu/api/user';
    await axios.get(url, {
      headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
      }).then(response => {
      console.log(response.data);
      self.setState({
        isAdmin: response.data.isAdmin,
        user_type: response.data.user_type,
      });
      }).catch(error => {
        console.log("error");
        console.log(error);
    });
  }

  a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  render () {
    const {classes} = this.props;
    if(this.state.isAdmin || (this.state.user_type==='Integrator')){
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            {/*Tab header labels*/}
            <Tab onClick={() => this.setState({value: 0})} label="Update Profile Info" {...this.a11yProps(0)} />
            <Tab onClick={() => this.setState({value: 1})} label="Change Password" {...this.a11yProps(1)} />
            <Tab onClick={() => this.setState({value: 2})} label="Personal Calendar" {...this.a11yProps(2)} />
            <Tab onClick={() => this.setState({value: 3})} label="Authenticate Users" {...this.a11yProps(3)} />
          </Tabs>
        </AppBar>

          <TabPanel value={this.state.value} index={0}>
            <ProfileInfo/>
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            <PasswordChanger/>
          </TabPanel>
          <TabPanel value={this.state.value} index={2}>
             <Calendar/>
          </TabPanel>
          <TabPanel value={this.state.value} index={3}>
            <AuthenticateUser/>
          </TabPanel>
      </div>
    );}
  else{
    return(
        <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                {/*Tab header labels*/}
                <Tab onClick={() => this.setState({value: 0})} label="Update Profile Info" {...this.a11yProps(0)} />
                <Tab onClick={() => this.setState({value: 1})} label="Change Password" {...this.a11yProps(1)} />
                <Tab onClick={() => this.setState({value: 2})} label="Personal Calendar" {...this.a11yProps(2)} />
              </Tabs>
            </AppBar>
              <TabPanel value={this.state.value} index={0}>
                <ProfileInfo/>
              </TabPanel>
              <TabPanel value={this.state.value} index={1}>
                <PasswordChanger/>
              </TabPanel>
              <TabPanel value={this.state.value} index={2}>
                 <Calendar personal={true}/>
              </TabPanel>
          </div>);
  }}
}
export default withStyles(useStyles)(TabsProfile);
