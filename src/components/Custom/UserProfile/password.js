import React from 'react';
import axios from 'axios';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, TextField, Typography} from '@material-ui/core';
import {Button, FormHelperText, FormControl, InputLabel, Select} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';

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

  const rows = [{key: 'oldPassword', value: 'Old Password', helper: 'oldPasswordHelper'},
                {key: 'newPassword', value: 'New Password', helper: 'passwordHelper'},
                {key: 'confirmPassword', value: 'Confirm New Password', helper: 'passwordHelper'}]

  class PasswordChanger extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',

        passwordError: false,
        passwordEmptyError: false,
        passwordInvalidError: false,
        passwordMatchError: false,
        passwordHelper: '',
        oldPasswordError: false,
        oldPasswordHelper: '',
        responseError: '',
        showPassword: true,
      }
    }


  validatePassword(password) {
    let passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
    console.log(passwordRegex.test(password));
    return passwordRegex.test(password);
  }

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
                     });
        console.log(response.data.success);
      }
      else{
        self.setState({ responseError: response.data.error,
                        oldPasswordEror: true,
                        oldPasswordHelper: 'Old password is incorrect',});
      }
    }).catch(error => {
      console.log("error");
      console.log(error);
  });

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
                onChange={event => {this.setState({[row.key]: event.target.value})}}
                type = {this.state.showPassword ? 'text' : 'password'}
                error = {this.state.passwordError}
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
        <Button color="primary" variant='contained'onClick={() => this.commitChange()}>
          Submit
        </Button>
      </div>
    )
  }
}
export default withStyles(useStyles, { withTheme: true })(PasswordChanger);
