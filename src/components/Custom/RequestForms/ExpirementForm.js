import React from 'react';
import {TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import 'react-nice-dates/build/style.css'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { observer } from "mobx-react"
import InfiniteCalendar from 'react-infinite-calendar';
import ExperimentStore from '../../../stores/ExpirementStore';

const useStyles = theme => ({
    submitButton: {
      backgroundColor: "#bfddff",
      width: '100%',
    },
    startButton: {
      backgroundColor: "#bfffc8",
      width: '100%',
      marginTop: '20px',
      marginBottom: '10px',
    },
    alternateButton: {
      backgroundColor: "#f5f5b8",
      width: '100%',
      marginBottom: '30px',
    },
    textField: {
      marginBottom: '2px',
      marginTop: '2px',
    }
  });

  
  class ExperimentForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    render() {
      const { classes } = this.props;
      return(
          <div>
            <Box>Please enter the following information about your experiment.</Box>
            <TextField
              className={classes.textField}
              label = "Experiment Title"
              value = {ExperimentStore.title}
              onChange={(event) => {ExperimentStore.setTitle(event.target.value)}}
              error = {ExperimentStore.titleError}
              helperText = {ExperimentStore.titleHelperText}
              fullWidth
            />
            <TextField 
              className={classes.textField}
              label = "Total Hours"
              value = {ExperimentStore.hours}
              onChange={event => {ExperimentStore.setHours(event.target.value)}}
              error = {ExperimentStore.hoursError}
              helperText = {ExperimentStore.hoursHelperText}
              fullWidth
            />
            <TextField 
              className={classes.textField}
              label = "Names of Personnel"
              value = {ExperimentStore.personnel}
              onChange={event => {ExperimentStore.setPersonnel(event.target.value)}}
              error = {ExperimentStore.personnelError}
              helperText = {ExperimentStore.personnelHelperText}
              fullWidth
            />
            <TextField 
              className={classes.textField}
              label = "Particle"
              value = {ExperimentStore.ions}
              onChange={event => {ExperimentStore.setIons(event.target.value)}}
              error = {ExperimentStore.ionsError}
              helperText = {ExperimentStore.ionsHelperText}
              fullWidth
            />
            <TextField 
              className={classes.textField}
              label = "Energy"
              value = {ExperimentStore.energies}
              onChange={event => {ExperimentStore.setEnergies(event.target.value)}}
              error = {ExperimentStore.energiesError}
              helperText = {ExperimentStore.energiesHelperText}
              fullWidth
            />
            <FormControl 
              className={classes.textField}
              error = {ExperimentStore.continuousError}
              fullWidth
              > 
              <InputLabel>Continuous or Interleaved</InputLabel>
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
              className={classes.textField}
              label = "Comments"
              value = {ExperimentStore.comments}
              onChange={event => {ExperimentStore.setComments(event.target.value)}}
              fullWidth
            />
            <Button className={classes.startButton} onClick={() => this.setState({open: true})}>
            Select Start Date
            </Button>
            <Dialog open={this.state.open} onClose={() => this.setState({open: false})}>
              <DialogTitle>Please enter a desired start date.</DialogTitle>
              <DialogContent>
              <InfiniteCalendar
                selected={ExperimentStore.startDate}
                onSelect={(event) => {ExperimentStore.setStartDate(event)}}
                minDate={new Date()}
                min={new Date()}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => this.setState({open: false})}>
                  Select Start Date
                </Button>
              </DialogActions>
            </Dialog>
          </div>
      );
    }
  }

  export default withRouter(withStyles(useStyles)(observer(ExperimentForm)));