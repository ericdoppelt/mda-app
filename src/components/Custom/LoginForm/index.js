// from https://serverless-stack.com/chapters/create-a-login-page.html

import React from 'react';
import './LoginForm.css'
import {TextField, Button} from '@material-ui/core';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Row from '../../UIzard/Row'

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit= this.handleSubmit.bind(this);

    this.state = {
      username: "",
      password: "",
      displayedText: "",
      usernameError: "",
      passwordError: "",
      submitted: false,
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({submitted: true});
    this.setState({ usernameError: "", passwordError: "" });
    console.log("called");
    console.log(this.state.username);
    console.log(this.state.password);

    var self = this;
    let url = 'https://mda-phoenix.herokuapp.com/login';
    await axios.post(url, {
      username: self.state.username,
      password: self.state.password
    }).then(response => {
      console.log(response);
      if (response.data.success === true) {
        window.sessionStorage.setItem("access_token", response.data.access_token)
        this.props.history.push({
          pathname: "/user-profile"
        });
      } else {
          if (response.data.error === "Incorrect username") {
            self.setState({ usernameError: response.data.error });
          }
          if (response.data.error === "Incorrect password") {
            self.setState({ passwordError: response.data.error });
          }
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
          id="outlined-error-helper-text"
          label = "Username"
          variant="outlined"
          error = {this.state.usernameError.length !== 0 && this.state.submitted}
          helperText = {this.state.usernameError}
          onChange={event => {this.setState({username: event.target.value})}}
          />
        <br/><br/>
        <TextField 
          type="password" 
          label = "Password"
          variant="outlined"
          error = {this.state.passwordError.length !== 0 && this.state.submitted}
          helperText = {this.state.passwordError}
          onChange={event => {this.setState({password: event.target.value})}}
          />
        <br/><br/>
        <Row>
          <Button 
            id="button" 
            variant="contained"
            style={{width: '100px'}}
            onClick={(event) => this.handleSubmit(event)}
          >
            Login
          </Button>
          <Button 
            variant="contained"
            style={{width: '100px'}}
            onClick={() => {this.props.history.push('/user-registration')}}
          >
            Register
          </Button>
        </Row>
         {this.state.displayedText}
      </div>
  );
  }
}

export default withRouter(LoginForm);