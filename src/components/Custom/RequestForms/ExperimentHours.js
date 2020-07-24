import React from 'react';
import {TextField} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { observer } from "mobx-react"
import ExperimentStore from '../../../stores/ExpirementStore';


const useStyles = theme => ({
  totalHours: {
    marginTop: '4px',
    marginLeft: '5%',
    marginRight: '3%',
    width: '26%',
  },
  hoursOn: {
    marginTop: '4px',
    marginLeft: '3%',
    marginRight: '3%',
    width: '26%',
  },
  hoursOff: {
    marginTop: '4px',
    marginLeft: '3%',
    marginRight: '5%',
    width: '26%'
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
    
    render() {
        const { classes } = this.props;
        return(
            <div>
                <TextField 
                  className={classes.totalHours}
                  label = "Number of Shifts"
                  value = {ExperimentStore.shifts[this.state.index]}
                  type = 'number'
                  onChange={event => {ExperimentStore.setShifts(event.target.value, this.state.index)}}
                  error = {ExperimentStore.shiftsError(this.state.index)}
                  helperText = {ExperimentStore.shiftsHelperText(this.state.index)}
                />
                
                <TextField 
                  className={classes.hoursOn}
                  label = "Hours per Shift"
                  value = {ExperimentStore.hoursOn[this.state.index]}
                  onChange={event => {ExperimentStore.setHoursOn(event.target.value, this.state.index)}}
                  type = 'number'
                  error = {ExperimentStore.hoursOnError(this.state.index)}
                  disabled = {ExperimentStore.shifts[this.state.index] === ''}
                  helperText = {ExperimentStore.hoursOnHelperText(this.state.index)}
                />

                <TextField 
                  className={classes.hoursOff}
                  label = "Hours between Shifts"
                  value = {ExperimentStore.hoursOff[this.state.index]}
                  type = 'number'
                  onChange={event => {ExperimentStore.setHoursOff(event.target.value, this.state.index)}}
                  error = {ExperimentStore.hoursOffError(this.state.index)}
                  disabled = {ExperimentStore.shifts[this.state.index] === '' || ExperimentStore.shifts[this.state.index] == 1}
                  helperText = {ExperimentStore.hoursOffHelperText(this.state.index)}
                />
            </div>
        );
    }
}

export default withStyles(useStyles)(observer(ExperimentHours));