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

export default function TabsMSU() {
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
          <Tab label="Contact Info" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <Paragraph>
      <ul>
        <li><strong> <a href="https://www.nscl.msu.edu/users/guide.html" target="_blank" rel="noopener noreferrer">Initial Steps</a></strong></li>
          <li><a href="https://www.nscl.msu.edu/" target="_blank" rel="noopener noreferrer">Website</a></li>
          <li>Check the <a href="https://www.nscl.msu.edu/users/resources.html" target="_blank" rel="noopener noreferrer">schedule</a> and the <a href="https://publicapps.nscl.msu.edu/completedExperiments/" target="_blank" rel="noopener noreferrer">list of approved experiments</a> for availability</li>
          <li>Check the <a href="https://nscl.msu.edu/users/beams.html" target="_blank" rel="noopener noreferrer">beam and ion list</a></li>
          <li>Proposals for experiments will be reviewed every 6-12 months at a PAC meeting</li>
          <li>A Call for Proposals is issued approximately 2 months prior to a proposal submission deadline (to join the email list sign up <a href="https://fribusers.org/organization/join.html" target="_blank" rel="noopener noreferrer">here</a>)</li>
          <li><a href="https://www.nscl.msu.edu/users/scheduling.html" target="_blank" rel="noopener noreferrer">Scheduling</a></li>
          <ul>
            <li>All communication proceeds through the Manager for User Relations, Jill Berryman (useroffice@nscl.msu.edu) </li>
            <li><strong>More than 6 months prior</strong></li>
            <ul>
              <li><a href="https://msu.co1.qualtrics.com/jfe/form/SV_42RLZbM8pjZqWRn" target="_blank" rel="noopener noreferrer">Scheduling and Safety Questionnaire</a></li>
              <li>Agreement between spokesperson and NSCL on vault, setup, primary beam sequence, level of NSCL support is established through a layout review</li>
            </ul>
            <li><strong>6 months prior</strong></li>
            <ul>
              <li>"Ready-by" date established for NSCL support</li>
              <li>Draft experimental schedule is made 6 months in advance</li>
            </ul>
            <li><strong>3 months prior</strong></li>
            <ul>
              <li><a href="https://www.nscl.msu.edu/users/resources.html" target="_blank" rel="noopener noreferrer">Final schedule is published online here</a> after all experiment ready-by dates are established</li>
              <li>A1900 Contact Person discusses detailed secondary beam sequence plan and A1900 configuration with spokesperson</li>
            </ul>
          </ul>
      </ul>
      </Paragraph>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Paragraph>
          <ul>
            <li><strong>1 month prior:</strong></li>
            <ul>
              <li>If applicable, complete and submit Request to Ship Radioactive Materials to/from the NSC 1 month prior to visit</li>
            </ul>
            <li><strong>3 weeks prior:</strong></li>
            <ul>
              <li>Notify the Manager for User Relations of your anticipated travel dates</li>
              <li>Complete the <a href="https://www.nscl.msu.edu/users/Scientific_User_Disclosure_form.pdf" target="_blank" rel="noopener noreferrer">Outside User Collaboration Form</a></li>
              <li>Non-US persons will need to also send a copy of their current CV/resume</li>
              <li><a href="https://www.nscl.msu.edu/users/D2L%20Instructions%20for%20Non-NSCL-FRIB%20Personnel.pdf" target="_blank" rel="noopener noreferrer">Safety Training</a></li>
              <li>If you plan to ship radioactive material, fill out the <a href="https://www.nscl.msu.edu/users/Request%20to%20Ship%20Radioactive%20Material1.pdf" target="_blank" rel="noopener noreferrer">Request to Ship Form</a> and email to orcbs@frib.msu.edu and useroffice@nscl.msu</li>
              <li>Notify the Manager for User Relations if you plan to bring any equipment from your home institution</li>
              <li>Review <a href="https://www.nscl.msu.edu/users/ExperimenterResponsibilities.pdf" target="_blank" rel="noopener noreferrer">Responsibilities for Experimenters ad NSRL</a></li>
              <li>Book <a href="https://www.nscl.msu.edu/users/visit.html#hotel" target="_blank" rel="noopener noreferrer">hotel</a></li>
            </ul>
            <li><strong>2 weeks prior</strong></li>
            <ul>
              <li>A1900 configured for experiment</li>
              <li>All agreed-upon NSCL supported parts ready, DAQ account established (unless requested earlier in Questionnaire)</li>
            </ul>
            <li><strong>2 days prior</strong></li>
            <ul>
              <li>Spokesperson of the experiment or a designee participate in the short-term scheduling meeting at 1:45 pm (Mon-Fri), by arrangement on the weekend</li>
              <li> If the spokesperson is not available, the spokesperson informs the Manager for User Relations of a designee</li>
            </ul>
            <li><strong>Getting Here</strong></li>
            <ul>
              <li><a href="http://flylansing.com/" target="_blank" rel="noopener noreferrer">Lansing Capital City Airport</a> (local), <a href="http://www.metroairport.com/" target="_blank" rel="noopener noreferrer">Detroit Metropolitan Airport</a> (90-120 min drive)</li>
              <li><a href="https://www.grr.org/" target="_blank" rel="noopener noreferrer">Grand Rapids</a> and <a href="https://www.bishopairport.org/" target="_blank" rel="noopener noreferrer">Flint</a> airports sometimes offer lower rates and are both within a 60 minute drive</li>
            </ul>
            <li><a href="https://www.nscl.msu.edu/users/here.html" target="_blank" rel="noopener noreferrer">While you are here</a></li>
            <li><a href="https://www.nscl.msu.edu/users/after.html" target="_blank" rel="noopener noreferrer">After you visit</a></li>
          </ul>
        </Paragraph>
      </TabPanel>
      <TabPanel value={value} index={2}>
          <a href="https://www.nscl.msu.edu/users/contact.html" target="_blank" rel="noopener noreferrer">Contacts for Users</a>
          <br/>
          <a href="https://nscl.msu.edu/about/index.html" target="_blank" rel="noopener noreferrer">About the Laboratory</a>
          <br/>
          <a href="https://www.nscl.msu.edu/users/equipment.html" target="_blank" rel="noopener noreferrer">Facilities and Equipment</a>
          <br/>
          <a href="https://nscl.msu.edu/users/ReA_PACcall_final2.pdf" target="_blank" rel="noopener noreferrer">Past Call for Proposal</a>
            <br/>
            <a href="https://nscl.msu.edu/users/visit.html" target="_blank" rel="noopener noreferrer">Visit Info</a>
            <br/>
            <a href="https://nscl.msu.edu/users/experimenters-responsibilities.html" target="_blank" rel="noopener noreferrer">Responsibility of Experimenters</a>
            <br/>
            <a href="https://nscl.msu.edu/exp/prep-exp/questionnaire.php" target="_blank" rel="noopener noreferrer">Questionnaire for Scheduling Experiments</a>
            <br/>
            <a href="https://nscl.msu.edu/users/resources.html" target="_blank" rel="noopener noreferrer">Schedule</a>
            <br/>
            <a href="https://nscl.msu.edu/users/beams.html" target="_blank" rel="noopener noreferrer">Available Beams</a>
            <br/>
            <a href="https://nscl.msu.edu/users/contact.html" target="_blank" rel="noopener noreferrer">Beam Contact List</a>
          <a href="https://nscl.msu.edu/users/Scientific_User_Disclosure_form.pdf" target="_blank" rel="noopener noreferrer">Outside User Collaboration Form</a>
          <br/>
          <a href="https://nscl.msu.edu/users/D2L%20Instructions%20for%20Non-NSCL-FRIB%20Personnel.pdf" target="_blank" rel="noopener noreferrer">Outside User Collaboration Form</a>
          <br/>
          <a href="https://nscl.msu.edu/users/ExperimenterResponsibilities.pdf" target="_blank" rel="noopener noreferrer">Responsibility of Experimenters (PDF)</a>
          <br/>
          <a href="https://nscl.msu.edu/users/ReA_PACcall_final2.pdf" target="_blank" rel="noopener noreferrer">Calls for Proposals</a>
          <br/>
          <a href="https://nscl.msu.edu/users/2019-PAC43_ReA_beam_rate_estimates_forweb.pdf" target="_blank" rel="noopener noreferrer">Radioactive Beam List (PDF)</a>
      </TabPanel>
      <TabPanel value={value} index={3}>
          <strong>Address</strong>
          <br/>
          National Superconducting Cyclotron Laboratory
          <br/>
          Michigan State University
          <br/>
          640 South Shaw Lane
          <br/>
          East Lansing, MI 48824
          <br/>
          Email: info@nscl.msu.edu
          <br/>
          Phone: 517-355-9672
          <br/>
          <br/>
          <strong>Media Contact</strong>
          <br/>
          Karen King, Communications Manager
          <br/>
          Email: kingk@frib.msu.edu
          <br/>
          Phone: 517-908-7262
          <br/>
          <br/>
          <strong>Events Contact</strong>
          <br/>
          Bob Patterer, FRIB Chief of Staff
          <br/>
          Email: events@frib.msu.edu
          <br/>
          Phone: 517-908-7573
          <br/>
          <br/>
          <strong>User Relations Contact</strong>
          <br/>
          Email: useroffice@nscl.msu.edu
          <br/>
          <br/>
          <strong>Data Acquisition Contact</strong>
          <br/>
          Giordano Cerizza
          <br/>
          Email: cerizza@nscl.msu.edu
          <br/>
          <br/>
          <strong>Safety Office Contact</strong>
          <br/>
          Phone: 517-908-7123
          <br/>
          Email: safety@nscl.msu.edu
          <br/>
      </TabPanel>
    </div>
  );
}
