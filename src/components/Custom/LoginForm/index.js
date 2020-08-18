// from https://serverless-stack.com/chapters/create-a-login-page.html

import React from 'react';
import './LoginForm.css'
import {TextField, Button, Snackbar} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Row from '../../UIzard/Row';
import './LoginForm.css';

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

    let accountWasCreated;
    if (this.props.location.state !== undefined) {
      accountWasCreated = this.props.location.state.accountCreated;
    } else {
      accountWasCreated = false;
    }

    this.state = {
      username: "",
      password: "",
      loginError: false,
      loginErrorHelper: "",
      usernameError: "",
      passwordError: "",
      submitted: false,
      accountCreated: accountWasCreated,
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({submitted: true});
    this.setState({ usernameError: "", passwordError: "" });

    var self = this;
    let url = 'https://vcm-15941.vm.duke.edu/api/login';
    await axios.post(url, {
      username: self.state.username,
      password: self.state.password
    }).then(response => {
      console.log(response);
      if (response.data.success === true) {
        window.sessionStorage.setItem("access_token", response.data.access_token);
        window.sessionStorage.setItem("integrator_token", response.data.integrator_token);
        console.log(response.data.integrator_token);
        console.log(window.sessionStorage.getItem('next_page'));
        if (window.sessionStorage.getItem("next_page") == null){
          this.props.history.push('user-profile');
        }
        else if(window.sessionStorage.getItem("next_page")=='/scheduler' && (window.sessionStorage.getItem('integrator_token') === 'false')){
          this.props.history.push('user-profile');
        }
        else {
          this.props.history.push(window.sessionStorage.getItem("next_page"));
        }
      } else {
          self.setState({loginError:true, loginErrorHelper: response.data.error, submitted: false})
          if (response.data.error === "Incorrect username") {
            self.setState({ usernameError: response.data.error, submitted: false });
          }
          if (response.data.error === "Incorrect password") {
            self.setState({ passwordError: response.data.error, submitted: false });
          }
        }
      })
      .catch(error => {
        alert(error);
        console.log(error)
    });
  }

  getSnackBars() {
    console.log("PROPS");
    console.log(this.props);
    if (this.state.loginError){
      return(
        <Snackbar
          open = {this.state.loginError}
          autoHideDuration={6000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          onClose={() => {this.setState({loginError: false})}}
          >
          <Alert severity="warning">
            {this.state.loginErrorHelper}
          </Alert>
        </Snackbar>);
    }
    else {
      return(
        <Snackbar
          open = {this.state.accountCreated}
          autoHideDuration={6000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          onClose={() => {this.setState({accountCreated: false})}}
          >
          <Alert severity="success">
            Account Created
          </Alert>
        </Snackbar>
      );
    }
  }

  render() {
    //var { classes} = this.props;
    return (
      <div className="loginform">
        <form onSubmit={this.handleSubmit}>
            <TextField
              id="outlined-error-helper-text"
              label = "Username"
              variant="outlined"
              error = {this.state.usernameError.length !== 0}
              helperText = {this.state.usernameError}
              onChange={event => {this.setState({username: event.target.value})}}
            />
          <br/><br/>
            <TextField
              type="password"
              label = "Password"
              variant="outlined"
              error = {this.state.passwordError.length !== 0}
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
                disabled={this.state.submitted}
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
        <br/>
        <Row style={{justifyContent: 'center'}}>
          <Button color='primary' onClick={() => {this.props.history.push('/forgot-password')}}>
            <small>Forgot Password?</small>
          </Button>
        </Row>
        <Row style={{justifyContent: 'center'}}>
          <Button color='primary' onClick={() => {this.props.history.push('/forgot-username')}}>
            <small>Forgot Username?</small>
          </Button>
        </Row>

         {this.getSnackBars()}
      </div>
  );
  }
}

export default withRouter(withStyles(useStyles)(LoginForm));
