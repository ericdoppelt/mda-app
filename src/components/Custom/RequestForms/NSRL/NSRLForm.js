import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import NSRLStore from '../../../../stores/NSRLStore';

const useStyles = theme => ({
    endButton: {
      backgroundColor: "#f5c1b8",
      width: '100%',
      marginBottom: '15px',
    },
  });

class NSRLForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          open: false
      }
  }

  render() {
    const { classes } = this.props;
    return(
    <div>
      <Box>Please enter the following supplemental and optional information for TAMU.</Box>
      <Button className={classes.endButton} onClick={() => this.setState({open: true})}>
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
      <Button onClick={() => this.setState({open: false})}>
        Select End Date
      </Button>
      </DialogActions>
      </Dialog>
      <TextField
        className={classes.textField}
        label = "Linear Energy Transfer"
        value = {NSRLStore.let}
        onChange={event => {NSRLStore.setLet(event.target.value)}}
        fullWidth
      />
      <TextField
        className={classes.textField}
        label = "Beam Size"
        value = {NSRLStore.beamSize}
        onChange={event => {NSRLStore.setBeamSize(event.target.value)}}
        fullWidth
      />
      <TextField
        className={classes.textField}
        label = "Max Dose"
        value = {NSRLStore.maxDose}
        onChange={event => {NSRLStore.setMaxDose(event.target.value)}}
        fullWidth
      />
      <FormControl 
        className={classes.textField}
        fullWidth
        > 
        <InputLabel>Is this a NASA-funded experiment?</InputLabel>
        <Select
          value={NSRLStore.isNasa}
          onChange={event => {NSRLStore.setIsNasa(event.target.value)}}
          >
          <MenuItem value={"NASA"}>NASA</MenuItem>
          <MenuItem value={"Not NASA"}>Not NASA</MenuItem>
        </Select>
      </FormControl>
      <FormControl 
        className={classes.textField}
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
    </div>
    );
  }
}

export default withStyles(useStyles)(NSRLForm);