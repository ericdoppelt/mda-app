import React from 'react';

import {TextField, Button, FormHelperText, FormControl, InputLabel, Select, MenuItem, Typography} from '@material-ui/core';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = theme => ({
  left: {
    marginTop: '2px',
    marginLeft: '5%',
    marginRight: '3%',
    width: '42%',
  },
  right: {
    marginTop: '2px',
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
  fullDiv: {
    width: '100%',
  }
});

class RegistrationForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
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

      integrators: [],
    }
  }

  async componentDidMount() {
    let url = 'https://mda-phoenix.herokuapp.com/integrator';
    await axios.get(url, {
      }).then(response => {
        this.state.integrators = response.data.integrators;
        })
        .catch(error => {
        alert(error);
  });
  }


  validatePassword(password) {
    let passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
    console.log(passwordRegex.test(password));
    return passwordRegex.test(password);
  }

  submitForm() {
    this.setState({
      firstNameError: (this.state.firstName === ""),
      lastNameError: (this.state.lastName === ""),
      usernameError: (this.state.username === ""),
      passwordEmptyError: (this.state.password === ""),
      passwordInvalidError: (!this.validatePassword(this.state.password)),
      affiliationError: (this.state.password === ""),
      typeError: (this.state.type === ""),
      phoneError: (this.state.phone === ""),
      emailError: (this.state.email === ""),
    }, () => {
      if (this.state.usernameError) this.setState({usernameHelper: "Please enter a username."});
      if (this.state.passwordEmptyError) this.setState({passwordHelper: "Please enter a password."});
      else if (this.state.passwordInvalidError) this.setState({passwordHelper: "Please enter a password matching the criteria."});
      else this.setState({passwordHelper: ""});
      this.postToAxios();
    });
  }

  async postToAxios() {
    let formIsValid = !this.state.firstNameError && !this.state.lastNameError && !this.state.usernameError && !this.state.passwordError
    && !this.affiliationError && !this.typeError && !this.phoneError && !this.emailError;
    console.log(this.state);
    if (formIsValid) {
      var self = this;
      await axios.post('https://mda-phoenix.herokuapp.com/register', {
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
          self.props.history.push('/user-login');
        } else {
          self.setState({userNameError: true});
          self.setState({userNameHelper: response.data.error});
        }
      }).catch(error => {
        alert(error);
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.header} variant='h4'>Register an Account</Typography>
        <Typography className={classes.subheader} variant='subtitle2'>Please note that passwords must be more than eight characters and include <br/> an uppercase letter, a lowercase letter, a number, and a special character.</Typography>
        <TextField
          className = {classes.left}
          label = "First Name"
          onChange={event => {this.setState({firstName: event.target.value})}}
          error = {this.state.firstNameError}
          helperText = {this.state.firstNameError ? "Please enter a first name.": ""}
        />
        <TextField
          className = {classes.right}
          label = "Last Name"
          onChange={event => {this.setState({lastName: event.target.value})}}
          error = {this.state.lastNameError}
          helperText = {this.state.lastNameError ? "Please enter a last name." : ""}
        />
        <TextField
          className = {classes.left}
          label = "Username"
          onChange={event => {this.setState({username: event.target.value})}}
          error = {this.state.usernameError}
          helperText = {this.state.usernameHelper}
        />

        <TextField
          className = {classes.right}
          label = "Password"
          onChange={event => {this.setState({password: event.target.value})}}
          type = {this.state.showPassword ? 'text' : 'password'}
          error = {(this.state.passwordEmptyError | this.passwordInvalidError)}
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
          error = {this.state.typeError}
          >
          <InputLabel>User Type</InputLabel>
          <Select
            value={this.state.type}
            onChange={event => {this.setState({type: event.target.value})}}
            >
            <MenuItem value={"Tester"}>Tester</MenuItem>
            <MenuItem value={"Integrator"}>Integrator</MenuItem>
          </Select>
          <FormHelperText>{this.state.typeError ? "Please enter your user type." : ""}</FormHelperText>
        </FormControl>

        <FormControl
          className={classes.right}
          error = {this.state.affiliationError}
          >
          <InputLabel>Affiliation</InputLabel>
          <Select
            value={this.state.affiliation}
            onChange={event => {this.setState({affiliation: event.target.value})}}
            >
            {this.state.integrators.map(function(integrator) {
              return <MenuItem value={integrator}>{integrator}</MenuItem>
            })}
          </Select>
          <FormHelperText>{this.state.affiliationError ? "Please enter your affiliation." : ""}</FormHelperText>
        </FormControl>

        <TextField
          className = {classes.left}
          label = "Phone"
          onChange={event => {this.setState({phone: event.target.value})}}
          error = {this.state.phoneError}
          helperText = {this.state.phoneError ? "Please enter your primary phone number." : ""}
        />
        <TextField
          className = {classes.right}
          label = "Email"
          onChange={event => {this.setState({email: event.target.value})}}
          error = {this.state.emailError}
          helperText = {this.state.emailError ? "Please enter your primary email." : ""}
        />
        <Button className = {classes.submitButton} onClick={() => this.submitForm()}>Create Account</Button>
      </div>
  );
  }
}

export default (withRouter(withStyles(useStyles)(RegistrationForm)));
