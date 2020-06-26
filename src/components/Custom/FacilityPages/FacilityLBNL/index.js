import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paragraph from '../../../../components/UIzard/Paragraph';

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

export default function TabsLBNL() {
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
        <li><a href="http://cyclotron.lbl.gov/" target="_blank" rel="noopener noreferrer">Website</a></li>
        <li>Check <a href="http://cyclotron.lbl.gov/schedule" target="_blank" rel="noopener noreferrer">schedule</a> for availability</li>
        <ul>
          <li>If you need time and can't find any, email Research Coordinator Mike Johnson, at MBJohnson@lbl.gov, to see what options are available</li>
        </ul>
        <li>Check the <a href="http://cyclotron.lbl.gov/base-rad-effects/heavy-ions/cocktails-and-ions" target="_blank" rel="noopener noreferrer">cocktail and ion list</a> to ensure the necessary ion and energy characteristics are available</li>
        <li>Information on <a href="http://cyclotron.lbl.gov/base-rad-effects/heavy-ions" target="_blank" rel="noopener noreferrer">heavy ion testing</a> at LBNL</li>
        <li>Submit a <a href="http://cyclotron.lbl.gov/beam-request" target="_blank" rel="noopener noreferrer">beam request</a> to initiate the process of reserving a time slot on the schedule</li>
        <ul>
          <li>Must be submitted in the body of an email to 88beamrequest@lbl.gov</li>
          <li>If the request is under a DOE nuclear science proposal include this <a href="https://docs.google.com/document/d/1Wk996fdigbNSq9Anx3lAzaC5insv5RBJNSWUx9eRcpk/edit" target="_blank" rel="noopener noreferrer">form</a> as an attachment</li>
          <li>Charged on time scheduled (minimum of 8 hours), rather than time used</li>
          <li>Cancellations must be at least 45 days before scheduled time to avoid full cost cancellation fee</li>
        </ul>
      </ul>
      </Paragraph>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Paragraph>
        <ul>
          <li>Notify the Admin office (88admin@lbl.gov) as soon as your reservation is made so that all required documents and training will be ready for you</li>
          <li><strong>6 weeks ahead</strong></li>
          <ul>
            <li>Setup a user agreement between LBNL and your organization</li>
            <li>Recharge customers must have a user agreement, purchase order, and an advance payment check in place</li>
            <li>For questions contact Mike Johnson</li>
            <ul>
              <li>Phone: (510) 486-4389</li>
              <li>Email: mbjohnson@lbl.gov</li>
            </ul>
            <li>Request <a href="https://www.berkeleylabguesthouse.org/" target="_blank" rel="noopener noreferrer">housing</a></li>
          </ul>
          <li><strong>3 weeks ahead</strong></li>
          <ul>
            <li>Register with the Admine office</li>
            <li>Complete the Affiliate Registration Form (ARF)</li>
            <li>Forms found <a href="https://drive.google.com/file/d/0B-7RPAKnuE05XzRSYlJ3RU1Dc2xEaFJOaUdBVkJ2OFdJeEFz/view" target="_blank" rel="noopener noreferrer">here</a></li>
          </ul>
          <li><strong>Arrival</strong></li>
          <ul>
            <li><a href="http://cyclotron.lbl.gov/directions" target="_blank" rel="noopener noreferrer">Directions</a></li>
            <li>The Admin Office will arrange for a Laboratory Gate Pass</li>
            <li>Please enter Laboratory premises via the Blackberry Gate entrance on Cyclotron Road</li>
            <li>After completion of the registration process and safety training, new users and guests will be directed to the LBNL Site Access Office (Building 65) to obtain a key card/identification badge that provides access to the Cyclotron</li>
            <li>Please be prepared to present a picture ID to Site Access staff</li>
            <li>If you absolutely cannot arrive during normal working hours, you must alert the Admin Office beforehand</li>
          </ul>
          <li><a href="http://cyclotron.lbl.gov/training" target="_blank" rel="noopener noreferrer"><strong>Training</strong></a></li>
          <ul>
            <li><a href="https://www2.lbl.gov/ehs/training/webcourses/EHS0470/">General Employment Radiation Testing</a> (GERT)</li>
            <li><a href="http://cyclotron.lbl.gov/training" target="_blank" rel="noopener noreferrer">Building 88 On-The-Job Training</a> (OJT)</li>
            <li><a href="https://www2.lbl.gov/ehs/training/webcourses/EHS0471/" target="_blank" rel="noopener noreferrer">Radiation Worker I Training</a> (RW I)</li>
            <li>Once completed, inform the Admin Office (88admin@lbl.gov) so that you can be added to the Radiological Work Authorization (RWA)</li>
            <li>All personnel performing work involving Export Controls are required to read and comply with the <a href="https://drive.google.com/a/lbl.gov/file/d/0B-7RPAKnuE05cTlwcUhmWjd1Qzg/view?usp=sharing" target="_blank" rel="noopener noreferrer">88 TCP</a></li>
          </ul>
        </ul>
        </Paragraph>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <a href="http://cyclotron.lbl.gov/directory2-1" target="_blank" rel="noopener noreferrer">Directory</a>
        <br/>
        <a href="http://cyclotron.lbl.gov/base-rad-effects/base-ops-manual" target="_blank" rel="noopener noreferrer">BASE Facility Operator's Manual</a>
        <br/>
        <a href="http://cyclotron.lbl.gov/ionsources" target="_blank" rel="noopener noreferrer">Ion Sources</a>
        <br/>
        <a href="http://cyclotron.lbl.gov/safety" target="_blank" rel="noopener noreferrer">Safety</a>
        <br/>
        <a href="http://cyclotron.lbl.gov/procedures" target="_blank" rel="noopener noreferrer">Docs and Procedures</a>
        <br/>
        <a href="http://cyclotron.lbl.gov/beam-request" target="_blank" rel="noopener noreferrer">Beam Request</a>
        <br/>
        <a href="http://cyclotron.lbl.gov/new-user-checklist" target="_blank" rel="noopener noreferrer">New User Checklist</a>
        <br/>
        <a href="http://cyclotron.lbl.gov/schedule" target="_blank" rel="noopener noreferrer">Schedule</a>
        <br/>
        <a href="http://cyclotron.lbl.gov/procedures" target="_blank" rel="noopener noreferrer">Procedures</a>
        <br/>
        <a href="https://commute.lbl.gov/resource/maps-directions-to-berkeley-lab/" target="_blank" rel="noopener noreferrer">Directions and Parking</a>
        <br/>
        <a href="https://commute.lbl.gov/resource/maps-directions-to-berkeley-lab/" target="_blank" rel="noopener noreferrer">Directions and Parking</a>
        <br/>
        <a href="https://drive.google.com/file/d/0B-7RPAKnuE05XzRSYlJ3RU1Dc2xEaFJOaUdBVkJ2OFdJeEFz/view" target="_blank" rel="noopener noreferrer">Affiliate Forms</a>
      </TabPanel>
      <TabPanel value={value} index={3}>
          <strong>Physical Address</strong>
          <br/>
          1 Cyclotron Rd. Bldg. 88,
          <br/>
          Berkeley, CA 94720
          <br/>
          <br/>
        <strong>Admin Office Address</strong>
          <br/>
          Lawrence Berkeley National Laboratory
          <br/>
          88-Inch Cyclotron Admin Office
          <br/>
          One Cyclotron Road, MS 88R0192
      </TabPanel>
    </div>
  );
}
