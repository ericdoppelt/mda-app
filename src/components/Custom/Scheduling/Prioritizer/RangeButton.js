import React from 'react';
import axios from 'axios';
import {Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import {FormControl, InputLabel, Select, MenuItem, FormHelperText, TextField, Snackbar} from '@material-ui/core';
import InfiniteCalendar from 'react-infinite-calendar';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';


const useStyles = theme => ({
  facilities: {
    marginLeft: '5%',
    marginRight: '3%',
    marginBottom: '10px',
    width: '42%',
  },
  hours: {
    marginLeft: '3%',
    marginRight: '5%',
    marginBottom: '10px',
    width: '42%',
  },
});

class RangeButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        dialog: '',

        startDate: '',
        startDateError: false,

        startTime: '',
        startTimeError: false,

        facility: '',
        facilityError: false,
        facilityHelper: '',

        hours: '',
        hoursError: false,
        hoursHelper: '',

        submitSuccess: false,
        submitError: false,
        facilities: [],
    }
  }


  async componentDidMount() {
    let url = 'https://vcm-17934.vm.duke.edu/api/facility';
    await axios.get(url).then(response => {
      this.setState({facilities: response.data.entries});
    }).catch(error => {
      alert(error);
  });
  }

  getInfoPicker() {
    let {classes} = this.props;
    return(
      
        <Dialog open={this.state.dialog === 'info'} onClose={() => this.setState({dialog: ''})}>
          <DialogTitle>Please enter the following information for the range.</DialogTitle>
          <DialogContent>
            <FormControl 
              className = {classes.facilities}
              error = {this.state.facilityError}
            > 
              <InputLabel>Facility</InputLabel>
              <Select
                value={this.state.facility}
                onChange={event => {this.setState({facility: event.target.value})}}
              >
              {this.state.facilities.map(function(facility) {
                return <MenuItem value={facility.abbreviation}>{facility.abbreviation}</MenuItem>
              })}
              </Select>
              <FormHelperText>{this.state.facilityHelper}</FormHelperText>
            </FormControl>

            <TextField 
              className={classes.hours}
              label = "Total Hours"
              value = {this.state.hours}
              onChange={event => {this.setState({hours: event.target.value})}}
              error = {this.state.hoursError}
              helperText = {this.state.hoursHelper}
              type="number"
            />
          </DialogContent>

          <DialogActions>
            <Button color='secondary' variant="outlined" onClick={() => this.setState({dialog: ''})}>
              Close
            </Button>
            <Button color='primary' variant="outlined" onClick={() => this.moveToDatePicker()}>
              Select Total Hours
            </Button>
          </DialogActions>
          
        </Dialog>
    );
  }
  
  moveToDatePicker() {
    let facilityEmpty = (this.state.facility === '');
    let facilityHelper = (facilityEmpty) ? "Please enter a positive number for total hours." : "";
    let hoursEmpty = (this.state.hours === '');
    let hoursZero = (this.state.hours === 0);
    let hoursHelper = (hoursEmpty || hoursZero) ? "Please enter a positive number for total hours." : "";
    
      this.setState({
        facilityError: facilityEmpty,
        facilityHelper: facilityHelper,

        hoursError: (hoursEmpty || hoursZero),
        hoursHelper: hoursHelper,
      }, () => {
        if (!this.state.facilityError && !this.state.hoursError) {
          this.setState({dialog: 'date'});
        }
      });
    } 
    
  
  
  getDatePicker() {
      return(
        <Dialog open={this.state.dialog === 'date'} onClose={() => this.setState({dialog: ''})}>
          <DialogTitle>Please enter a desired start date.</DialogTitle>
          <DialogContent>
            <InfiniteCalendar
              selected={this.state.startDate}
              onSelect={(event) => {this.setState({startDate: event})}}
              minDate={new Date()}
              min={new Date()}
            />
          </DialogContent>
          <DialogActions>
            <Button color='secondary' variant="outlined" onClick={() => this.setState({dialog: ''})}>
              Close
            </Button>
            <Button variant="outlined" onClick={() => this.setState({dialog: 'info'})}>
              Back
            </Button>
            <Button color='primary' variant="outlined" onClick={() => this.moveToTimePicker()}>
              Select Start Time
            </Button>
          </DialogActions>
        </Dialog>

      );
  }

  moveToTimePicker() {
    if (this.state.startDate !== '') {
      this.setState({
        dialog: 'time',
        startDateError: false,
      });
    } else {
      this.setState({startDateError: true});
    }
  }

  getTimePicker() {
      return(
        <Dialog open={this.state.dialog === 'time'} onClose={() => this.setState({dialog: ''})}>
          <DialogTitle>Please enter the start date.</DialogTitle>
          <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>

            <TimePicker
              variant="static"
              openTo="hours"
              value={this.state.startTime}
              onChange={(event) => this.setState({startTime: event})}
              views = {["hours"]}
            />
          </MuiPickersUtilsProvider>

          </DialogContent>

          <DialogActions>
          <Button color='secondary' variant="outlined" onClick={() => this.setState({dialog: ''})}>
            Close
          </Button>
          <Button variant="outlined" onClick={() => this.setState({dialog: 'date'})}>
            Back
          </Button>
          <Button color='primary' variant="outlined" onClick={() => this.moveToSubmit()}>
            Submit Range
          </Button>
          </DialogActions>
          
        </Dialog>
      );
  }

  moveToSubmit() {
    if (this.state.startTime !== '') {
      this.setState({
        dialog: '',
        startTimeError: false,
      });
      this.submit();
    } else {
      this.setState({startTimeError: true});
    }
  }

  async submit() {
      let self = this;
      let url = 'https://vcm-17934.vm.duke.edu/api/integrator/set-range';
      await axios.post(url, {
        startDate: self.state.startDate,
        startTime: self.state.startTime,
        facility: self.state.facility,
        hours: self.state.hours,
      }, {
        headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
      }).then(response => {
        if (response.data.success === true) {
          this.setState({
            dialog: '',

            startDate: '',
            startDateError: false,

            startTime: '',
            startTimeError: false,

            facility: '',
            facilityError: false,
            facilityHelper: '',

            hours: '',
            hoursError: false,
            hoursHelper: '',

            submitSuccess: true,
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
          case 'info':
            returnedDialogue = this.getInfoPicker();
            break;
          case 'date':
            returnedDialogue = this.getDatePicker();
            break;
          case 'time':
            returnedDialogue = this.getTimePicker();
            break;
          default:
            returnedDialogue = null;
            break;
      }
    return returnedDialogue;
  }
  
  getAlert() {
    if (this.state.startDateError) {
      return(
          <Snackbar 
            open={this.state.startDateError}
            onClose={() => this.setState({startDateError: false})}
            autoHideDuration={6000}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            >
            <Alert severity="error">
              Please choose a date.
            </Alert>
          </Snackbar>
      );
    }
    else if (this.state.startTimeError) {
      return(
          <Snackbar 
            open={this.state.startTimeError}
            onClose={() => this.setState({startTimeError: false})}
            autoHideDuration={6000}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            >
            <Alert severity="error">
              Please choose a time.
            </Alert>
          </Snackbar>
      );
    }
    else if (this.state.submitSuccess) {
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
            Range submitted.
          </Alert>
        </Snackbar>
    );
    }
    else  if (this.state.submitError) {
      return(
        <Snackbar 
          open={this.state.submitError}
          autoHideDuration={6000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          onClose={() => {this.setState({submitError: false})}}
          >
          <Alert severity="error">
            Please try submitting again.
          </Alert>
        </Snackbar>
    );
    }
  }

  render() {
    return(
        <div style={{width: '100%'}}>
        
          <Button 
            id="button" 
            variant="contained"
            onClick={(event) => this.setState({dialog: 'info'})}
            color="primary"
            style={{margin: 'auto', marginTop: '10px', marginBottom: '10px', width: '96%', height: '60px'}}
            >
            Add New Range
          </Button>

        {this.getDialogue()}
        {this.getAlert()}
        </div>
    );
  }
}

export default withStyles(useStyles)(RangeButton);