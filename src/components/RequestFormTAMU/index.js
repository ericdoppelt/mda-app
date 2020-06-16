import React from 'react';
import {TextField, Button, Box} from '@material-ui/core';

import { withRouter } from 'react-router-dom';
import Stack from '../Stack';

import './RequestFormTAMU.css'

class RequestFormTAMU extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit= this.handleSubmit.bind(this);

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
    }
  }


  handleSubmit() {
    console.log(this.state);
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
          <Box>Please enter the information for your first experiment.</Box>
          <TextField 
            label = "# of 8-Hour Shifts"
            onChange={event => {this.setState({time1: event.target.value})}}
            fullWidth
          />
          <TextField 
            label = "Continuous or Interleaved?"
            onChange={event => {this.setState({continuous1: event.target.value})}}
            fullWidth
          />
          <TextField 
            label = "Preferred Start Date"
            onChange={event => {this.setState({startDate1: event.target.value})}}
            fullWidth
          />
          <TextField 
            label = "Dates You Cannot Run"
            onChange={event => {this.setState({badDates1: event.target.value})}}
            fullWidth
          />
          <TextField 
            label = "Particles and Energies Required"
            onChange={event => {this.setState({particles1: event.target.value})}}
            fullWidth
          />

          <br/>
          <Box>Please enter the information for your first experiment.</Box>
          <TextField 
            label = "# of 8-Hour Shifts"
            onChange={event => {this.setState({time2: event.target.value})}}
            fullWidth
          />
          <TextField 
            label = "Continuous or Interleaved?"
            onChange={event => {this.setState({continuous2: event.target.value})}}
            fullWidth
          />
          <TextField 
            label = "Preferred Start Date"
            onChange={event => {this.setState({startDate2: event.target.value})}}
            fullWidth
          />
          <TextField 
            label = "Dates You Cannot Run"
            onChange={event => {this.setState({badDates2: event.target.value})}}
            fullWidth
          />
          <TextField 
            label = "Particles and Energies Required"
            onChange={event => {this.setState({particles2: event.target.value})}}
            fullWidth
          />
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