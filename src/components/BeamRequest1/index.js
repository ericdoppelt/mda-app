// from https://serverless-stack.com/chapters/create-a-login-page.html

import React from 'react';
import './BeamRequest.css'

import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { withRouter } from 'react-router-dom';

class BeamRequest1 extends React.Component {

  constructor(props) {
    super(props);
    console.log("state" + this.state);

    this.handleSubmit= this.handleSubmit.bind(this);

    this.state = {
      user: "",
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
    
    this.props.history.push({
      pathname: "/calendar",
      state: {user: this.state.user, facility: this.state.facility, integrator: this.state.integrator, 
        totalTime: this.state.totalTime, startDate: this.state.startDate}
    });
  }

  render() {
    return (
      <div className="BeamRequest">
      <form onSubmit={this.handleSubmit}>
      <FormGroup controlId="text" bsSize="large">
          <ControlLabel>Username </ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.user}
            onChange={e => this.setState({user: e.target.value})}
          />
        </FormGroup>
        <FormGroup controlId="text" bsSize="large">
          <ControlLabel>Facility </ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.facility}
            onChange={e => this.setState({facility: e.target.value})}
          />
        </FormGroup>
        <FormGroup controlId="text" bsSize="large">
          <ControlLabel>Integrator </ControlLabel>
          <FormControl
            value={this.state.integrator}
            onChange={e => this.setState({integrator: e.target.value})}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="text" bsSize="large">
          <ControlLabel>Total Time Requested (in hours) </ControlLabel>
          <FormControl
            value={this.state.totalTime}
            onChange={e => this.setState({totalTime: e.target.value})}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="text" bsSize="large">
          <ControlLabel>Preferred Start Date (YYYY-MM-DD) </ControlLabel>
          <FormControl
            value={this.state.startDate}
            onChange={e => this.setState({startDate: e.target.value})}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="text" bsSize="large">
          <ControlLabel>Dates you cannot run</ControlLabel>
          <FormControl
            value={this.state.cannotRunDate}
            onChange={e => this.setState({cannotRunDate: e.target.value})}
            type="text"
          />
        </FormGroup>
        <Button block bsSize="large" type="submit">
          Submit
        </Button>
      </form>
      {this.state.displayedText}
    </div>
  );
  }
}

export default withRouter(BeamRequest1);