// from https://serverless-stack.com/chapters/create-a-login-page.html

import React from 'react';
import './LoginForm.css'
import {TextField, Button} from '@material-ui/core';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

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
    console.log("called");
    console.log(this.state.username);
    console.log(this.state.password);

    var self = this;
    await axios.post('https://mda-phoenix.herokuapp.com/login', {
      username: self.state.username,
      password: self.state.password
    }).then(response => {
      console.log(response);
      if (response.data.success === true) {
        this.props.history.push({
          pathname: "/user-profile",
          state: {user: self.state.username}
        });
      } else {
        self.setState({displayedText: response.data.error});
        } 
      })
      .catch(error => {
        alert(error);
        console.log(error)
    });
  }

  render() {
    return (
      <div className="loginform">
        <TextField 
          onChange = {(event,newValue) => this.setState({username:newValue})}
          label = "Username"
          onChange={event => {this.setState({username: event.target.value})}}/>
        <br/>
        <TextField 
          type="password" 
          onChange = {(newValue) => this.setState({password:newValue})}
          label = "Password"
          onChange={event => {this.setState({password: event.target.value})}}/>
        <br/>
        <Button id="button" onClick={(event) => this.handleSubmit(event)}>Login</Button>
        <Button onClick={() => {this.props.history.push('/user-registration')}}>Create Account</Button>
         {this.state.displayedText}
      </div>
  );
  }
}

export default withRouter(LoginForm);