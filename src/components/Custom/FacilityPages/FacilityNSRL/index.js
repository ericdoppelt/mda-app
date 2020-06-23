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
      return (
        <ul>
          <li><a href="https://www.bnl.gov/nsrl/" target="_blank" rel="noopener noreferrer">Website</a></li>
          <li>Use the <a href="https://www.bnl.gov/nsrl/facility-users/" target="_blank" rel="noopener noreferrer">Apply for Beam Time</a> portal to submit beam request</li>
          <ul>
            <li>Review beam capabilites</li>
          </ul>
          <li>After deciding how much beam time your work will require, your funding institution must submit a Purchase Order (PO) requesting the hours of time</li>
          <ul>
            <li>After deciding how much beam time your work will require, your funding institution must submit a Purchase Order (PO) requesting the hours of time</li>
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
        </ul>);
    case 1:
      return (
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
        </ul>);
    case 2:
      return (
        <ul>
          <li><a href="https://www.bnl.gov/nsrl/userguide/" target="_blank" rel="noopener noreferrer">First-Time User Information</a></li>
          <li><a href="https://www.bnl.gov/nsrl/about.php" target="_blank" rel="noopener noreferrer">About</a></li>
          <li><a href="https://www.bnl.gov/nsrl/runinfo.php" target="_blank" rel="noopener noreferrer">Run Information</a></li>
          <li><a href="https://www.bnl.gov/nsrl/userguide/calculating-time.php" target="_blank" rel="noopener noreferrer">Calculating Target Room access time</a></li>
          <li><a href="https://www.bnl.gov/nsrl/userguide/sample-holders.php" target="_blank" rel="noopener noreferrer">Sample holders</a></li>
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
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
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
