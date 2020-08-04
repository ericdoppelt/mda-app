import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import {Button, Divider, Grid, List, ListItem, ListItemText, Paper, Snackbar, Table, TableBody, TableCell, TableHead, TableRow,Typography} from '@material-ui/core';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import DvrRoundedIcon from '@material-ui/icons/DvrRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import MenuIcon from '@material-ui/icons/Menu';
import { Alert } from '@material-ui/lab';


const useStyles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: '5%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  list: {
    textAlign: 'center',
  },
  table: {
   marginLeft: '12.5%',
   marginRight: '25%',
   marginBottom: '5%',
   width: '75%',
  },
  row: {
   '&:nth-of-type(odd)': {
     backgroundColor: '#e0e0e0',
   },
   '&:nth-of-type(even)': {
     backgroundColor: '#bdbdbd',
   },
  },
});


class HomePage extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        integrator: window.sessionStorage.getItem('integrator_token'),
        integratorError: false,
      };
    }

    handleScheduler() {
      if(window.sessionStorage.getItem('integrator_token') === 'true' || window.sessionStorage.getItem('access_token')==null){
        window.sessionStorage.setItem('next_page', '/scheduler');
        this.props.history.push('/scheduler');
      }
      else{
        this.setState({integratorError: true});
      }
    }

    getAlert() {
      if (this.state.integratorError) {
        return(
          <Snackbar
            open={this.state.integratorError}
            autoHideDuration={6000}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            onClose={() => {this.setState({integratorError: false})}}
            >
            <Alert severity="warning">
              Must be an integrator to use scheduler
            </Alert>
          </Snackbar>
      );
      }
    }

  render() {
    const { classes } = this.props;
    console.log(`Integrator: ${window.sessionStorage.getItem('integrator_token')}`);
    console.log(this.state.integrator);
  return (
    <div className={classes.root}>
        <Typography variant='h4'>Welcome to Integrated Single Event Effects Utility</Typography>
        <br/><br/>
        <Table className={classes.table}>
          <TableHead>
            <TableRow style={{backgroundColor: '#fafafa',}}>
              <TableCell align='center' colSpan={2}><Typography variant="h6">Public Resources<Divider/></Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className={classes.row}>
              <TableCell align='center'>
                <Button onClick={() => {this.props.history.push('/calendar')}}>
                  <CalendarTodayRoundedIcon/>
                </Button>
                <br/>
                Calendar
              </TableCell>
              <TableCell align='center'>
                <Button onClick={() => {this.props.history.push('/facilities')}}>
                  <AccountBalanceRoundedIcon/>
                </Button>
                <br/>
                Facilities
              </TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell align='center'>
                <Typography>View scheduled tests for each facililty</Typography>
                </TableCell>
              <TableCell align='center'>
              <Typography>Compare facility capabilities <br/> Search for a facility by desired ion and energy</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Typography variant='h4'>User Features</Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow style={{backgroundColor: '#fafafa',}}>
              <TableCell align='center'><Typography variant="h6">Testers<Divider/></Typography></TableCell>
              <TableCell align='center'><Typography variant="h6">Integrators<Divider/></Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow style={{backgroundColor: '#e0e0e0',}}>
              <TableCell align='center'>
                <Button onClick={() => {this.props.history.push('/request-forms')}}>
                  <AssignmentRoundedIcon/>
                </Button>
                <br/>
                Request Forms
              </TableCell>
              <TableCell align='center'>
                <Button onClick={() => this.handleScheduler()}>
                  <ImportContactsIcon/>
                </Button>
                <br/>
                Scheduler
              </TableCell>
            </TableRow>
            <TableRow style={{backgroundColor: '#bdbdbd',}}>
              <TableCell align='center'>
                <Typography>Submit testing request forms</Typography>
                </TableCell>
              <TableCell align='center'>
              <Typography>Schedule approved tests within <br/> allotted time blocks</Typography>
              </TableCell>
            </TableRow>
            <TableRow style={{backgroundColor: '#e0e0e0',}}>
              <TableCell align='center'>
                <Button onClick={() => {this.props.history.push('/view-requests')}}>
                  <DvrRoundedIcon/>
                </Button>
                <br/>
                View Requests
              </TableCell>
              <TableCell align='center'>
                <Button onClick={() => {this.props.history.push('/view-requests')}}>
                  <DvrRoundedIcon/>
                </Button>
                <br/>
                View Requests
              </TableCell>
            </TableRow>
            <TableRow style={{backgroundColor: '#bdbdbd',}}>
              <TableCell align='center'>
                <Typography>View your submitted requests</Typography>
                </TableCell>
              <TableCell align='center'>
              <Typography>View and approve/reject requests <br/> submitted by your testers</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {this.getAlert()}
    </div>
    );
  }
}

export default withRouter(withStyles(useStyles, { withTheme: true })(HomePage));
