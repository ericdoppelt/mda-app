// from https://serverless-stack.com/chapters/create-a-login-page.html

import React from 'react';
import './LoginForm.css'
import {TextField, Button, Typography} from '@material-ui/core';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Row from '../../UIzard/Row'
import Box from '@material-ui/core/Box'

const useStyles = theme => ({

 subheader: {
   marginLeft: '25%',
   marginright:'25%',
 },
});

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

    var self = this;
    let url = 'https://mda-phoenix.herokuapp.com/login';
    await axios.post(url, {
      username: self.state.username,
      password: self.state.password
    }).then(response => {
      console.log(response);
      if (response.data.success === true) {
        window.sessionStorage.setItem("access_token", response.data.access_token);
        window.sessionStorage.setItem("integrator_token", response.data.integrator_token);
        this.props.history.push('user-profile');
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
    var { classes} = this.props;
    return (
      <div className="loginform">
        <form onSubmit={this.handleSubmit}>
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
            <Box mr='10px'>
              <Button
                id="button"
                type="submit"
                color="primary"
                variant="contained"
                style={{width: '100px'}}
              >
                Login
              </Button>
            </Box>

            <Button
              variant="contained"
              style={{width: '100px'}}
              onClick={() => {this.props.history.push('/user-registration')}}
            >
              Register
            </Button>
          </Row>
        </form>
        <Row>
        <Button className={classes.subheader} color='primary' onClick={() => {this.props.history.push('/forgot-password')}}>
          <br/><br/><small>Forgot Password?</small>
        </Button>
        </Row>
        <Row>
        <Button className={classes.subheader} color='primary' onClick={() => {this.props.history.push('/forgot-username')}}>
        <small>Forgot Username?</small>
        </Button>
        </Row>
         {this.state.displayedText}
      </div>
  );
  }
}

export default withRouter(withStyles(useStyles)(LoginForm));
