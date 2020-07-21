import React from 'react';
import {TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import 'react-nice-dates/build/style.css'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { observer } from "mobx-react"
import InfiniteCalendar from 'react-infinite-calendar';
import ExperimentStore from '../../../stores/ExpirementStore';

const useStyles = theme => ({
    leftTextField: {
      marginTop: '2px',
      marginLeft: '5%',
      marginRight: '3%',
      width: '64%',
    },
    rightTextField: {
      marginTop: '2px',
      marginLeft: '3%',
      marginRight: '5%',
      width: '20%',
    },
    ions: {
      marginTop: '2px',
      marginLeft: '5%',
      marginRight: '3%',
      width: '42%',
    },
    energies: {
      marginTop: '2px',
      marginLeft: '3%',
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
      
    render() {
      const { classes } = this.props;
      return(
          <div className={classes.fullDiv}>
            <br/>
            <Box>Please enter the following information about your experiment.</Box>
            <TextField
              className={classes.fullText}
              label = "Experiment Title"
              value = {ExperimentStore.title}
              onChange={(event) => {ExperimentStore.setTitle(event.target.value)}}
              error = {ExperimentStore.titleError}
              helperText = {ExperimentStore.titleHelperText}
            />
            <TextField 
              className={classes.leftTextField}
              label = "Personnel"
              value = {ExperimentStore.personnel}
              onChange={event => {ExperimentStore.setPersonnel(event.target.value)}}
              error = {ExperimentStore.personnelError}
              helperText = {ExperimentStore.personnelHelperText}
            />

            <FormControl 
              className={classes.rightTextField}
              error = {ExperimentStore.continuousError}
              > 
              <InputLabel>Continuous?</InputLabel>
              <Select
                value={ExperimentStore.continuous}
                onChange={event => {ExperimentStore.setContinuous(event.target.value)}}
                >
                <MenuItem value={"Continuous"}>Continuous</MenuItem>
                <MenuItem value={"Interleaved"}>Interleaved</MenuItem>
              </Select>
              <FormHelperText>{ExperimentStore.continuousHelperText}</FormHelperText>
            </FormControl>

            <TextField 
              className={classes.fullText}
              label = "Comments"
              value = {ExperimentStore.comments}
              onChange={event => {ExperimentStore.setComments(event.target.value)}}
            />
          </div>
      );
    }
  }

  export default withRouter(withStyles(useStyles)(observer(ExperimentForm)));