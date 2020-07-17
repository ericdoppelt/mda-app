import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import Paragraph from '../../../../components/UIzard/Paragraph';
import Row from '../../../../components/UIzard/Row';
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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  }
}));


export default function TabsTAMU() {
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
          <Tab label="Facility Capabilities" {...a11yProps(0)} />
          <Tab label="Preparing for Visit" {...a11yProps(1)} />
          <Tab label="Contact Info" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <Stack style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
      <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px'}}>
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

      </Row>
      </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={classes.root}>
          <Accordion>
             <AccordionSummary
               expandIcon={<ExpandMoreIcon />}
               aria-controls="panel1a-content"
               id="panel1a-header"
             >
               <Typography className={classes.heading}>5 days ahead</Typography>
             </AccordionSummary>
             <AccordionDetails>
               <Paragraph>
               <ol>
                 <li><strong>LBNL Affiliate registration</strong></li>
                  <ul>
                    <li>Please use the following <a href='https://jobs.lbl.gov/user/jobs/base-facility-external-user-1651' target='_blank' rel='noopener noreferrer'>link </a>
                         and complete the BASE User application</li>
                    <li>If you were first an affiliate prior to March 1, 2019,
                      you will need to create a log-in for this system</li>
                      <li>Please be sure to complete the online application fully, all the way to the
                      end, and be prepared to answer all follow-up email from LBNL HR specialists</li>
                      <li>No work is allowed onsite until the process is complete and an LBNL ID number
                      has been activated.</li>
                  </ul>
                  <br/>
                <li><strong>General Radiation Training (GERT)</strong></li>
                   <ul>
                      <li><a href='http://www.lbl.gov/ehs/training/webcourses/EHS0470/' target='_blank' rel='noopener noreferrer'>Link</a></li>
                      <li>Choose "non-LDAP login" at the final prompt, if successful you will
                     receive an email confirmation</li>
                     <li> This training is valid for two years</li>
                    </ul>
                  <br/>
                  <li><strong>Radiological Worker 1 Training (RW1)</strong></li>
                    <ul>
                      <li><a href='http://www2.lbl.gov/ehs/training/webcourses/EHS0471/' target='_blank' rel='noopener noreferrer'>Link</a></li>
                      <li>Choose "non-LDAP login" at the final prompt, if successful you will
                      receive an email confirmation</li>
                      <li>This training is valid for two years</li>
                    </ul>
                  <br/>
                  <li><strong>COVID-19 related training (LBL-0012)</strong></li>
                    <ul>
                      <li><a href='https://training.lbl.gov/ehs/training/webcourses/LBL0012/' target='_blank' rel='noopener noreferrer'>Link</a></li>
                      <li>Choose "non-LDAP login" at the final prompt, if successful you will
                       receive an email confirmation</li>
                       <li>This is a one-time requirement</li>
                      </ul>
                  <br/>
                  <li><strong>88 Affiliate forms packet</strong></li>
                    <ul>
                      <li>This packet includes a safety
                      checklist, LBNL policy forms, and a dosimeter request, please sign (multiple
                      locations) and return as a PDF to 88Admin@lbl.gov.</li>
                      <li>The safety checklist will be renewed
                      annually</li>
                      <li>Please remember that other materials depend on completing this
                      paperwork</li>
                    </ul>
                  <br/>
                  <li><strong>Reply to 88Admin@lbl.gov with arrival information</strong></li>
                    <ul>
                      <li>Include the date and time you anticipate arriving at LBL, and if you will
                      need a parking space or a shuttle pass</li>
                      <li>A visitor pass will be sent to you from siteaccess@lbl.gov</li>
                      <li>As an expired affiliate you should plan on arriving during business hours
                      so that your badging, paperwork, and training can be completed</li>
                      <li>Badging requires *an appointment* during the Covid-19 Pandemic controls,
                      so knowing when you intend to arrive is very important</li>
                    </ul>
               </ol>
               </Paragraph>
             </AccordionDetails>
           </Accordion>
           <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>On Arrival</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paragraph>
                  <ol>
                    <li>FIRST check in at building 88 with the On-Duty Operator to see if there is
                        any paperwork or training required.  The Administrative Office is temporarily
                        offsite, but we will be able to provide any guidance required and should have
                        given those personnel onsite directions to prepare your materials - key,
                        dosimeter, temporary badge - for pick-up.
                        </li>
                      <br/>
                      <li>The Site Access office is open by appointment only.  If we are unable to
                          secure an appointment prior to your arrival, a temporary building 88 access
                          badge will be issued to you.  Please keep in mind: all LBNL issued badges are
                          the property of the United States Department of Energy and must be returned to
                          the 88-Inch Cyclotron Administration Office when you leave.
                          </li>
                      <br/>
                      <li>Badges, controlled area keys and dosimeters must be returned at the end of
                          your current visit.  A drop-box is located outside office 88-105 for this
                          purpose.
                          </li>
                  </ol>
                </Paragraph>
              </AccordionDetails>
            </Accordion>
            <br/>
          </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
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
