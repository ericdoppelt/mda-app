import React from 'react';
import {TextField, Button, Box} from '@material-ui/core';

import { withRouter } from 'react-router-dom';
import Stack from '../Stack';

import './RequestFormTAMU.css'

class RequestFormTAMU extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      time1: "",
      continuous1: "",
      startDate1: "",
      badDates1: "",
      particles1: "",
      
      time2: "",
      continuous2: "",
      startDate2: "",
      badDates2: "",
      particles2: "",
      
      companyName: "",
      poNumber: "",
      billingAddress: "",
      billingCity: "",
      billingState: "",
      billingZip: "",

      secondExperiment: false,
      facility: "TAMU",
    }
  }

  

  getSecondExperimentButton() {
    return (
    <div>
      <Button onClick={(event) => {this.setState({secondExperiment: true})}}>Add Another Experiment</Button>
    </div>
    );
  }

  getExperimentForm(experimentNumber) {
    console.log("called");
    return (
      <div>
        <Box>Please enter the information needed for the following test.</Box>
            <TextField 
              label = "# of 8-Hour Shifts"
              onChange={event => {this.setState({["time" + experimentNumber]: event.target.value})}}
              fullWidth
            />
            <TextField 
              label = "Continuous or Interleaved?"
              onChange={event => {this.setState({["continuous" + experimentNumber]: event.target.value})}}
              fullWidth
            />
            <br/>
            <br/>
            <TextField 
              helperText = "Preferred Start Date"
              defaultValue = "2020-06-15"
              onChange={event => {this.setState({["startDate" + experimentNumber]: event.target.value})}}
              type="date"
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
              fullWidth
            />
          <br/>
        </div>
    )
  }

  handleSubmit() {
    console.log(this.state.secondExperiment);
  }

  render() {
    return (
      <div className="TAMURequest">
        <Stack>
          <br/>
          <Box>Please enter your company information.</Box>
          <TextField 
            label = "Company Name"
            onChange={event => {this.setState({companyName: event.target.value})}}
            fullWidth
          />
          <TextField 
            label = "P.O. No."
            onChange={event => {this.setState({poNumber: event.target.value})}}
            fullWidth
          />
          <TextField 
            label = "Billing Address"
            onChange={event => {this.setState({billingAddress: event.target.value})}}
            fullWidth
          />
          <TextField 
            label = "City"
            onChange={event => {this.setState({billingCity: event.target.value})}}
            fullWidth
          />
          
          <TextField 
            label = "State"
            onChange={event => {this.setState({billingState: event.target.value})}}
            fullWidth
          />
          <TextField 
            label = "Zip"
            onChange={event => {this.setState({billingZip: event.target.value})}}
            fullWidth
          />
          <br/>
          {this.getExperimentForm(1)}
          <br/>
          
          {this.state.secondExperiment ? this.getExperimentForm(2) : this.getSecondExperimentButton()}
          <br/>
          <Button onClick={this.handleSubmit}>
            Submit
          </Button>
        </Stack>
    </div>
    );
  }
}

export default withRouter(RequestFormTAMU);