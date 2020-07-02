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
      marginTop: '25px',
      marginLeft: '5%',
      marginRight: '5%',
      width: '90%',
    },
    leftTextField: {
      marginTop: '2px',
      marginLeft: '5%',
      marginRight: '3%',
      width: '64%',
    },
    officePhone: {
      marginLeft: '5%',
      marginRight: '3%',
      marginTop: '2px',
      width: '25%',
    },
    address: {
      marginLeft: '3%',
      marginRight: '5%',
      marginTop: '2px',
      width: '59%',
    },
    leftThird: {
      marginTop: '2px',
      marginLeft: '5%',
      marginRight: '3%',
      width: '25%',
    },
    middleThird: {
      marginTop: '2px',
      marginLeft: '3%',
      marginRight: '3%',
      width: '28%',
    },
    rightThird: {
      marginTop: '2px',
      marginLeft: '3%',
      marginRight: '5%',
      width: '25%',
    },
    fullWidth: {
      marginTop: '2px',
      marginLeft: '5%',
      marginRight: '5%',
      width: '90%',
    },
    left: {
      marginTop: '2px',
      marginLeft: '5%',
      marginRight: '3%',
      width: '42%',
    },
    right: {
      marginTop: '2px',
      marginLeft: '3%',
      marginRight: '5%',
      width: '42%',
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
          <br/>
          <br/>
          <Box>Please enter the following supplemental and optional information for LBNL.</Box>
            <TextField 
              className={classes.officePhone}
              label = "Office Phone"
              value = {LBNLStore.senderOfficePhone}
              onChange={event => {LBNLStore.setSenderOfficePhone(event.target.value)}}
              fullWidth
            /> 
            <TextField 
              className={classes.address}
              label = "Address"
              value = {LBNLStore.senderAddress}
              onChange={event => {LBNLStore.setSenderAddress(event.target.value)}}
            />
            <TextField 
              className={classes.leftThird}
              label = "City"
              value = {LBNLStore.senderCity}
              onChange={event => {LBNLStore.setSenderCity(event.target.value)}}
            />
            <TextField 
              className={classes.middleThird}
              label = "State"
              value = {LBNLStore.senderState}
              onChange={event => {LBNLStore.setSenderState(event.target.value)}}
            />
            <TextField 
              className={classes.rightThird}
              label = "Zip"
              value = {LBNLStore.senderZip}
              onChange={event => {LBNLStore.setSenderZip(event.target.value)}}
            />
            <TextField 
              className={classes.fullWidth}
              label = "Abstract of Experiment"
              value = {LBNLStore.experimentAbstract}
              onChange={event => {LBNLStore.setExperimentAbstract(event.target.value)}}
            />
            <TextField 
              className={classes.fullWidth}
              label = "Safety Concerns"
              value = {LBNLStore.safetyConcerns}
              onChange={event => {LBNLStore.setSafetyConcerns(event.target.value)}}
              multiline
            />
            <TextField
              className={classes.leftThird}
              label = "Special Ions"
              value = {LBNLStore.specialIons}
              onChange={event => {LBNLStore.setSpecialIons(event.target.value)}}
              fullWidth
            />
            <TextField
              className={classes.middleThird}
              label = "Special Energies"
              value = {LBNLStore.specialEnergies}
              onChange={event => {LBNLStore.setSpecialEnergies(event.target.value)}}
              fullWidth
            />
            <TextField
              className={classes.rightThird}
              label = "Flux"
              value = {LBNLStore.flux}
              onChange={event => {LBNLStore.setFlux(event.target.value)}}
              fullWidth
            />
            <TextField 
              className={classes.left}
              label = "Target Materials and Thickness"
              value = {LBNLStore.targetMaterials}
              onChange={event => {LBNLStore.setTargetMaterials(event.target.value)}}
              multiline
            />
            
            <TextField 
              className={classes.right}
              label = "Beam Type"
              value = {LBNLStore.beamType}
              onChange={event => {LBNLStore.setBeamType(event.target.value)}}
              fullWidth
            />

            <TextField
              className={classes.left}
              label = "Will the test be in air or vacuum?"
              value = {LBNLStore.airOrVacuum}
              onChange={event => {LBNLStore.setAirOrVacuum(event.target.value)}}
              fullWidth
            />
            <TextField
              className={classes.right}
              label = "Is all test equipment electically safe?"
              value = {LBNLStore.electricallySafe}
              onChange={event => {LBNLStore.setElectricallySafe(event.target.value)}}
              fullWidth
            />
            <TextField
              className={classes.fullWidth}
              label = "Does the test have export control restrictions?"
              value = {LBNLStore.controlRestrictions}
              onChange={event => {LBNLStore.setControlRestrictions(event.target.value)}}
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