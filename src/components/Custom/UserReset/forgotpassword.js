import React from 'react';
import axios from 'axios';
import {Snackbar, TextField, Typography} from '@material-ui/core';
import {Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import {Alert} from '@material-ui/lab';

  /*Define class themes */
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
//Generate class
class ForgotPassword extends React.Component {

    constructor(props) {
      super(props);
      //Define state variables
      this.state = {
        username: '',

        submitError: false,
        submitErrorHelper: '',
        submitSuccess: false,
      }
    }

    /*Submits forgot password request to database*/
    //Includes username state variable and JWT
    //Updates state variables, including errors in response
    async submit() {
      let self = this;
      let url = 'https://vcm-17934.vm.duke.edu/api/user/forgot-password';
      await axios.post(url, {
        username: self.state.username,
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

    //Displays alert based on submit success/failure state variables
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
                vertical: 'top',
                horizontal: 'center',
              }}
              onClose={() => {this.setState({submitSuccess: false})}}
              >
              <Alert severity="warning">
                Invalid Username
              </Alert>
            </Snackbar>
        );
        }
    }

    //This is what displays when page is rendered
    render() {
      const {classes} = this.props; //Allows access to class styles defined above
      return (
        <div>
          <Typography className={classes.subheader} variant='subtitle2'>Please enter your username<br/> We will email you a temporary password</Typography>
          <TextField
          className={classes.textfield}
          label="Username"
          variant="outlined"
          onChange={event => {this.setState({username: event.target.value})}}
          type = 'text'
          />
          <br/>
          <Button className={classes.textfield}  variant='contained' onClick={() => this.submit()}>
          Reset Password
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
export default withRouter(withStyles(useStyles)(ForgotPassword));
