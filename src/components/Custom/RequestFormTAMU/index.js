import React from 'react';
import {TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText} from '@material-ui/core';
import MultipleDatesPicker from '../InfiniteCalendars/MultipleDatesPicker';
import 'react-nice-dates/build/style.css'

import { withRouter } from 'react-router-dom';
import Stack from '../../UIzard/Stack';

import './RequestFormTAMU.css'

import 'react-nice-dates/build/style.css'
import MultipleDatePicker from '../MultipleDatePicker';

class RequestFormTAMU extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.state = {
      time1: "",
      timeErrorText1: "",
      continuous1: "",
      continuousErrorText1: "",
      startDate1: "",
      startDateErrorText1: "",
      badDates1: "",
      badDatesErrorText1: "",
      particles1: "",
      particlesErrorText1: "",

      time2: "",
      timeErrorText2: "",
      continuous2: "",
      continuousErrorText2: "",
      startDate2: "",
      startDateErrorText2: "",
      badDates2: "",
      badDatesErrorText2: "",
      particles2: "",
      particlesErrorText2: "",
      
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

      facility: "TAMU",
      submitted: false,
      secondExperiment: false,
      open: false,
    }
  }

  handleSubmit() {
    this.setState({submitted: true});
    this.validateAgreementForm();
    this.validateExperimentForm(1);
    if (this.state.secondExperiment === true) this.validateExperimentForm(2);
    console.log(this.state);
  }

  validateAgreementForm() {
    if (this.state.companyName === "") this.state.companyNameErrorText = "Please enter a company name.";
    else this.state.companyNameErrorText = "";

    if (this.state.poNumber === "") this.state.poNumberErrorText = "Please enter a P.O. #.";
    else this.state.poNumberErrorText = "";

    if (this.state.billingAddress === "") this.state.billingAddressErrorText = "Please enter a billing address.";
    else this.state.billingAddressErrorText = "";

    if (this.state.billingCity === "") this.state.billingCityErrorText = "Please enter the city for the billing address.";
    else this.state.billingCityErrorText = "";

    if (this.state.billingState === "") this.state.billingStateErrorText = "Please enter the state for the billing address.";
    else this.state.billingStateErrorText = "";

    if (this.state.billingZip === "") this.state.billingZipErrorText = "Please enter the city for the billing address.";
    else this.state.billingZipErrorText = "";
  }
  

  validateExperimentForm(formNumber) {
    if (this.state["time" + formNumber] === "") this.state["timeErrorText" + formNumber] = "Please enter the time for your test.";
    else this.state["timeErrorText" + formNumber] = "";

    if (this.state["continuous" + formNumber] === "") this.state["continuousErrorText" + formNumber] = "Please enter either continuous or interleaved.";
    else this.state["continuousErrorText" + formNumber] = "";

    if (this.state["startDate" + formNumber] === "") this.state["startDateErrorText" + formNumber] = "Please enter a start date.";
    else this.state["startDateErrorText" + formNumber] = "";

    if (this.state["particles" + formNumber] === "") this.state["particlesErrorText" + formNumber] = "Please enter your particle and energy information.";
    else this.state["particlesErrorText" + formNumber] = "";
  }

  getSecondExperimentButton() {
    return (
    <div>
      <Button onClick={(event) => {this.setState({secondExperiment: true})}}>Add Another Experiment</Button>
    </div>
    );
  }

  getAgreementForm() {
    return (
      <div className="agreementForm">
        <Box>Please enter your company information.</Box>
        <TextField 
          label = "Company Name"
          onChange={event => {this.setState({companyName: event.target.value})}}
          error = {this.state.companyNameErrorText !== 0 && this.state.submitted}
          helperText = {this.state.companyNameErrorText}
          fullWidth
          />
        <TextField 
          label = "P.O. No."
          onChange={event => {this.setState({poNumber: event.target.value})}}
          error = {this.state.poNumberErrorText !== 0 && this.state.submitted}
          helperText = {this.state.poNumberErrorText}
          type="Number"
          fullWidth
          />
        <TextField 
          label = "Billing Address"
          onChange={event => {this.setState({billingAddress: event.target.value})}}
          error = {this.state.billingAddressErrorText !== 0 && this.state.submitted}
          helperText = {this.state.billingAddressErrorText}
          fullWidth
          />
        <TextField 
          label = "City"
          onChange={event => {this.setState({billingCity: event.target.value})}}
          error = {this.state.billingCityErrorText !== 0 && this.state.submitted}
          helperText = {this.state.billingCityErrorText}
          fullWidth
          />
        <TextField 
          label = "State"
          onChange={event => {this.setState({billingState: event.target.value})}}
          error = {this.state.billingStateErrorText !== 0 && this.state.submitted}
          helperText = {this.state.billingStateErrorText}
          fullWidth
          />
        <TextField 
          label = "Zip"
          onChange={event => {this.setState({billingZip: event.target.value})}}
          error = {this.state.billingZipErrorText !== 0 && this.state.submitted}
          helperText = {this.state.billingZipErrorText}
          fullWidth
          />
      </div>
    )
  }

  getExperimentForm(experimentNumber) {
    return (
      <div className="experimentForm">
        <Box>Please enter the information needed for test #{experimentNumber}.</Box>
            <TextField 
              label = "# of 8-Hour Shifts"
              onChange={event => {this.setState({["time" + experimentNumber]: event.target.value})}}
              error = {this.state["timeErrorText" + experimentNumber].length !== 0 && this.state.submitted}
              helperText = {this.state["timeErrorText" + 1]}
              type="Number"
              fullWidth
            />
            <FormControl 
              className='dropdownBox'
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
            <br/>
            <TextField 
              label = "Preferred Start Date"
              onChange={event => {this.setState({["startDate" + experimentNumber]: event.target.value})}}
              type="date"
              error = {this.state["startDateErrorText" + experimentNumber].length !== 0 && this.state.submitted}
              InputLabelProps={{ shrink: true }}
              helperText = {this.state["startDateErrorText" + experimentNumber]}
              fullWidth
            />
            <br/>
            <TextField 
              label = "Dates You Cannot Run"
              onChange={event => {this.setState({["badDates" + experimentNumber]: event.target.value})}}
              fullWidth
            />
            <TextField 
              label = "Particles and Energies Required"
              onChange={event => {this.setState({["particles" + experimentNumber]: event.target.value})}}
              error = {this.state["particlesErrorText" + experimentNumber].length !== 0 && this.state.submitted}
              helperText = {this.state["particlesErrorText" + experimentNumber]}
              multiline
              fullWidth
            />
          <br/>
        </div>
    )
  }

  render() {
    return (
      <div className="fullForm">
        <Stack>
          <br/>
          {this.getAgreementForm()}
          <br/>
          {this.getExperimentForm(1)}
          <br/>
          {this.state.secondExperiment ? this.getExperimentForm(2) : this.getSecondExperimentButton()}
          <br/>
          <Button onClick={this.handleSubmit}>Submit</Button>
          <br/>
          <br/>
          <br/>
          <br/>
          <MultipleDatesPicker/>
          <MultipleDatePicker/>
        </Stack>
    </div>
    );
  }
}

export default withRouter(RequestFormTAMU);