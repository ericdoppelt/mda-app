import React from 'react';
import axios from 'axios';
import {Snackbar, Table, TableBody, TableCell, TableRow, TextField, Typography} from '@material-ui/core';
import {Button} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import {Alert} from '@material-ui/lab';


  const useStyles = theme => ({
    table: {
     marginLeft: '25%',
     marginRight: '25%',
     marginBottom: '5%',
     marginTop: '5%',
     width: '50%',
   },
   subheader: {
     marginTop: '10px',
     marginBottom: '10px',
   },
  });

  const rows = [{key: 'oldPassword', value: 'Old Password', error: 'oldPasswordError', helper: 'oldPasswordHelper'},
                {key: 'newPassword', value: 'New Password', error: 'newPasswordError', helper: 'newPasswordHelper'},
                {key: 'confirmPassword', value: 'Confirm New Password', error: 'confirmPasswordError', helper: 'confirmPasswordHelper'}]

  class PasswordChanger extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',

        oldPasswordError: false,
        oldPasswordEmptyError: false,
        newPasswordError: false,
        newPasswordEmptyError: false,
        newPasswordInvalidError: false,
        confirmPasswordError: false,
        confirmPasswordEmptyError: false,
        confirmPasswordInvalidError: false,
        passwordMatchError: false,
        newPasswordHelper: '',
        confirmPasswordHelper: '',
        oldPasswordHelper: '',
        responseError: '',
        showPassword: true,

        submitSuccess: false,
      }
    }


  validatePassword(password) {
    let passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
    console.log(passwordRegex.test(password));
    return passwordRegex.test(password);
  }

  commitChange() {
    this.setState({
      oldPasswordEmptyError: (this.state.oldPassword === ""),
      newPasswordEmptyError: (this.state.newPassword === ""),
      confirmPasswordEmptyError:  (this.state.confirmPassword === ""),
      newPasswordInvalidError: (!this.validatePassword(this.state.newPassword)),
      confirmPasswordInvalidError: (!this.validatePassword(this.state.confirmPassword)),
      passwordMatchError: (!(this.state.newPassword === this.state.confirmPassword)),
    }, () => {
      if(this.state.oldPasswordEmptyError){
        this.setState({oldPasswordError: true, oldPasswordHelper: "Please enter your old password"});
      }
      if(this.state.newPasswordEmptyError||this.state.confirmPasswordEmptyError){
        if (this.state.newPasswordEmptyError) this.setState({newPasswordError: true, newPasswordHelper: "Please enter a new password"});
        if(this.state.confirmPasswordEmptyError) this.setState({confirmPasswordError:true, confirmPasswordHelper: "Please confirm password"});
      }
      else if(this.state.newPasswordInvalidError||this.state.confirmPasswordInvalidError){
       if (this.state.newPasswordInvalidError) this.setState({newPasswordError: true, newPasswordHelper: "Please enter a password matching the criteria"});
       if(this.state.confirmPasswordInvalidError) this.setState({confirmPasswordError: true, confirmPasswordHelper: "Please enter a password matching the criteria"});
     }
     else if (this.state.passwordMatchError) {this.setState({newPasswordError: true, confirmPasswordError: true, newPasswordHelper: "Passwords do not match", confirmPasswordHelper: "Passwords do not match"})}
     if (!(this.state.oldPasswordError||this.state.newPasswordError||this.state.confirmPasswordError)) {this.submit();}
    });
  }

  async submit() {
    let self = this;
    let url = 'https://mda-phoenix.herokuapp.com/user/change-password';
    await axios.post(url, {
      oldPassword: self.state.oldPassword,
      newPassword: self.state.newPassword,
    },{
      headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
    }).then(response => {
      if (response.data.success === true) {
        self.setState({responseError: '',
                       passwordError: false,
                       passwordEmptyError: false,
                       passwordInvalidError: false,
                       passwordHelper: '',
                       oldPasswordError: false,
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
                        oldPasswordError: true,
                        oldPasswordHelper: 'Old password is incorrect',});
      }
    }).catch(error => {
      console.log("error");
      console.log(error);
  });

  }

  getAlert() {
      if (this.state.submitSuccess) {
        return(
          <Snackbar
            open={this.state.submitSuccess}
            autoHideDuration={6000}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            onClose={() => {this.setState({submitSuccess: false})}}
            >
            <Alert severity="success">
              Changed Password
            </Alert>
          </Snackbar>
      );
      }
  }

  render () {
    const {classes} = this.props;
    return(
      <div>
      <Typography className={classes.subheader} variant='subtitle2'>Please note that passwords must be more than eight characters and include <br/> an uppercase letter, a lowercase letter, a number, and a special character.</Typography>
        <Table className={classes.table}>
          <TableBody>
          {rows.map((row) => (
            <TableRow key={row.value}>
              <TableCell><strong>{row.value}</strong></TableCell>
              <TableCell>
                <TextField
                value = {this.state[row.key]}
                onChange={event => {this.setState({[row.key]: event.target.value, [row.helper]: '', [row.error]: false,})}}
                type = {this.state.showPassword ? 'text' : 'password'}
                error = {this.state[row.error]}
                helperText = {this.state[row.helper]}
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
        <Button color="primary" variant={(this.state.newPassword==='' || this.state.confirmPassword===''|| this.state.oldPassword==='') ? 'outlined' : 'contained'} onClick={() => this.commitChange()}>
          Change Password
        </Button>
        <br/>
        <Button className={classes.subheader} onClick={() => {this.props.history.push('/forgot-password')}}>
          <br/><br/><small>Forgot Password?</small>
        </Button>
        {this.getAlert()}
      </div>
    )
  }
}
export default withRouter(withStyles(useStyles, { withTheme: true })(PasswordChanger));
