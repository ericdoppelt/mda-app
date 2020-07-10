import React from 'react';
import axios from 'axios';
import {Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import InfiniteCalendar from 'react-infinite-calendar';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";



class RangeButton extends React.Component {

  async componentDidMount() {
  }

  constructor(props) {
    super(props);
    this.state = {
        dialog: '',
        startDate: '',
        startTime: '',
    }

    
  }

  getDatePicker() {
      return(
        <Dialog open={this.state.dialog === 'date'} onClose={() => this.setState({dialog: ''})}>
          <DialogTitle>Please enter a desired start date.</DialogTitle>
          <DialogContent>
            <InfiniteCalendar
              selected={this.state.startDate}
              onSelect={(event) => {this.setState({startDate: event.target})}}
              minDate={new Date()}
              min={new Date()}
            />
          </DialogContent>
          <DialogActions>
          <Button color='secondary'onClick={() => this.setState({dialog: ''})}>
              Close
            </Button>
            <Button color='primary' onClick={() => this.setState({dialog: 'time'})}>
              Select Start Time
            </Button>
          </DialogActions>
        </Dialog>

      );
  }

  getTimePicker() {
      return(
        <Dialog open={this.state.dialog === 'time'} onClose={() => this.setState({dialog: ''})}>
          <DialogTitle>Please enter a desired start date.</DialogTitle>
          <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>

            <TimePicker
              
              variant="static"
              openTo="hours"
              value={this.state.startTime}
              onChange={(event) => this.setState({startTime: event})}
            />
          </MuiPickersUtilsProvider>

          </DialogContent>

          <DialogActions>
          <Button color='secondary'onClick={() => this.setState({dialog: ''})}>
              Close
            </Button>
            <Button color='primary' onClick={() => this.setState({dialog: 'hours'})}>
              Select Total Hours
            </Button>
          </DialogActions>
          
        </Dialog>
        
      );
  }

  getDialogue() {
      var returnedDialogue;
      switch(this.state.dialog) {
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
  
  render() {
    return(
        <div style={{width: '100%'}}>
        
          <Button 
            id="button" 
            variant="contained"
            onClick={(event) => this.setState({dialog: 'date'})}
            color="primary"
            style={{margin: 'auto', marginTop: '10px', marginBottom: '10px', width: '96%', height: '60px'}}
            >
            Add New Range
          </Button>

          

        {this.getDialogue()}
        </div>
    );
  }
}

export default (RangeButton);