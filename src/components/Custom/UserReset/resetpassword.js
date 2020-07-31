import { Button, IconButton, InputAdornment, Snackbar, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';

/*Define class themes */
  const useStyles = theme => ({
    table: {
     marginLeft: '15%',
     marginRight: '15%',
     marginBottom: '5%',
     marginTop: '5%',
     width: '0%',
   },
   subheader: {
     marginTop: '10px',
     marginBottom: '10px',
     marginLeft: '12%',
     width: '75%',
   },
  });


/*Outline rows for table*/
  //Key is the state variable changed from the TextField
  //Value is the text displayed
  //Helper determines the error message variable to display
  const rows = [{key: 'newPassword', value: 'New Password', helper: 'passwordHelper'},
                {key: 'confirmPassword', value: 'Confirm New Password', helper: 'passwordHelper'}]

//Generate Class
  class ResetPassword extends React.Component {


    constructor(props) {
      super(props);
      //State variables
      this.state = {
        newPassword: '',
        confirmPassword: '',

        passwordError: false,
        passwordEmptyError: false,
        passwordInvalidError: false,
        passwordMatchError: false,
        passwordHelper: '',
        responseError: '',
        showPassword: true,

        submitSuccess: false,
        submitFailure: false,
      }
    }

  //Ensure entered password has at least 8 characters, including 1 uppercase, 1 lowercase, and 1 special character
  validatePassword(password) {
    let passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
    console.log(passwordRegex.test(password));
    return passwordRegex.test(password);
  }

  //Upon pressing change password, check for errors. If none, submit to the backend. If so, display error
  commitChange() {
    this.setState({
      passwordEmptyError: ((this.state.newPassword && this.state.confirmPassword) === ""),
      passwordInvalidError: (!this.validatePassword(this.state.newPassword)),
      passwordMatchError: (!(this.state.newPassword === this.state.confirmPassword))
    }, () => {
      if (this.state.passwordEmptyError) this.setState({passwordHelper: "Please enter a new password."});
      else if (this.state.passwordInvalidError) this.setState({passwordHelper: "Please enter a password matching the criteria."});
      else if (this.state.passwordMatchError) this.setState({passwordHelper: "Passwords do not match"})
      else this.submit();
    });
  }

  /*Submits password change to database*/
  //Includes newPassword state variable and JWT
  //Updates state variables, including errors in response
  async submit() {
    let self = this;
    let url = 'https://mda-phoenix.herokuapp.com/user/reset-password';
    await axios.post(url, {
      password: self.state.newPassword,
    },{
      headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
    }).then(response => {
      if (response.data.success === true) {
        self.setState({responseError: '',
                       passwordError: false,
                       passwordEmptyError: false,
                       passwordInvalidError: false,
                       passwordHelper: '',
                       oldPasswordHelper: '',
                       oldPassword: '',
                       newPassword: '',
                       confirmPassword: '',
                       submitSuccess: true,
                     });
        console.log(response.data.success);
      }
      else{
        self.setState({ responseError: response.data.error,
                        passwordError: true,
                        submitSuccess: false,
                        submitFailure: true,
                        passwordHelper: 'Failed to reset password',});
      }
    }).catch(error => {
      console.log("error");
      console.log(error);
  });

  }

  //Displays alert based on submit success/failure state variables
  getAlert() {
      if (this.state.submitSuccess) {
        return(
          <Snackbar
            open={this.state.submitSuccess}
            autoHideDuration={6000}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            onClose={() => {this.setState({submitSuccess: false})}}
            >
            <Alert severity="success">
              Changed Password
            </Alert>
          </Snackbar>
      );
    }
      else {
        return(
          <Snackbar
            open={this.state.submitFailure}
            autoHideDuration={6000}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            onClose={() => {this.setState({submitFailure: false})}}
            >
            <Alert severity='error'>
              Failed to change password
            </Alert>
          </Snackbar>
        )
      }
  }

  //This is what displays when page is rendered
  render () {
    const {classes} = this.props;
    return(
      <div>
      <Typography className={classes.subheader} variant='subtitle2'>Please note that passwords must be more than eight characters and include an uppercase letter, a lowercase letter, a number, and a special character.</Typography>
        <Table className={classes.table}>
          <TableBody>
          {rows.map((row) => (
            <TableRow key={row.value}>
              <TableCell><strong>{row.value}</strong></TableCell>
              <TableCell>
                <TextField
                value = {this.state[row.key]}
                onChange={event => {this.setState({[row.key]: event.target.value})}} //Updates corresponsing state variable when TextField is updated
                type = {this.state.showPassword ? 'text' : 'password'}
                error = {this.state.passwordError}
                helperText = {this.state[row.helper]}
                //Changes visibility of text
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
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
        <Button color="primary" variant={(this.state.newPassword==='' || this.state.confirmPassword==='') ? 'outlined' : 'contained'} onClick={() => this.commitChange()}>
          Change Password
        </Button>
        <br/>
        <Button onClick={() => {this.props.history.push('/user-login')}}>
          <br/><br/><small>Back To Login</small>
        </Button>
        {this.getAlert()}
      </div>
    )
  }
}
export default withRouter(withStyles(useStyles, { withTheme: true })(ResetPassword));
