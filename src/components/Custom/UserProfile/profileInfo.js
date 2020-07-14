import React from 'react';
import axios from 'axios';
import {Box, Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import {FormControl, InputLabel, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, FormHelperText, TextField, Typography, Snackbar} from '@material-ui/core';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';
import Row from '../../../components/UIzard/Row';
import Stack from '../../../components/UIzard/Stack';

const useStyles = theme => ({
   table: {
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '10%',
    marginTop: '20%',
    width: '100%',
  },

});

const rows = [
  {key:'first_name', value:'First Name'},
  {key:'last_name', value:'Last Name'},
  {key:'affiliation', value:'Affiliation'},
  {key:'phone', value:'Phone Number'},
  {key:'email', value:'Email'}
];

class ProfileInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dialog: '',
      name: '',
      first_name: '',
      first_nameError: '',
      last_name: '',
      last_nameError: '',
      username: '',
      userType: '',
      phone: '',
      email: '',
      affiliation: '',

      submitError: '',
    }
  }

  async componentDidMount() {
    var self = this;

    let url = "https://mda-phoenix.herokuapp.com/user";
    await axios.post(url, null, {
      headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
      }).then(response => {
      //console.log(response);
      self.setState({
        name: response.data.first_name + " " + response.data.last_name,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        username: response.data.user,
        affiliation: response.data.affiliation,
        userType: response.data.user_type,
        phone: response.data.phone,
        email: response.data.email,
      });
      })
      .catch(error => {
        console.log("error");
        console.log(error);
    });
  }

  getInfoEditer() {
    return(
      <Dialog open={this.state.dialog === 'edit'} onClose={() => this.setState({dialog:''})}>
        <DialogTitle>Update profile information</DialogTitle>
          <DialogContent>
            <TextField
              label= "First Name"
              value = {this.state.first_name}
              onChange={event => {this.setState({first_name: event.target.value})}}
              error={this.state.first_nameError}
              type="TextField"
              />
            <TextField
              label= "Last Name"
              value = {this.state.last_name}
              onChange={event => {this.setState({last_name: event.target.value})}}
              error={this.state.last_nameError}
              type="TextField"
              />
            <TextField
              label= "Last Name"
              value = {this.state.last_name}
              onChange={event => {this.setState({last_name: event.target.value})}}
              error={this.state.last_nameError}
              type="TextField"
              />
            </DialogContent>
            <DialogActions>
              <Button color='secondary' variant='outlined' onClick={() => this.setState({dialog: ''})}>
                Cancel
              </Button>
              <Button variant='outlined' onClick={(event) => this.submit()}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        );
      }



    async submit() {
      let self = this;
      let url = 'https://mda-phoenix.herokuapp.com/integrator/profile';
      await axios.post(url, {
        first_name: self.state.first_name,
        last_name: self.state.last_name,
        email: self.state.email,
        phone: self.state.phone,
      }, {
        headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
      }).then(response => {
        if (response.data.success === true) {
          this.setState({
            submitError: false,
          });
        } else {
          this.setState({
            submitError: true,
          });
        }
      }).catch(error => {
        alert(error);
    });
    }


  getDialogue() {
      var returnedDialogue;
        switch(this.state.dialog) {
            case 'edit':
              returnedDialogue = this.getInfoEditer();
            break;
          default:
            returnedDialogue = null;
            break;
      }
    return returnedDialogue;
  }

  render() {
    const {classes} = this.props;
    return(
      <div>
        <Table className={classes.table}>
          <TableBody>
          {rows.map((row) => (
            <TableRow key={row.value}>
              <TableCell><strong>{row.value}</strong></TableCell>
              <TableCell>
                <TextField
                defaultValue = {this.state[row.key]}
                onChange={event => {this.setState({[row.value]: event.target.value})}}
                type="TextField"
                />
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
        <Button color="primary" variant='contained' onClick={(event) => this.submit()}>
          Update
        </Button>

        {this.getDialogue()}
      </div>

    )
  }

}

export default withStyles(useStyles, { withTheme: true })(ProfileInfo);
