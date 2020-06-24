import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Initial Steps', 'Preparing for Visit', 'Additional Resources'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (  <ul>
          <li><strong href="https://www.nscl.msu.edu/users/guide.html" target="_blank" rel="noopener noreferrer"><a>Initial Steps</a></strong></li>
          <ul>
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
        </ul>);
    case 1:
      return (<ul>
        <li>If applicable, complete and submit Request to Ship Radioactive Materials to/from the NSC 1 month prior to visit</li>
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
        <li>Getting Here</li>
        <ul>
          <li><a href="http://flylansing.com/" target="_blank" rel="noopener noreferrer">Lansing Capital City Airport</a> (local), <a href="http://www.metroairport.com/" target="_blank" rel="noopener noreferrer">Detroit Metropolitan Airport</a> (90-120 min drive)</li>
          <li><a href="https://www.grr.org/" target="_blank" rel="noopener noreferrer">Grand Rapids</a> and <a href="https://www.bishopairport.org/" target="_blank" rel="noopener noreferrer">Flint</a> airports sometimes offer lower rates and are both within a 60 minute drive</li>
        </ul>
        <li><a href="https://www.nscl.msu.edu/users/here.html" target="_blank" rel="noopener noreferrer">While you are here</a></li>
        <li><a href="https://www.nscl.msu.edu/users/after.html" target="_blank" rel="noopener noreferrer">After you visit</a></li>
      </ul>);
    case 2:
      return (  <ul>
          <li><a href="https://www.nscl.msu.edu/users/contact.html" target="_blank" rel="noopener noreferrer">Contacts for Users</a></li>
          <li><a href="https://nscl.msu.edu/about/index.html" target="_blank" rel="noopener noreferrer">About the Laboratory</a></li>
          <li><a href="https://www.nscl.msu.edu/users/equipment.html" target="_blank" rel="noopener noreferrer">Facilities and Equipment</a></li>
          <li>Past <a href="https://nscl.msu.edu/users/ReA_PACcall_final2.pdf" target="_blank" rel="noopener noreferrer">Call for Proposal</a></li>
        </ul>);
    default:
      return 'Unknown step';
  }
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel align='left'>{label}</StepLabel>
            <StepContent>
              <Typography align='left'>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
