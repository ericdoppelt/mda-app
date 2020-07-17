import React from 'react';
import axios from 'axios';
import {Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, TextField, Typography} from '@material-ui/core';
import {Button, FormHelperText, FormControl, InputLabel, Select} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import {Alert, AlertTitle} from '@material-ui/lab';


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
   textfield: {
     marginTop: '5%',
     marginBottom: '5%',
   }
  });

class ForgotUsername extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        email: '',

        submitError: false,
        submitErrorHelper: '',
        submitSuccess: false,
      }
    }

    async submit() {
      let self = this;
      let url = 'https://mda-phoenix.herokuapp.com/user/forgot-username';
      await axios.post(url, {
        email: self.state.email,
      },{
        headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
      }).then(response => {
        console.log(response.data.success)
        if (response.data.success === true) {
          self.setState({submitError: false,
                         submitSuccess: true,
                         submitErrorHelper: '',
                       });

        }
        else{
          self.setState({ submitError: true,
                          submitSuccess: false,
                          submitErrorHelper: response.data.error,});
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              onClose={() => {this.setState({submitSuccess: false})}}
              >
              <Alert severity="success">
                Email Sent
              </Alert>
            </Snackbar>
        );
        }
        if (this.state.submitError) {
          return(
            <Snackbar
              open={this.state.submitError}
              autoHideDuration={6000}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              onClose={() => {this.setState({submitSuccess: false})}}
              >
              <Alert severity="warning">
                Invalid Email
              </Alert>
            </Snackbar>
        );
        }
    }


    render() {
      const {classes} = this.props;
      return (
        <div>
          <Typography className={classes.subheader} variant='subtitle2'>Please enter the email associated with your account<br/> We will email you the matching usename </Typography>
          <TextField
          className={classes.textfield}
          label="Email"
          variant="outlined"
          onChange={event => {this.setState({email: event.target.value})}}
          type = 'text'
          />
          <br/>
          <Button className={classes.textfield}  variant='contained' onClick={() => this.submit()}>
          Submit
          </Button>
          <br/>
          <Button className={classes.textfield} color='primary' onClick={() => this.props.history.push('/user-login')}>
            <small>Back To Login</small>
          </Button>
          <Button className={classes.textfield} color='primary' onClick={() => this.props.history.push('/user-registration')}>
            <small>Create New Account</small>
          </Button>
          {this.getAlert()}
        </div>
      )
    }






}

export default withRouter(withStyles(useStyles)(ForgotUsername));
