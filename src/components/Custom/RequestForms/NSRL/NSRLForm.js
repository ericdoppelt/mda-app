import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import {Button, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { observer } from "mobx-react"
import NSRLStore from '../../../../stores/NSRLStore';

const useStyles = theme => ({
    endButton: {
      marginTop: '30px',
      marginLeft: '5%',
      marginRight: '5%',
      width: '90%',
      height: '50px',
    },
    let: {
      marginTop: '2px',
      marginLeft: '5%',
      marginRight: '3%',
      width: '25%',
    },
    beamSize: {
      marginTop: '2px',
      marginLeft: '3%',
      marginRight: '3%',
      width: '28%',
    },
    maxDose: {
      marginTop: '2px',
      marginRight: '5%',
      marginLeft: '3%',
      width: '25%',
    },
    nasaFunded: {
      marginTop: '2px',
      marginLeft: '5%',
      marginRight: '3%',
      width: '42%',
    },
    physicsParts: {
      marginTop: '2px',
      marginLeft: '3%',
      marginRight: '5%',
      width: '42%',
    },
  });

class NSRLForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          open: false
      }
      NSRLStore.clear();
  }

  render() {
    const { classes } = this.props;
    return(
    <div>
      <br/>
      <Divider/>
      <br/>
      <Typography variant='subtitle1'>Please enter the following supplemental information for NSRL.</Typography>
        <TextField
          className={classes.let}
          label = "Linear Energy Transfer"
          value = {NSRLStore.let}
          onChange={event => {NSRLStore.setLet(event.target.value)}}
          fullWidth
        />
        <TextField
          className={classes.beamSize}
          label = "Beam Size"
          value = {NSRLStore.beamSize}
          onChange={(event) => {NSRLStore.setBeamSize(event.target.value)}}
          fullWidth
        />
        <TextField
          className={classes.maxDose}
          label = "Max Dose"
          value = {NSRLStore.maxDose}
          onChange={event => {NSRLStore.setMaxDose(event.target.value)}}
          fullWidth
        />
        <FormControl 
          className={classes.nasaFunded}
          fullWidth
        > 
       <InputLabel>Is this a NASA-funded experiment?</InputLabel>
        <Select
          value={NSRLStore.isNasa}
          onChange={event => {NSRLStore.setIsNasa(event.target.value)}}
          >
          <MenuItem value={"true"}>NASA</MenuItem>
          <MenuItem value={"false"}>Not NASA</MenuItem>
        </Select>
      </FormControl>
      <FormControl 
        className={classes.physicsParts}
        fullWidth
        > 
        <InputLabel>Is this a parts test or a biology study?</InputLabel>
        <Select
          value={NSRLStore.experimentType}
          onChange={event => {NSRLStore.setExperimentType(event.target.value)}}
          >
          <MenuItem value={"Parts Test"}>Parts Test</MenuItem>
          <MenuItem value={"Biology Study"}>Biology Study</MenuItem>
        </Select>
      </FormControl>

      
      <Button color = 'secondary' variant = 'contained' className={classes.endButton} onClick={() => this.setState({open: true})}>
        Select Preferred End Date
      </Button>
      <Dialog open={this.state.open} onClose={() => this.setState({open: false})}>
        <DialogTitle>Please enter a desired end date.</DialogTitle>
        <DialogContent>
        <InfiniteCalendar
          selected={NSRLStore.endDate}
          onSelect={(event) => {NSRLStore.setEndDate(event)}}
          minDate={new Date()}
          min={new Date()}
        />
        </DialogContent>
        <DialogActions>
      
        <Button cclassName={classes.endButton} color='primary' variant = 'contained'  onClick={() => this.setState({open: false})}>
          Select End Date
        </Button>
        </DialogActions>
        </Dialog>
    </div>
    );
  }
}

export default withRouter(withStyles(useStyles)(observer(NSRLForm)));