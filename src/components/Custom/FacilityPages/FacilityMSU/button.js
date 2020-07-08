import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TabsMSU from '../FacilityMSU/tabs';
import TabsMSU_MDA from '../FacilityMSU/tabs_MDA';

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

function getStepContent(step) {
  switch (step) {
    case 0:
      return '';
    case 1:
      return <TabsMSU/>;
    case 2:
      return <TabsMSU_MDA/>;
    default:
      return 'Unknown step';
  }
}

export default function ButtonMSU() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handle1 = () => {
    setActiveStep(1);
  };

  const handle2 = () => {
    setActiveStep(2);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
              <div className={classes.actionsContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handle1}
                    className={classes.button}
                  >
                    Universal Guide
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handle2}
                    className={classes.button}
                    >
                    MDA Guide
                    </Button>
              </div>
          <Typography>{getStepContent(activeStep)}</Typography>

    </div>
  );
}
