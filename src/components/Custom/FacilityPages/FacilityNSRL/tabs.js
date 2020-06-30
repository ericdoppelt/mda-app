import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paragraph from '../../../../components/UIzard/Paragraph';
import Row from '../../../../components/UIzard/Row';
import Card from '../../../../components/UIzard/Card';
import Stack from '../../../../components/UIzard/Stack';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
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
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabsNSRL() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          centered="true"

        >
          <Tab label="Initial Steps" {...a11yProps(0)} />
          <Tab label="Preparing for Visit" {...a11yProps(1)} />
          <Tab label="Additional Resources" {...a11yProps(2)} />
            <Tab label="Contact Info" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <Paragraph>
      <ul>
          <li><a href="https://www.bnl.gov/nsrl/" target="_blank" rel="noopener noreferrer">Website</a></li>
          <li>Use the <a href="https://www.bnl.gov/nsrl/facility-users/" target="_blank" rel="noopener noreferrer">Apply for Beam Time</a> portal to submit beam request</li>
          <ul>
            <li>Review beam capabilites</li>
          </ul>
          <li>After deciding how much beam time your work will require, your funding institution must submit a Purchase Order (PO) requesting the hours of time</li>
          <ul>
            <li>For information on opening an account for beam time, contact NSRL Finance Officer at nsrlfin@bnl.gov</li>
            <li>Mail, email, or fax orders to Ken Koebel, Business Services Directorate</li>
            <ul>
              <li>Address: Mail Stop 179A, Brookhaven National Laboratory, Upton, NY 11973-5000</li>
              <li>Phone: (631) 344-7351</li>
              <li>Fax: (631) 344-3021</li>
            </ul>
          </ul>
          <li>Establish orverify agreement with BNL to cover research</li>
          <ul>
            <li><a href="https://www.bnl.gov/guv/agreements/index.php" target="_blank" rel="noopener noreferrer">List of institutions with agreements</a></li>
            <li>If your institution is not on the list, complete the <a href="https://www.bnl.gov/guv/ufaQuestionnaire/" target="_blank" rel="noopener noreferrer">User Agreement Questionnaire</a></li>
            <li>Address questions to Amanda Satterley at the Guest, User, Visitor Center</li>
            <ul>
              <li>Phone: (631) 344-5076 </li>
              <li>Email: agreements@bnl.gov</li>
              <li>Fax: (631) 344-8686</li>
            </ul>
          </ul>
        </ul>
      </Paragraph>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Paragraph>
        <ul>
          <li>If you do not have a valid BNL ID, you must register in BNL’s <a href="https://www.bnl.gov/guv/gis.php" target="_blank" rel="noopener noreferrer">Guest Information System</a> (GIS)</li>
          <ul>
            <li>Can take up to 45 calendar days to complete</li>
            <li>Contact Guest, User, Visiter Center for questions</li>
            <ul>
              <li>Email: guvcenter@bnl.gob</li>
              <li>Phone: (631) 344-3333</li>
            </ul>
          </ul>
          <li>Submit BNL Arrival Notification to <a href="Submit BNL Arrival Notification to Guest Central web page" target="_blank" rel="noopener noreferrer">Guest Central web page</a></li>
          <li><a href="https://www.bnl.gov/staffservices/onsitehousing.php" target="_blank" rel="noopener noreferrer"><strong>Housing</strong></a></li>
          <ul>
            <li>Must first be registered in the Guest Information System</li>
            <li>To reserve on-site housing, call the BNL Housing Office</li>
            <ul>
              <li>Phone: (631) 344-2541 or 344-2551</li>
              <li>Email: housing@bnl.gov</li>
            </ul>
          </ul>
          <li><a href="https://www.bnl.gov/training/pass/" target="_blank" rel="noopener noreferrer"><strong>Training</strong></a></li>
          <ul>
            <li>Must first be registered in the Guest Information System</li>
            <li>Complete Cyber Security training  and Guest Site Orientation found <a href="https://www.bnl.gov/training/pass/" target="_blank" rel="noopener noreferrer">here</a></li>
            <li>Complete RadWorker I - Intro and Radiological Worker 1 - Computer Challenge</li>
            <ul>
              <li>Filter by "Radiological"</li>
              <li>The computer challenge is a difficult, 50-question timed test, and it must be completed in one uninterrupted sitting</li>
              <li>Reading the <a href="https://training.bnl.gov/StudyGuides/RWT/RWT002.PDF" target="_blank" rel="noopener noreferrer">study guide</a> is highly recommended</li>
            </ul>
            <li>Contact NSRL Liaison Scientists (nsrladmin@bnl.gov) for questions</li>
            <li>Additional training may be assigned. Check your ob Training Assignments (JTAs) on the <a href="http://www.bnl.gov/training/" target="_blank" rel="noopener noreferrer">BNL Training Website</a></li>
          </ul>
          <li>Bring <a href="https://www.bnl.gov/guv/id.php" target="_blank" rel="noopener noreferrer">proper identification</a> on test day</li>
          <li><a href="https://www.bnl.gov/maps/" target="_blank" rel="noopener noreferrer">Directions to test facility</a></li>
          <li>All guests, users, and visitors must check-in at the Guest, User, Visitor Center, which is located in <a href="http://www.bnl.gov/maps/point.php?Lat=40.86808&Lng=-72.88330" target="_blank" rel="noopener noreferrer">Building 400A</a></li>
          <li>You MUST complete a dry run of your experiment before testing at NSRL. Contact NSRL Liaison Biologist (nsrllb@bnl.gov)</li>
        </ul>
        </Paragraph>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <a href="https://www.bnl.gov/nsrl/userguide/" target="_blank" rel="noopener noreferrer">First-Time User Information</a>
        <br/>
        <a href="https://www.bnl.gov/nsrl/about.php" target="_blank" rel="noopener noreferrer">About</a>
        <br/>
        <a href="https://www.bnl.gov/nsrl/runinfo.php" target="_blank" rel="noopener noreferrer">Run Information</a>
        <br/>
        <a href="https://www.bnl.gov/nsrl/userguide/calculating-time.php" target="_blank" rel="noopener noreferrer">Calculating Target Room access time</a>
        <br/>
        <a href="https://www.bnl.gov/nsrl/userguide/sample-holders.php" target="_blank" rel="noopener noreferrer">Sample holders</a>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <strong>NSRL Liaison Physicist</strong>
        <br/>
        Phone: 631-344-3072 or 631-344-5830
        <br/>
        <br/>
        <strong>NSRL Finance Officer</strong>
        <br/>
        (contact for setting up an account for beam time)
        <br/>
        email: nsrlfin@bnl.gov
        <br/>
        <br/>
        <strong>NSRL Liaison Biologist</strong>
        <br/>
        (contact for info on dry runs)
        <br/>
        email: nsrllb@bnl.gov
        <br/>
        <br/>
        <strong>Scheduling Questions</strong>
        <br/>
        Email: nsrllp@bnl.gov
        <br/>
        <br/>
        <strong>Guest, User, Visitor Center (GUV)</strong>
        <br/>
        (Contact for training questions)
        <br/>
        Phone: (631) 344-3333
        <br/>
        Email: guvcenter@bnl.gov
        <br/>
        <br/>
        <strong>Housing Office</strong>
        <br/>
        Phone: (631) 344-2541
        <br/>
        Email: housing@bnl.gov
        <br/>
        <br/>
        <strong>User Agreements</strong>
        <br/>
        Amanda Satterley
        <br/>
        Guest, User, Visitor Center
        <br/>
        Brookhaven National Laboratory
        <br/>
        Upton, NY 11973-5000
        <br/>
        Phone: (631) 344-5076
        <br/>
        Fax: (631) 344-8686
        <br/>
        Email: agreements@bnl.gov
        <br/>
        <br/>
        <strong>Purchase Orders</strong>
        <br/>
        Ken Koebel
        <br/>
        Business Services Directorate
        <br/>
        Mail Stop 179A
        <br/>

      </TabPanel>
    </div>
  );
}
