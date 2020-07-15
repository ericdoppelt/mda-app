import React from 'react';
import axios from 'axios';
import {Box, Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import {FormControl, InputLabel, List, ListItem, ListItemText, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, FormHelperText, TextField, Typography, Snackbar} from '@material-ui/core';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';
import Row from '../../../components/UIzard/Row';
import Stack from '../../../components/UIzard/Stack';

const useStyles = theme => ({
   table: {
    marginLeft: '25%',
    marginRight: '25%',
    marginBottom: '5%',
    marginTop: '5%',
    width: '50%',
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
});

const rows = [
  {key:'first_name', value:'First Name', class:'left'},
  {key:'last_name', value:'Last Name', class:'right'},
  {key:'affiliation', value:'Affiliation',class:'left'},
  {key:'phone', value:'Phone Number',class:'right'},
  {key:'email', value:'Email',class:''}
];

class ProfileInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dialog: '',
      name: '',
      first_name: 'Mike',
      first_nameError: '',
      last_name: 'McKenna',
      last_nameError: '',
      username: '',
      userType: '',
      phone: '1234567890',
      email: 'Mike@mda.mil',
      affiliation: 'MDA',

      submitError: '',
    }
  }

  async componentDidMount() {
    var self = this;
    let url = 'https://mda-phoenix.herokuapp.com/user';
    await axios.get(url, {
      headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
      }).then(response => {
      console.log(response.data.first_name);
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
      })
      .catch(error => {
        console.log("error");
        console.log(error);
    });

  }

    async submit() {
        let self = this;
        let url = 'https://mda-phoenix.herokuapp.com/user';
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
            this.setState({
              dialog: '',
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
      </div>
    )
  }
}
export default withStyles(useStyles, { withTheme: true })(ProfileInfo);
