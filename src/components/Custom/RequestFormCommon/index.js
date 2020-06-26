import React from 'react';
import {TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, Dialog, DialogTitle, DialogContent, DialogActions, Box} from '@material-ui/core';
import 'react-nice-dates/build/style.css'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Stack from '../../UIzard/Stack';
import './RequestFormCommon.css'
import 'react-nice-dates/build/style.css'
import InfiniteCalendar, {Calendar, withMultipleDates, defaultMultipleDateInterpolation} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import axios from 'axios';
import Image from '../../UIzard/Image';
import SendIcon from '@material-ui/icons/Send';

const useStyles = theme => ({
  submitButton: {
    backgroundColor: "#bfddff",
    width: '100%',
  },
  startButton: {
    backgroundColor: "#bfffc8",
    width: '100%',
    marginTop: '20px',
    marginBottom: '15px',
  },
  unavailableButton: {
    backgroundColor: "#f5c1b8",
    width: '100%',
    marginBottom: '15px',
  },
  addButton: {
    backgroundColor: "#dda5f0",
    width: '100%',
    marginBottom: '15px',
  },
  textField: {
    marginBottom: '2px',
    marginTop: '2px',
  }
});

class RequestFormCommon extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateAgreementForm = this.validateAgreementForm.bind(this);
    this.openSecondExperimentForm = this.openSecondExperimentForm.bind(this);
    this.getExperimentForm = this.getExperimentForm.bind(this);

    this.state = {
      time1: "",
      timeErrorText1: "",
      continuous1: "",
      continuousErrorText1: "",
      startDate1: "",
      startDateErrorText1: "",
      badDates1: [],
      badDatesErrorText1: "",
      particles1: "",
      particlesErrorText1: "",

      time2: "",
      timeErrorText2: "",
      continuous2: "",
      continuousErrorText2: "",
      startDate2: "",
      startDateErrorText2: "",
      badDates2: [],
      badDatesErrorText2: "",
      particles2: "",
      particlesErrorText2: "",
      
      senderName: "",
      senderNameErrorText: "",
      companyName: "",
      companyNameErrorText: "",
      poNumber: "",
      poNumberErrorText: "",
      billingAddress: "",
      billingAddressErrorText: "",
      billingCity: "",
      billingCityErrorText: "",
      billingState: "",
      billingStateErrorText: "",
      billingZip: "",
      billingZipErrorText: "",

      openStartDate1: false,
      openBadDates1: false,
      openStartDate2: false,
      openBadDates2: false,
      senderEmail: "",
      senderEmailErrorText: "",

      submitted: false,
      validForm: false,
      secondExperiment: false,
      render: false,
    }
  }

  async handleSubmit() {
    this.state.submitted = true;
    this.setState({submitted: true});
    this.validateAgreementForm();
    this.validateExperimentForm(1);
    if (this.state.secondExperiment === true) this.validateExperimentForm(2);
    
    
    if (this.state.validForm) {
    let url = 'https://mda-phoenix.herokuapp.com/requestform';
    await axios.post(url, {
      companyName: this.state.companyName,
      poNumber: this.state.poNumber,
      billingAddress: this.state.billingAddress,
      billingCity: this.state.billingCity,
      billingState: this.state.billingState,
      billingZip: this.state.billingZip,

      time1: this.state.time1,
      continuous1: this.state.continuous1,
      startDate1: this.state.startDate1,
      badDates1: this.state.badDates1,
      particles1: this.state.particles1,

      time2: this.state.time2,
      continuous2: this.state.continuous2,
      startDate2: this.state.startDate2,
      badDates2: this.state.badDates2,
      particles2: this.state.particles2,

      senderName: this.state.senderName,
      senderEmail: this.state.senderEmail,
      date: new Date(),
      secondExperiment: this.state.secondExperiment,
      facility: "TAMU",
    }).then(response => {
      if (response.data.success === true) {
        alert("Form was sent to TAMU successfully. Please check your email!")
        this.props.history.push({
          pathname: "/"
        });
      } else {
        alert(response.data.msg);
        } 
      })
      .catch(error => {
        alert(error);
    });
  } else {
    alert("not sent");
    console.log(this.state);
  }
}

  validateAgreementForm() {
    let sectionIsValid = true;
    if (this.state.senderName === "") {
      this.state.senderNameErrorText = "Please enter your name.";
      sectionIsValid = false;
    }
    else this.state.senderNameErrorText = "";

    if (this.state.companyName === "") {
      this.state.companyNameErrorText = "Please enter your phone number.";
      sectionIsValid = false;
    }
    else this.state.companyNameErrorText = "";

    if (this.state.companyName === "") {
      this.state.companyNameErrorText = "Please enter the name of your funding source.";
      sectionIsValid = false;
    }
    else this.state.companyNameErrorText = "";

    if (this.state.companyName === "") {
      this.state.companyNameErrorText = "Please enter an email for your funding source.";
      sectionIsValid = false;
    }
    else this.state.companyNameErrorText = "";

    if (this.state.companyName === "") {
      this.state.companyNameErrorText = "Please enter a phone number for your funding source.";
      sectionIsValid = false;
    }
    else this.state.companyNameErrorText = "";

    if (this.state.poNumber === "") {
      this.state.poNumberErrorText = "Please enter a P.O. #.";
      sectionIsValid = false;
    }
    else this.state.poNumberErrorText = "";

    if (this.state.billingAddress === "") {
      this.state.billingAddressErrorText = "Please enter a billing address.";
      sectionIsValid = false;
    }
    else this.state.billingAddressErrorText = "";

    if (this.state.billingCity === "") {
      this.state.billingCityErrorText = "Please enter the city for the billing address.";
      sectionIsValid = false;
    }
    else this.state.billingCityErrorText = "";

    if (this.state.billingState === "") {
      this.state.billingStateErrorText = "Please enter the state for the billing address.";
      sectionIsValid = false;
    }
    else this.state.billingStateErrorText = "";

    if (this.state.billingZip === "") {
      this.state.billingZipErrorText = "Please enter the city for the billing address.";
      sectionIsValid = false;
    }
    else this.state.billingZipErrorText = "";

    if (this.state.senderEmail === "") {
      this.state.senderEmailErrorText = "Please enter an email to send this form to."
      sectionIsValid = false;
    }
    else this.state.senderEmailErrorText = "";

    if (sectionIsValid) {
      this.setState({validForm: true});
      this.state.validForm = true;
    } else {
      this.setState({validForm: false});
      this.state.validForm = false;
    }
  }

  validateExperimentForm(formNumber) {
    let sectionIsValid = true;

    if (this.state["time" + formNumber] === "") {
      this.state["timeErrorText" + formNumber] = "Please enter the time for your test.";
      sectionIsValid = false;
    }
    else this.state["timeErrorText" + formNumber] = "";

    if (this.state["continuous" + formNumber] === "") {
      this.state["continuousErrorText" + formNumber] = "Please enter either continuous or interleaved.";
      sectionIsValid = false;
    }
    else this.state["continuousErrorText" + formNumber] = "";

    if (this.state["startDate" + formNumber] === "") {
      this.state["startDateErrorText" + formNumber] = "Please enter a start date.";
      sectionIsValid = false;
    }
    else this.state["startDateErrorText" + formNumber] = "";

    if (this.state["particles" + formNumber] === "") {
      this.state["particlesErrorText" + formNumber] = "Please enter your particle and energy information.";
      sectionIsValid = false;
    }
    else this.state["particlesErrorText" + formNumber] = "";

    if (sectionIsValid) {
      this.setState({validForm: true});
      this.state.validForm = true;
  } else {
      this.setState({validForm: false});
      this.state.validForm = false;
  }
}

  openSecondExperimentForm() {
    this.setState({secondExperiment: true})
  }
  
  getSecondExperimentButton() {
    const { classes } = this.props;
    return (
    <div className="fullForm">
      <Button className={classes.addButton} onClick={this.openSecondExperimentForm}>Add Another Experiment</Button>
    </div>
    );
  }

  getAgreementForm() {
    const { classes } = this.props;
    return (
      <div className="agreementForm">
        <Box>Please enter your company information.</Box>
        <TextField
          className={classes.textField}
          label = "Name"
          onChange={event => {this.setState({senderName: event.target.value})}}
          error = {this.state.senderNameErrorText !== "" && this.state.submitted}
          helperText = {this.state.senderNameErrorText}
          fullWidth
          />
        <TextField 
          className={classes.textField}
          label = "Email"
          onChange={event => {this.setState({senderEmail: event.target.value})}}
          error = {this.state.senderEmailErrorText !== "" && this.state.submitted}
          helperText = {this.state.senderEmailErrorText}
          fullWidth
          />
        <TextField 
          className={classes.textField}
          label = "Phone"
          onChange={event => {this.setState({senderEmail: event.target.value})}}
          error = {this.state.senderEmailErrorText !== "" && this.state.submitted}
          helperText = {this.state.senderEmailErrorText}
          fullWidth
          />
        <TextField 
          className={classes.textField}
          label = "Funding Source"
          onChange={event => {this.setState({companyName: event.target.value})}}
          error = {this.state.companyNameErrorText !== "" && this.state.submitted}
          helperText = {this.state.companyNameErrorText}
          fullWidth
          />
        <TextField 
          className={classes.textField}
          label = "Funding Source Contact Email"
          onChange={event => {this.setState({senderEmail: event.target.value})}}
          error = {this.state.senderEmailErrorText !== "" && this.state.submitted}
          helperText = {this.state.senderEmailErrorText}
          fullWidth
          />
        <TextField 
          className={classes.textField}
          label = "Funding Source Contact Phone"
          onChange={event => {this.setState({senderEmail: event.target.value})}}
          error = {this.state.senderEmailErrorText !== "" && this.state.submitted}
          helperText = {this.state.senderEmailErrorText}
          fullWidth
          />
        <TextField 
          className={classes.textField}
          label = "Company Name"
          onChange={event => {this.setState({companyName: event.target.value})}}
          error = {this.state.companyNameErrorText !== "" && this.state.submitted}
          helperText = {this.state.companyNameErrorText}
          fullWidth
          />
        <TextField 
          className={classes.textField}
          label = "P.O. No."
          onChange={event => {this.setState({poNumber: event.target.value})}}
          error = {this.state.poNumberErrorText !== "" && this.state.submitted}
          helperText = {this.state.poNumberErrorText}
          type="Number"
          fullWidth
          />
        <TextField
          className={classes.textField} 
          label = "Billing Address"
          onChange={event => {this.setState({billingAddress: event.target.value})}}
          error = {this.state.billingAddressErrorText !== "" && this.state.submitted}
          helperText = {this.state.billingAddressErrorText}
          fullWidth
          />
        <TextField 
          className={classes.textField}
          label = "City"
          onChange={event => {this.setState({billingCity: event.target.value})}}
          error = {this.state.billingCityErrorText !== "" && this.state.submitted}
          helperText = {this.state.billingCityErrorText}
          fullWidth
          />
        <TextField 
          className={classes.textField}
          label = "State"
          onChange={event => {this.setState({billingState: event.target.value})}}
          error = {this.state.billingStateErrorText !== "" && this.state.submitted}
          helperText = {this.state.billingStateErrorText}
          fullWidth
          />
        <TextField 
          className={classes.textField}
          label = "Zip"
          onChange={event => {this.setState({billingZip: event.target.value})}}
          error = {this.state.billingZipErrorText !== "" && this.state.submitted}
          helperText = {this.state.billingZipErrorText}
          fullWidth
          />
      </div>
    )
  }

  getExperimentForm(experimentNumber) {
    const { classes } = this.props;
    return (
      <div className="experimentForm">
        <Box>Please enter the information needed for test #{experimentNumber}.</Box>
            <TextField 
              className={classes.textField}
              label = "# of 8-Hour Shifts"
              onChange={event => {this.setState({["time" + experimentNumber]: event.target.value})}}
              error = {this.state["timeErrorText" + experimentNumber].length !== 0 && this.state.submitted}
              helperText = {this.state["timeErrorText" + 1]}
              type="Number"
              fullWidth
            />
            <FormControl 
              className={classes.textField}
              error = {this.state["continuousErrorText" + experimentNumber].length !== 0 && this.state.submitted}
              fullWidth
              > 
              <InputLabel>Continuous or Interleaved?</InputLabel>
              <Select
                value={this.state["continuous" + experimentNumber]}
                onChange={event => {this.setState({["continuous" + experimentNumber]: event.target.value})}}
                >
                <MenuItem value={"Continuous"}>Continuous</MenuItem>
                <MenuItem value={"Interleaved"}>Interleaved</MenuItem>
              </Select>
              <FormHelperText>{this.state["continuousErrorText" + experimentNumber]}</FormHelperText>
            </FormControl>
            <br/>
            <TextField 
              className={classes.textField}
              label = "Particles and Energies Required"
              onChange={event => {this.setState({["particles" + experimentNumber]: event.target.value})}}
              error = {this.state["particlesErrorText" + experimentNumber].length !== 0 && this.state.submitted}
              helperText = {this.state["particlesErrorText" + experimentNumber]}
              multiline
              fullWidth
            />
            <TextField 
              className={classes.textField}
              label = "Specified Ion"
              onChange={event => {this.setState({["particles" + experimentNumber]: event.target.value})}}
              error = {this.state["particlesErrorText" + experimentNumber].length !== 0 && this.state.submitted}
              helperText = {this.state["particlesErrorText" + experimentNumber]}
              multiline
              fullWidth
              />
            <TextField 
              className={classes.textField}
              label = "Beam Size"
              onChange={event => {this.setState({["particles" + experimentNumber]: event.target.value})}}
              error = {this.state["particlesErrorText" + experimentNumber].length !== 0 && this.state.submitted}
              helperText = {this.state["particlesErrorText" + experimentNumber]}
              multiline
              fullWidth
              />
            <TextField 
              className={classes.textField}
              label = "Max Dose/Fluence"
              onChange={event => {this.setState({["particles" + experimentNumber]: event.target.value})}}
              error = {this.state["particlesErrorText" + experimentNumber].length !== 0 && this.state.submitted}
              helperText = {this.state["particlesErrorText" + experimentNumber]}
              multiline
              fullWidth
              />
            <TextField 
              className={classes.textField}
              label = "Max Dose Rate/Flux"
              onChange={event => {this.setState({["particles" + experimentNumber]: event.target.value})}}
              error = {this.state["particlesErrorText" + experimentNumber].length !== 0 && this.state.submitted}
              helperText = {this.state["particlesErrorText" + experimentNumber]}
              multiline
              fullWidth
              />
            <TextField 
              className={classes.textField}
              label = "Specified Ion"
              onChange={event => {this.setState({["particles" + experimentNumber]: event.target.value})}}
              error = {this.state["particlesErrorText" + experimentNumber].length !== 0 && this.state.submitted}
              helperText = {this.state["particlesErrorText" + experimentNumber]}
              multiline
              fullWidth
              />
            <TextField 
              className={classes.textField}
              label = "Additional Information (safety concerns, export restrictions, etc)"
              onChange={event => {this.setState({["particles" + experimentNumber]: event.target.value})}}
              error = {this.state["particlesErrorText" + experimentNumber].length !== 0 && this.state.submitted}
              helperText = {this.state["particlesErrorText" + experimentNumber]}
              multiline
              fullWidth
              />
            <br/>
            <br/>
            <Button className={classes.startButton} onClick={() => this.setState({["openStartDate" + experimentNumber]: true})}>Select Start Date for Experiment #{experimentNumber}</Button>
            <Dialog open={this.state["openStartDate" + experimentNumber]} onClose={() => this.setState({["openStartDate" + experimentNumber]: false})}>
              <DialogTitle>Please enter a start date.</DialogTitle>
              <DialogContent>
              <InfiniteCalendar
                selected={this.state["startDate" + experimentNumber]}
                onSelect={(event) => this.setState({["startDate" + experimentNumber]: event})}
                minDate={new Date()}
                min={new Date()}
              />
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={() => this.setState({["openStartDate" + experimentNumber]: false})}>
                Select Date
                </Button>
              </DialogActions>
            </Dialog>
            <Button className={classes.unavailableButton} onClick={() => this.setState({["openBadDates" + experimentNumber]: true})}>Select Unavailable Dates for Experiment #{experimentNumber}</Button>
            <Dialog open={this.state["openBadDates" + experimentNumber]} onClose={() => this.setState({["openBadDates" + experimentNumber]: false})}>
              <DialogTitle>Please enter dates you cannot run.</DialogTitle>
              <DialogContent>
              <InfiniteCalendar
              Component={withMultipleDates(Calendar)}
              selected={this.state["badDates" + experimentNumber]}
              onSelect={(event) => this.setState({["badDates" + experimentNumber]: this.state["badDates" + experimentNumber].concat(event)})}
              minDate={new Date()}
              min={new Date()}
              interpolateSelection={defaultMultipleDateInterpolation}
              />
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={() => this.setState({["openBadDates" + experimentNumber]: false})}>
                Select Dates
                </Button>
              </DialogActions>
            </Dialog>
        </div>
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="fullForm">
        <Stack>
          <Image style={{ width: '150px', height: '150px', backgroundImage: 'url(/images/ISEEULogo.png)' }} />
          <h1 variant="h1" component="h2">Common Beam Request Form</h1>
          {this.getAgreementForm()}
          <br/>
          {this.getExperimentForm(1)}
          {this.state.secondExperiment ? this.getExperimentForm(2) : this.getSecondExperimentButton()}
          <Button className={classes.submitButton} onClick={this.handleSubmit}>
            Submit
            <SendIcon/>
            </Button>
        </Stack>
    </div>
    );
  }
}

export default withRouter(withStyles(useStyles)(RequestFormCommon));