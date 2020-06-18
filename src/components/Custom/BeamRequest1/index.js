// from https://serverless-stack.com/chapters/create-a-login-page.html

import React from 'react';
import './BeamRequest.css'
import {TextField, Button} from '@material-ui/core';

import { withRouter } from 'react-router-dom';

class BeamRequest1 extends React.Component {

  constructor(props) {
    super(props);
    console.log("state" + this.state);

    this.handleSubmit= this.handleSubmit.bind(this);

    this.state = {
      username: "",
      facility: "",
      integrator: "",
      totalTime: "",
      startDate: "",
      cannotRunDate: "",
      displayedText: "",
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.startDate);
    this.props.history.push({
      pathname: "/calendar",
      state: {user: this.state.user, facility: this.state.facility, integrator: this.state.integrator, 
        totalTime: this.state.totalTime, startDate: this.state.startDate}
    });
  }

  render() {
    return (
      <div className="BeamRequest">
      <TextField 
        label = "Username"
        onChange={event => {this.setState({username: event.target.value})}}
        hintStyle={{ textAlign: 'center', width: '100%' }}
      />
      <br/>
      <TextField 
        label = "Facility"
        onChange={event => {this.setState({facility: event.target.value})}}
      />
      <br/>
      <TextField 
        label = "Integrator"
        onChange={event => {this.setState({integrator: event.target.value})}}
      />
      <br/>
      <TextField 
        label = "Total Hours Requested"
        onChange={event => {this.setState({totalTime: event.target.value})}}
      />
      <br/>
      <br/>
      <TextField 
        label = "Preferred Start Date"
        type="date"
        defaultValue = "2020-06-10"
        onChange={event => {this.setState({startDate: event.target.value})}}
      />
      <br/>
      <br/>
      <TextField 
        label = "Dates You Cannot Run"
        type="date"
        defaultValue = "2020-06-11"
        onChange={event => {this.setState({cannotRunDate: event.target.value})}}
      />
      <br/>
      <br/>
      <Button id="submitButton">
        Submit
      </Button>
    </div>
  );
  }
}

export default withRouter(BeamRequest1);