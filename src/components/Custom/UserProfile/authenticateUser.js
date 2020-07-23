import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemSecondaryAction, ListItemText} from '@material-ui/core/';
import axios from 'axios';

const useStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class AuthenticateUser extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      accounts: [],
      dialog: '',
      selected: {},

      loadError: false,
    }
  }

  async componentDidMount() {
    var self = this;
    let url = 'https://mda-phoenix.herokuapp.com/authenticate-user';
    await axios.get(url, {
      headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
      }).then(response => {
      console.log(response.data);
      if (response.data.success === true) {
        self.setState({
          accounts: response.data.results,
          loadError: false,
        });
      }
      else{
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
              accounts: response.data.results,
              loadError: false,
            });
          }
          else{
            this.setState({
              loadError: true,
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
          <DialogTitle>Are you sure you want to delete this account?</DialogTitle>
          <DialogContent>
            <List>
              <ListItem>
                <ListItemText primary={`First Name: ${this.selected.first_name}`}/>
              </ListItem>
              <ListItem>
                <ListItemText primary={`Last Name: ${this.selected.last_name}`}/>
              </ListItem>
              <ListItem>
                <ListItemText primary={`Phone Number: ${this.selected.phone}`}/>
              </ListItem>
              <ListItem>
                <ListItemText primary={`Email: ${this.selected.email}`}/>
              </ListItem>
            </List>
          </DialogContent>
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
  return (
    <div>
    <List dense className={classes.root}>
      {this.state.accounts.map((account) => {
        return (
          <ListItem key={account.first_name} button>
            <ListItemText primary={`${account.first_name} ${account.last_name}`} />
            <ListItemSecondaryAction>
              <Button onClick={() => {this.setState({dialog: 'view', selected: {account}})}}>
                View
              </Button>
              <Button onClick={() => {this.setState({dialog:'autheticate', selected:{account}})}}>
              Authenticate
              </Button>
              <Button onClick={() => {this.setState({dialog:'delete', selected:{account}})}}>
              Delete
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
    {this.getDialogue()};
    </div>
    );
  }
}
export default withStyles(useStyles)(AuthenticateUser);
