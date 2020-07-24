import React from 'react';
import {TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import 'react-nice-dates/build/style.css'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { observer } from "mobx-react"
import InfiniteCalendar from 'react-infinite-calendar';
import ExperimentStore from '../../../stores/ExpirementStore';

const useStyles = theme => ({
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
            />
          </div>
      );
    }
  }

  export default withRouter(withStyles(useStyles)(observer(ExperimentForm)));