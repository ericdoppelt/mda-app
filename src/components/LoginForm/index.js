// from https://serverless-stack.com/chapters/create-a-login-page.html

import React from 'react';
import './LoginForm.css'

import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    console.log("state" + this.state);

    this.handleSubmit= this.handleSubmit.bind(this);

    this.state = {
      username: "",
      password: "",
      displayedText: "",
    }
  }
  
  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    var self = this;
    await axios.post('https://mda-phoenix.herokuapp.com/login', {
      username: self.state.username,
      password: self.state.password
    }).then(response => {
      console.log(response);
      if (response.data.error === "") {
        console.log("success");
        this.props.history.push("/user-profile");
      } else {
        console.log("fail");
        self.setState({displayedText: response.data.error});
        } 
      })
      .catch(error => {
        console.log("error")
        console.log(error);
    });
  }

  render() {
    return (
      <div className="LoginForm">
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="text" bsSize="large">
          <ControlLabel>Username</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.username}
            onChange={e => this.setState({username: e.target.value})}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={e => this.setState({password: e.target.value})}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
          Login
        </Button>
      </form>
      {this.state.displayedText}
    </div>
  );
  }
}

export default withRouter(LoginForm);