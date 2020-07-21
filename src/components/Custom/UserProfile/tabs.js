import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {AppBar, Box,Tab, Tabs, Typography} from '@material-ui/core';
import ProfileInfo from '../UserProfile/profileInfo';
import PasswordChanger from '../UserProfile/password';
import Calendar from '../../../components/Custom/Calendar/Calendar';
import Card from '../../../components/UIzard/Card';

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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}));


/*Exports function that displays tabs and selected tab content*/
export default function TabsProfile() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          /*Tab header labels*/
          <Tab label="Update Profile Info" {...a11yProps(0)} />
          <Tab label="Change Password" {...a11yProps(1)} />
          <Tab label="Personal Calendar" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

        <TabPanel value={value} index={0}>
          <ProfileInfo/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <PasswordChanger/>
        </TabPanel>
        <TabPanel value={value} index={2}>
           <Calendar personal={true}/> 
        </TabPanel>
    </div>
  );
}
