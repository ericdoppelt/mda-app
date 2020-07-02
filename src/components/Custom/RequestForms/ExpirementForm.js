import React from 'react';
import Row from '../../UIzard/Row';
import {TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import 'react-nice-dates/build/style.css'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { observer } from "mobx-react"
import InfiniteCalendar from 'react-infinite-calendar';
import ExperimentStore from '../../../stores/ExpirementStore';
import axios from 'axios';

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
    textField: {
      marginBottom: '20px',
      marginTop: '5px',
    }
  });

  
  class ExperimentForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            particles: [],
            energies: {},
        }
    }

    async componentDidMount() {
      let url = 'https://mda-phoenix.herokuapp.com/beams';
        await axios.post(url, {
          facility: this.props.facility,
          }).then(response => {
            this.setState({particles: Object.keys(response.data)});
            this.setState({energies: response.data});
            })
            .catch(error => {
            alert(error);
          });
          console.log("d");
          console.log(this.state.particles);
          console.log(this.state.energies);
        } 
      
    getEnergies() {
      if (ExperimentStore.ions === "") {
        return <MenuItem value={""}>{"Please enter an ion"}</MenuItem>
        } else {
        console.log("not blank");
        let energies = this.state.energies[ExperimentStore.ions].map(function(energy) {
          return <MenuItem value={energy}>{energy}</MenuItem>
        });
        return energies;
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
            <Row>
            <FormControl 
              className={classes.textField}
              error = {ExperimentStore.ionsError}
              fullWidth
              > 
              <InputLabel>Ion</InputLabel>
              <Select
                value={ExperimentStore.ions}
                onChange={event => {ExperimentStore.setIons(event.target.value)}}
                >
                {this.state.particles.map(function(ion) {
                  return <MenuItem value={ion}>{ion}</MenuItem>
                })}
              </Select>
              <FormHelperText>{ExperimentStore.continuousHelperText}</FormHelperText>
            </FormControl>

            <FormControl 
              className={classes.textField}
              error = {ExperimentStore.energiesError}
              fullWidth
              > 
              <InputLabel>Energy</InputLabel>
              <Select
                value={ExperimentStore.energies}
                onChange={event => {ExperimentStore.setEnergies(event.target.value)}}
                >
                {this.getEnergies()}
              </Select>
              <FormHelperText>{ExperimentStore.ionsHelperText}</FormHelperText>
            </FormControl>
            </Row>
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