import React from 'react';
import {TextField, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import 'react-nice-dates/build/style.css'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { observer } from "mobx-react"
import InfiniteCalendar from 'react-infinite-calendar';

import LBNLStore from '../../../../stores/LBNLStore';

const useStyles = theme => ({
    alternateButton: {
      backgroundColor: "#f5f5b8",
      width: '100%',
      marginTop: '20px',
      marginBottom: '10px',
    },
    textField: {
      marginBottom: '2px',
      marginTop: '2px',
    }
  });

  class LBNLForm extends React.Component {
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
          <Box>Please enter the following supplemental and optional information for LBNL.</Box>
            <TextField
              className={classes.textField}
              label = "Address"
              value = {LBNLStore.senderAddress}
              onChange={(event) => {LBNLStore.setSenderAddress(event.target.value)}}
              fullWidth
            />
            <TextField 
              className={classes.textField}
              label = "Office Phone"
              value = {LBNLStore.senderOfficePhone}
              onChange={event => {LBNLStore.setSenderOfficePhone(event.target.value)}}
              fullWidth
            />
            <TextField 
              className={classes.textField}
              label = "Abstract of Experiment"
              value = {LBNLStore.experimentAbstract}
              onChange={event => {LBNLStore.setExperimentAbstract(event.target.value)}}
              fullWidth
            />
            <TextField 
              className={classes.textField}
              label = "Target Materials and Thickness"
              value = {LBNLStore.targetMaterials}
              onChange={event => {LBNLStore.setTargetMaterials(event.target.value)}}
              fullWidth
            />
            <TextField 
              className={classes.textField}
              label = "Safety Concerns"
              value = {LBNLStore.safetyConcerns}
              onChange={event => {LBNLStore.setSafetyConcerns(event.target.value)}}
              fullWidth
            />
            <TextField 
              className={classes.textField}
              label = "Beam Type"
              value = {LBNLStore.beamType}
              onChange={event => {LBNLStore.setBeamType(event.target.value)}}
              fullWidth
            />
            <TextField
              className={classes.textField}
              label = "Special Ions"
              value = {LBNLStore.specialIons}
              onChange={event => {LBNLStore.setSpecialIons(event.target.value)}}
              fullWidth
            />
            <TextField
              className={classes.textField}
              label = "Special Energies"
              value = {LBNLStore.specialEnergies}
              onChange={event => {LBNLStore.setSpecialEnergies(event.target.value)}}
              fullWidth
            />
            <TextField
              className={classes.textField}
              label = "Flux"
              value = {LBNLStore.flux}
              onChange={event => {LBNLStore.setFlux(event.target.value)}}
              fullWidth
            />
            <TextField
              className={classes.textField}
              label = "Will the expirement be in air or vacuum?"
              value = {LBNLStore.airOrVacuum}
              onChange={event => {LBNLStore.setAirOrVacuum(event.target.value)}}
              fullWidth
            />
            <TextField
              className={classes.textField}
              label = "Does the expirement have export control restrictions?"
              value = {LBNLStore.controlRestrictions}
              onChange={event => {LBNLStore.setControlRestrictions(event.target.value)}}
              fullWidth
            />
            <TextField
              className={classes.textField}
              label = "Is all experiment equipment electically safe?"
              value = {LBNLStore.electricallySafe}
              onChange={event => {LBNLStore.setElectricallySafe(event.target.value)}}
              fullWidth
            />
            <Button className={classes.alternateButton} onClick={() => this.setState({open: true})}>
            Select Alternate Date
            </Button>
            <Dialog open={this.state.open} onClose={() => this.setState({open: false})}>
              <DialogTitle>Please enter an alternate start date.</DialogTitle>
              <DialogContent>
              <InfiniteCalendar
                selected={LBNLStore.alternateDate}
                onSelect={(event) => {LBNLStore.setAlternateDate(event)}}
                minDate={new Date()}
                min={new Date()}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => this.setState({open: false})}>
                  Select Alternate Date
                </Button>
              </DialogActions>
            </Dialog>
        </div>
      );
    }
  }

  export default withRouter(withStyles(useStyles)(observer(LBNLForm)));