import React from 'react';

import {TextField, Button, FormHelperText, FormControl, InputLabel, Select, MenuItem, Typography, Snackbar} from '@material-ui/core';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {Alert} from '@material-ui/lab';


const useStyles = theme => ({
  left: {
    marginTop: '3px',
    marginLeft: '5%',
    marginRight: '3%',
    width: '42%',
  },
  right: {
    marginTop: '3px',
    marginLeft: '3%',
    marginRight: '5%',
    width: '42%',
  },
  submitButton: {
    backgroundColor: "#bfddff",
    marginTop: '50px',
    marginLeft:'5%',
    marginRight: '5%',
    marginBottom: '20px',
    width: '90%',
  },
  header: {
    marginTop: '10px',
  },
  subheader: {
    marginTop: '10px',
    marginBottom: '10px',
  },
});

class RegistrationForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      submitted: false,

      firstName: "",
      firstNameError: false,

      lastName: "",
      lastNameError: false,

      username: "",
      usernameError: false,
      usernameHelper: "",

      password: "",
      passwordEmptyError: false,
      passwordInvalidError: false,
      passwordHelper: "",
      showPassword: false,

      affiliation: "",
      affiliationError: false,

      type: "",
      typeError: false,

      phone: "",
      phoneError: false,

      email: "",
      emailError: false,

      backendError: false,
      integrators: [],
    }
  }

  async componentDidMount() {
    let url = 'https://vcm-17934.vm.duke.edu/api/integrator';
    await axios.get(url, {
      }).then(response => {
        console.log("RESPONSE");
        console.log(response);
        this.setState({integrators: response.data.integrators});
        })
        .catch(error => {
        alert(error);
  });
  }


  validatePassword(password) {
    let passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
    return passwordRegex.test(password);
  }

  submitForm() {
    this.updatePassword(this.state.password);
    this.setState({submitted: true});
    let firstNameError = (this.state.firstName === "");
    let lastNameError = (this.state.lastName === "");
    let usernameError = (this.state.username === "");
    let passwordEmptyError = (this.state.password === "");
    let passwordInvalidError = (!this.validatePassword(this.state.password));
    let affiliationError = (this.state.affiliation === "");
    let typeError = (this.state.type === "");
    let phoneError = (this.state.phone === "");
    let emailError = (this.state.email === "");
    let formIsValid = !firstNameError && !lastNameError && !usernameError && !passwordEmptyError
    && !passwordInvalidError && !affiliationError && !typeError && !phoneError && !emailError;

    if (formIsValid) this.postToAxios();
  }

  async postToAxios() {
      var self = this;
      await axios.post('https://vcm-17934.vm.duke.edu/api/register', {
        first_name: self.state.firstName,
        last_name: self.state.lastName,
        username: self.state.username,
        password: self.state.password,
        affiliation: self.state.affiliation,
        type: self.state.type,
        phone: self.state.phone,
        email: self.state.email,
      }).then(response => {
        if (response.data.success === true) {
          self.props.history.push({
            pathname: '/user-login',
            state: {accountCreated: true}
          });
        } else {
          self.setState({
            backendError: true,
            backendErrorMessage: response.data.error,
          });
        }
      }).catch(error => {
        alert(error);
      });
    }
  

  getSnackBars() {
    if (this.state.backendError) {
      return(
        <Snackbar
          open={this.state.backendError}
          autoHideDuration={6000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          onClose={() => {this.setState({noMatch: false})}}
          >
          <Alert severity="warning">
            {this.state.backendErrorMessage}
          </Alert>
        </Snackbar>
      );
    }
  }

  updatePassword(newPassword) {
    this.setState({password: newPassword});
    let helperText = '';
    if (newPassword === '') helperText = 'Please enter a password.';
    else if (!this.validatePassword(newPassword)) helperText = 'Please enter a password matching the criteria.';
    this.setState({passwordHelper: helperText});
  }

  render() {
    const { classes } = this.props;
    console.log("here");
    console.log(this.state);

    return (
      <div>
        <Typography className={classes.header} variant='h4'>Register an Account</Typography>
        <Typography className={classes.subheader} variant='subtitle2'>Please note that passwords must be more than eight characters and include <br/> an uppercase letter, a lowercase letter, a number, and a special character.</Typography>
        <TextField
          className = {classes.left}
          label = "First Name"
          onChange={event => {this.setState({firstName: event.target.value})}}
          error = {this.state.firstName === '' && this.state.submitted}
          helperText = {this.state.firstName === '' && this.state.submitted ? "Please enter a first name.": ""}
        />
        <TextField
          className = {classes.right}
          label = "Last Name"
          onChange={event => {this.setState({lastName: event.target.value})}}
          error = {this.state.lastName === "" && this.state.submitted}
          helperText = {this.state.lastName === '' && this.state.submitted ? "Please enter a last name." : ""}
        />
        <TextField
          className = {classes.left}
          label = "Username"
          onChange={event => {this.setState({username: event.target.value})}}
          error = {this.state.username === "" && this.state.submitted}
          helperText = {this.state.username === '' && this.state.submitted ? "Please enter a username." : ""}
        />

        <TextField
          className = {classes.right}
          label = "Password"
          onChange={event => {this.updatePassword(event.target.value)}}
          type = {this.state.showPassword ? 'text' : 'password'}
          error = {((this.state.password === "" | !this.validatePassword(this.state.password)) && this.state.submitted)}
          helperText = {this.state.passwordHelper}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => this.setState({showPassword: !this.state.showPassword})}
                >
                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <FormControl
          className={classes.left}
          error = {this.state.type === "" && this.state.submitted}
          >
          <InputLabel>User Type</InputLabel>
          <Select
            value={this.state.type}
            onChange={event => {this.setState({type: event.target.value})}}
            >
            <MenuItem value={"Tester"}>Tester</MenuItem>
            <MenuItem value={"Integrator"}>Integrator</MenuItem>
          </Select>
          <FormHelperText>{this.state.type === '' && this.state.submitted ? "Please enter your user type." : ""}</FormHelperText>
        </FormControl>

        <FormControl
          className={classes.right}
          error = {this.state.affiliation === "" &&  this.state.submitted}
          >
          <InputLabel>Affiliation</InputLabel>
          <Select
            value={this.state.affiliation}
            onChange={event => {this.setState({affiliation: event.target.value})}}
            >
            {this.state.integrators.map(function(integrator) {
              console.log("INTEGRATORS");
              console.log(integrator);
              return <MenuItem value={integrator}>{integrator}</MenuItem>
            })}
          </Select>
          <FormHelperText>{this.state.affiliation === "" && this.state.submitted ? "Please enter your affiliation." : ""}</FormHelperText>
        </FormControl>

        <TextField
          className = {classes.left}
          label = "Phone"
          onChange={event => {this.setState({phone: event.target.value})}}
          error = {this.state.phone === "" && this.state.submitted}
          helperText = {this.state.phone  === "" && this.state.submitted ? "Please enter your primary phone number." : ""}
        />
        <TextField
          className = {classes.right}
          label = "Email"
          onChange={event => {this.setState({email: event.target.value})}}
          error = {this.state.email === "" && this.state.submitted}
          helperText = {this.state.email === "" && this.state.submitted ? "Please enter your primary email." : ""}
        />
        <Button className = {classes.submitButton} onClick={() => this.submitForm()}>Create Account</Button>

        {this.getSnackBars()}

      </div>
  );
  }
}

export default (withRouter(withStyles(useStyles)(RegistrationForm)));
