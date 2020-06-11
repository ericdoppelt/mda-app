import React from 'react';
import './RegistrationForm.css'

import {TextField, Button} from '@material-ui/core';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Paragraph from '../Paragraph';

class RegistrationForm extends React.Component {

  constructor(props) {
    super(props);

    this.updateState= this.updateState.bind(this);

    this.state = {
      firstName: "",
      firstNameValid: true,
      lastName: "",
      lastNameValid: true,
      username: "",
      userNameValid: true,
      userNameError: "",
      password: "",
      passWordValid: true,
      displayedText: "",
    }
  }
  

  updateState() {
    this.setState({
      firstNameValid: (this.state.firstName.length > 0),
      lastNameValid: (this.state.lastName.length > 0),
      userNameValid: (this.state.username.length > 0),
      passWordValid: (this.state.password.length > 0)
    }, () => {
      this.submitForm();
    });
  }

  async submitForm() {
    let formIsValid = this.state.firstNameValid && this.state.lastNameValid && this.state.userNameValid && this.state.passWordValid;
    console.log(formIsValid);
    if (formIsValid) {
      var self = this;
      await axios.post('https://mda-phoenix.herokuapp.com/register', {
        username: self.state.username,
        password: self.state.password,
        first_name: self.state.firstName,
        last_name: self.state.lastName,
      }).then(response => {
        console.log(response);
        if (response.data.success == true) {
          self.props.history.push('/user-login');
        } else {
          self.setState({userNameValid: false});
          self.setState({userNameError: response.data.error});
        }
      }).catch(error => {
        alert(error);
        console.log(error)
      });
      
    } else {
      console.log("not submitted");
      console.log(this.state);
    }
  }

  render() {
    return (
      <div className="loginform">
        <TextField
          className = "inputText"
          label = "First Name"
          onChange={event => {this.setState({firstName: event.target.value})}}
          error = {!this.state.firstNameValid}
          helperText = {this.state.firstNameValid ? "" : "Please enter a first name."}
        />
        <br/>
        <TextField 
          className = "inputText"
          label = "Last Name"
          onChange={event => {this.setState({lastName: event.target.value})}}
          error = {!this.state.lastNameValid}
          helperText = {this.state.lastNameValid ? "" : "Please enter a last name."}
        />
        <br/>
        <TextField 
          className = "inputText"
          label = "Username"
          onChange={event => {this.setState({username: event.target.value})}}
          error = {!this.state.userNameValid}
          helperText = {this.state.userNameError}
        />
        <br/>
        <TextField 
          className = "inputText"
          type="password" 
          label = "Password"
          onChange={event => {this.setState({password: event.target.value})}}
          error = {!this.state.passWordValid}
          helperText = {this.state.passWordValid ? "" : "Please enter a password."}
        />
        <br/>
        <Button onClick={() => this.updateState()}>Create Account</Button>
        <Paragraph>{this.state.displayedText}</Paragraph>
      </div>
  );
  }
}

export default withRouter(RegistrationForm);