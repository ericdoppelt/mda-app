import React from 'react';
import {TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { observer } from "mobx-react"
import ExperimentStore from '../../../stores/ExpirementStore';


const useStyles = theme => ({
  shifts: {
    marginTop: '4px',
    marginLeft: '5%',
    marginRight: '3%',
    width: '19%',
  },
  hoursOn: {
    marginTop: '4px',
    marginLeft: '3%',
    marginRight: '3%',
    width: '19%',
  },
  hoursOff: {
    marginTop: '4px',
    marginLeft: '3%',
    marginRight: '3%',
    width: '19%'
  },
  totalHours: {
    marginTop: '4px',
    marginLeft: '3%',
    marginRight: '5%',
    width: '15%'
  },
  fullDiv: {
    width: '100%',
  }
  });
class ExperimentHours extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            index: this.props.index,
        }
    }
    
    getHoursOff() {
        if (ExperimentStore.hoursOn[this.state.index] === '') return;
        else if (ExperimentStore.hoursOn[this.state.index] === 8) {
            let returned = [];
            returned.push(<MenuItem value={16}>{16}</MenuItem>);
            return returned;
        }
        else if (ExperimentStore.hoursOn[this.state.index] === 16) {
            let returned = [];
            returned.push(<MenuItem value={8}>{8}</MenuItem>);
            returned.push(<MenuItem value={32}>{32}</MenuItem>);
            return returned;
        }
    }
    
    render() {
        const { classes } = this.props;
        return(
            <div>
                <TextField 
                  className={classes.shifts}
                  label = "Number of Shifts"
                  value = {ExperimentStore.shifts[this.state.index]}
                  type = 'number'
                  onChange={event => {ExperimentStore.setShifts(event.target.value, this.state.index)}}
                  error = {ExperimentStore.shiftsError(this.state.index)}
                  helperText = {ExperimentStore.shiftsHelperText(this.state.index)}
                />
                
                <FormControl 
                  className={classes.hoursOn}
                  error = {ExperimentStore.hoursOnError(this.state.index)}
                  disabled = {ExperimentStore.shifts[this.state.index] === ''}
                  type= 'number'
                > 
                <InputLabel>Hours on</InputLabel>
                <Select
                  value = {ExperimentStore.hoursOn[this.state.index]}
                  onChange={event => {ExperimentStore.setHoursOn(event.target.value, this.state.index)}}
                  >
                  <MenuItem value={8}>{8}</MenuItem>
                  <MenuItem value={16}>{16}</MenuItem>
                </Select>
                <FormHelperText>{ExperimentStore.hoursOnHelperText(this.state.index)}</FormHelperText>
              </FormControl>

              <FormControl 
                  className={classes.hoursOff}
                  error = {ExperimentStore.hoursOffError(this.state.index)}
                  disabled = {ExperimentStore.shifts[this.state.index] === '' || ExperimentStore.shifts[this.state.index] === 1 || ExperimentStore.hoursOn[this.state.index] === ''}
                  type= 'number'
                > 
                <InputLabel>Hours Off</InputLabel>
                <Select
                  value = {ExperimentStore.hoursOff[this.state.index]}
                  onChange={event => {ExperimentStore.setHoursOff(event.target.value, this.state.index)}}
                  >
                  {this.getHoursOff()}
                </Select>
                <FormHelperText>{ExperimentStore.hoursOffHelperText(this.state.index)}</FormHelperText>
              </FormControl>

                <TextField 
                  className={classes.totalHours}
                  label = "Total Hours"
                  value = {ExperimentStore.shifts[this.state.index] * ExperimentStore.hoursOn[this.state.index]}
                  type = 'number'
                  disabled
                />
            </div>
        );
    }
}

export default withStyles(useStyles)(observer(ExperimentHours));