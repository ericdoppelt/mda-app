import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemSecondaryAction, ListItemText} from '@material-ui/core/';
import axios from 'axios';
import {Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Typography, Paper} from '@material-ui/core';
import Row from '../../UIzard/Row';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import CancelPresentationTwoToneIcon from '@material-ui/icons/CancelPresentationTwoTone';

const useStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  table: {
    width: '75%',
    align: 'center',
    marginTop: '5%',
  },
  header: {
    marginTop: '5%',
    marginBottom: '1%',
  },

});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#424242',
    color: theme.palette.common.white,
    marginBottom: '5%',
  },
  body: {
    fontSize: 14,
    marginBottom: '5%',
  },

}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


class AuthenticateUser extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      accounts: [],
      dialog: '',
      selected: {},

      loadError: false,
      submitError: false,
      deleteError: false,
    }
  }

  async componentDidMount() {
    var self = this;
    let url = 'https://mda-phoenix.herokuapp.com/user/authenticate-user';
    await axios.get(url, {
      headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
      }).then(response => {
      console.log(response.data);
      self.setState({
          accounts: response.data.results,
          loadError: false,
        });
      if(response.data.success===false){
        self.setState({
          loadError: true,
        });
      }
      }).catch(error => {
        console.log("error");
        console.log(error);
    });
  }

    async submit() {
        let self = this;
        let url = 'https://mda-phoenix.herokuapp.com/user/authenticate-user';
        await axios.post(url, {
            username: self.state.selected['username'],
        }, {
          headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
        }).then(response => {
          if (response.data.success === true) {
            console.log(response.data);
            this.setState({
              dialog: '',
              accounts: response.data['results'],
              submitError: false,
            });
          }
          else{
            this.setState({
              submitError: true,
            });
          }
        }).catch(error => {
          alert(error);
      });
    }

    async deleteAccount() {
      let self = this;
      let url = `https://mda-phoenix.herokuapp.com/user/deleteuser/${self.state.selected['username']}`;
      await axios.delete(url).then(response => {
        if (response.data.success === true) {
          console.log(response.data);
          this.setState({
            deleteError: false
          });
        }
        else{
          this.setState({
            deleteError: true,
          });
        }
      }).catch(error => {
        alert(error);
    });
    }


  getAuthenticatePicker() {
    let {classes} = this.props;
    return(
        <Dialog open={this.state.dialog === 'authenticate'} onClose={() => this.setState({dialog: ''})}>
          <DialogTitle>Are you sure you want to authenticate this account?</DialogTitle>
          <DialogActions>
            <Button color='secondary' variant="outlined" onClick={() => this.setState({dialog: ''})}>
              No
            </Button>
            <Button color='primary' variant="outlined" onClick={() => this.submit()}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
    );
  }

  getDeletePicker() {
    let {classes} = this.props;
    return(
        <Dialog open={this.state.dialog === 'delete'} onClose={() => this.setState({dialog: ''})}>
          <DialogTitle>Are you sure you want to delete this account?</DialogTitle>
          <DialogActions>
            <Button color='secondary' variant="outlined" onClick={() => this.setState({dialog: ''})}>
              No
            </Button>
            <Button color='primary' variant="outlined" onClick={() => this.deleteAccount()}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
    );
  }

  getViewPicker() {
    let {classes} = this.props;
    return(
        <Dialog open={this.state.dialog === 'view'} onClose={() => this.setState({dialog: ''})}>
          <DialogTitle>Pending Account Information</DialogTitle>
          <DialogContent>
            <List>
              <ListItem>
                <ListItemText primary={`First Name: ${this.state.selected.first_name}`}/>
              </ListItem>
              <ListItem>
                <ListItemText primary={`Last Name: ${this.state.selected.last_name}`}/>
              </ListItem>
              <ListItem>
                <ListItemText primary={`Affiliation: ${this.state.selected.affiliation}`}/>
              </ListItem>
              <ListItem>
                <ListItemText primary={`User Type: ${this.state.selected.user_type}`}/>
              </ListItem>
              <ListItem>
                <ListItemText primary={`Phone Number: ${this.state.selected.phone}`}/>
              </ListItem>
              <ListItem>
                <ListItemText primary={`Email: ${this.state.selected.email}`}/>
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button color='secondary' variant="outlined" onClick={() => this.setState({dialog: ''})}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
    );
  }

  getDialogue() {
      var returnedDialogue;
      switch(this.state.dialog) {
          case 'authenticate':
            returnedDialogue = this.getAuthenticatePicker();
            break;
          case 'delete':
            returnedDialogue = this.getDeletePicker();
            break;
          case 'view':
            returnedDialogue = this.getViewPicker();
            break;
          default:
            returnedDialogue = null;
            break;
      }
    return returnedDialogue;
  }

  render() {
    const {classes} = this.props;
    console.log(this.state.accounts);
  return (
    <div>
    <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
      <TableContainer className={classes.table} component={Paper}>
        <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center' colSpan={4}>
              <Typography variant='h5'>Pending Accounts</Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
          <TableBody>
          {this.state.accounts.map((account) => (
            <StyledTableRow key={account.first_name}>
              <StyledTableCell width="100%" align='center' component="th" scope="row">
                {`${account.first_name} ${account.last_name}`}
              </StyledTableCell>
              <StyledTableCell size="small" align="right">
                <Button variant="contained" onClick={() => {this.setState({dialog: 'view', selected: account})}}>
                  View
                </Button>
              </StyledTableCell>
              <StyledTableCell size="small" align="right">
                <CheckCircleTwoToneIcon color="primary" onClick={() => {this.setState({dialog:'authenticate', selected:account})}}/>
              </StyledTableCell>
              <StyledTableCell size="small" align="right">
                <CancelPresentationTwoToneIcon color="secondary" onClick={() => {this.setState({dialog:'delete', selected:account})}}/>
              </StyledTableCell>
            </StyledTableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Row>
    {this.getDialogue()}
    </div>
    );
  }
}
export default withStyles(useStyles)(AuthenticateUser);
