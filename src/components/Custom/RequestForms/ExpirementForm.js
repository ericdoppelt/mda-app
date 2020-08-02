import React from 'react';
import {TextField, Typography} from '@material-ui/core';
import 'react-nice-dates/build/style.css'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { observer } from "mobx-react"
import ExperimentStore from '../../../stores/ExpirementStore';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";

const useStyles = theme => ({

    title: {
      marginTop: '2px',
      marginLeft:'5%',
      marginRight: '3%',
      width: '42%',
    },
    start: {
      marginTop: '2px',
      marginLeft:'3%',
      marginRight: '5%',
      width: '42%',
    },
    fullText: {
      marginTop: '2px',
      marginLeft:'5%',
      marginRight: '5%',
      width: '90%',
    },
    fullDiv: {
      width: '100%',
    }
  });

  
  class ExperimentForm extends React.Component {
      
    constructor(props) {
      super(props);
      ExperimentStore.clear();
    }

    render() {
      const { classes } = this.props;
      return(
          <div className={classes.fullDiv}>
            <br/>
            <Typography variant='subtitle1'>Please enter the following information about your experiment.</Typography>
            <TextField
              className={classes.title}
              label = "Experiment Title"
              value = {ExperimentStore.title}
              onChange={(event) => {ExperimentStore.setTitle(event.target.value)}}
              error = {ExperimentStore.titleError}
              helperText = {ExperimentStore.titleHelperText}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={classes.start}
              label="Start Date"
              variant='inline'
              value={ExperimentStore.startDate}
              onChange={(event) => {ExperimentStore.setStartDate(event)}}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            </MuiPickersUtilsProvider>

            <TextField 
              className={classes.fullText}
              label = "Personnel"
              value = {ExperimentStore.personnel}
              onChange={event => {ExperimentStore.setPersonnel(event.target.value)}}
              error = {ExperimentStore.personnelError}
              helperText = {ExperimentStore.personnelHelperText}
            />

            <TextField 
              className={classes.fullText}
              label = "Comments"
              value = {ExperimentStore.comments}
              onChange={event => {ExperimentStore.setComments(event.target.value)}}
              multiline
            />
          </div>
      );
    }
  }

  export default withRouter(withStyles(useStyles)(observer(ExperimentForm)));