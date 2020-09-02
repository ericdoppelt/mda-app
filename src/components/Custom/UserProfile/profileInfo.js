import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableRow, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React from 'react';

const useStyles = theme => ({
   table: {
    marginLeft: '35%',
    marginRight: '25%',
    marginBottom: '5%',
    marginTop: '5%',
    width: '50%',
    display: 'flex',

  },
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
  dialog: {
    marginLeft: '3%',
    marginRight: '5%',
    marginBottom: '10px',
    width: '90%',
  }
});

const rows = [
  {key:'first_name', value:'First Name', class:'left', type:'text'},
  {key:'last_name', value:'Last Name', class:'right', type:'text'},
  {key:'phone', value:'Phone Number',class:'right', type:'tel'},
  {key:'email', value:'Email',class:'left', type: 'email'},
  {key:'userType', value: 'User Type', class: 'right', type:'text'},
  {key:'affiliation', value:'Affiliation',class:'left', type:'text'},
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

      integrators: [],
    }
  }

  async componentDidMount() {
    var self = this;
    let url = 'https://vcm-15941.vm.duke.edu/api/user';
    await axios.get(url, {
      headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
      }).then(response => {
      console.log(response.data);
      self.setState({
        name: response.data.first_name + " " + response.data.last_name,
        last_name: response.data.last_name,
        first_name: response.data.first_name,
        username: response.data.user,
        affiliation: response.data.affiliation,
        userType: response.data.user_type,
        phone: response.data.phone,
        email: response.data.email,
      });
      }).catch(error => {
        console.log("error");
        console.log(error);
    });

  }

    async submit() {
        let self = this;
        let url = 'https://vcm-15941.vm.duke.edu/api/user/modify';
        await axios.post(url, {
          first_name: self.state.first_name,
          last_name: self.state.last_name,
          email: self.state.email,
          phone: self.state.phone,
          affiliation: self.state.affiliation
        }, {
          headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
        }).then(response => {
          if (response.data.success === true) {
            console.log(response.data);
            this.setState({
              dialog: '',
            });
          }
        }).catch(error => {
          alert(error);
      });
    }

    getFirst_NamePicker() {
      let {classes} = this.props;
      return(
          <Dialog fullWidth="true" maxWidth="xs" open={this.state.dialog === 'first_name'} onClose={() => this.setState({dialog: ''})}>
            <DialogTitle align="center">Please update your first name</DialogTitle>
            <DialogContent>
              <TextField
                className={classes.dialog}
                label = "First Name"
                value = {this.state.first_name}
                onChange={event => {this.setState({first_name: event.target.value})}}
                type="TextField"
              />
            </DialogContent>

            <DialogActions>
              <Button color='secondary' variant="outlined" onClick={() => this.setState({dialog: ''})}>
                Cancel
              </Button>
              <Button color='primary' variant="outlined" onClick={() => this.submit()}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
      );
    }

    getLast_NamePicker() {
      let {classes} = this.props;
      return(
          <Dialog fullWidth="true" maxWidth="xs" open={this.state.dialog === 'last_name'} onClose={() => this.setState({dialog: ''})}>
            <DialogTitle align="center">Please update your last name</DialogTitle>
            <DialogContent>
              <TextField
                className={classes.dialog}
                label = "Last Name"
                value = {this.state.last_name}
                onChange={event => {this.setState({last_name: event.target.value})}}
                type="TextField"
              />
            </DialogContent>

            <DialogActions>
              <Button color='secondary' variant="outlined" onClick={() => this.setState({dialog: ''})}>
                Cancel
              </Button>
              <Button color='primary' variant="outlined" onClick={() => this.submit()}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
      );
    }

    getEmailPicker() {
      let {classes} = this.props;
      return(
          <Dialog fullWidth="true" maxWidth="xs" open={this.state.dialog === 'email'} onClose={() => this.setState({dialog: ''})}>
            <DialogTitle align="center">Please update your email</DialogTitle>
            <DialogContent>
              <TextField
                className={classes.dialog}
                label = "Email"
                value = {this.state.email}
                onChange={event => {this.setState({email: event.target.value})}}
                type="TextField"
              />
            </DialogContent>

            <DialogActions>
              <Button color='secondary' variant="outlined" onClick={() => this.setState({dialog: ''})}>
                Cancel
              </Button>
              <Button color='primary' variant="outlined" onClick={() => this.submit()}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
      );
    }
    getPhonePicker() {
      let {classes} = this.props;
      return(
          <Dialog fullWidth="true" maxWidth="xs" open={this.state.dialog === 'phone'} onClose={() => this.setState({dialog: ''})}>
            <DialogTitle align="center">Please update your phone number</DialogTitle>
            <DialogContent>
              <TextField
                className={classes.dialog}
                label = "Phone Number"
                value = {this.state.phone}
                onChange={event => {this.setState({phone: event.target.value})}}
                type="TextField"
              />
            </DialogContent>

            <DialogActions>
              <Button color='secondary' variant="outlined" onClick={() => this.setState({dialog: ''})}>
                Cancel
              </Button>
              <Button color='primary' variant="outlined" onClick={() => this.submit()}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
      );
    }

    getUserTypePicker() {
      let {classes} = this.props;
      return(
          <Dialog fullWidth="true" maxWidth="sm" open={this.state.dialog === 'userType'} onClose={() => this.setState({dialog: ''})}>
            <DialogTitle align="center">You must make a new account to change user type</DialogTitle>

            <DialogActions>
              <Button color='secondary' variant="outlined" onClick={() => this.setState({dialog: ''})}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
      );
    }

    getAffiliationPicker() {
      let {classes} = this.props;
      return(
        <Dialog fullWidth="true" maxWidth="sm" open={this.state.dialog === 'affiliation'} onClose={() => this.setState({dialog: ''})}>
        <DialogTitle align="center">You must make a new account to change your affiliation</DialogTitle>
        <DialogActions>
            <Button color='secondary' variant="outlined" onClick={() => this.setState({dialog: ''})}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
    getDialogue() {
        var returnedDialogue;
        switch(this.state.dialog) {
            case 'first_name':
              returnedDialogue = this.getFirst_NamePicker();
              break;
            case 'last_name':
              returnedDialogue = this.getLast_NamePicker();
              break;
            case 'email':
              returnedDialogue = this.getEmailPicker();
              break;
            case 'phone':
              returnedDialogue = this.getPhonePicker();
              break;
            case 'affiliation':
              returnedDialogue = this.getAffiliationPicker();
              break;
            case 'userType':
              returnedDialogue = this.getUserTypePicker();
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
                variant="outlined"
                fullWidth='true'
                value = {this.state[row.key]}
                onClick={event => {this.setState({dialog: row.key})}}
                type={row.type}
                />
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
        {this.getDialogue()}

      </div>


    )
  }
}
export default withStyles(useStyles, { withTheme: true })(ProfileInfo);
