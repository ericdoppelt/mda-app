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
    comments: {
      marginTop: '2px',
      marginLeft:'5%',
      marginRight: '5%',
      width: '90%',
    },
    startButton: {
      backgroundColor: "#bfffc8",
      marginTop: '30px',
      marginLeft:'5%',
      marginRight: '5%',
      width: '90%',
    },
    ionButton: {
      backgroundColor: "#f5f5b8",
      marginTop: '30px',
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
        this.state = {
            openCalendar: false,
            particles: [],
            energies: {},
            ionIterator: 0,
        }

        this.selectIon = this.selectIon.bind(this);
        this.getEnergies = this.getEnergies.bind(this);
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
        } 
      
    getEnergies(index) {
      if (ExperimentStore.ions[index] === undefined) {
        return <MenuItem value={""}>{"Please enter an ion"}</MenuItem>
        } else {
        let energies = this.state.energies[ExperimentStore.ions[index]].map(function(energy) {
          return <MenuItem value={energy}>{energy}</MenuItem>
        });
        return energies;
      }
    }
    
    selectIon(ion, index) {
      this.setState({selectedIon: true});
      ExperimentStore.setIons(ion, index);
    }

    incrementIonCounter() {
      let numSelectors = this.state.ionIterator + 1;
      this.setState({ionIterator: numSelectors});
    }

    getIonSelectors() {
      const { classes } = this.props;
      var returnedSelectors = [];
      for (var i = 0; i <= this.state.ionIterator; i++) {      
        const key = i;
        returnedSelectors.push(
          <div>
          <FormControl 
              className={classes.ions}
              error = {ExperimentStore.ionsError}
              > 
              <InputLabel>Ion</InputLabel>
              <Select
                value={ExperimentStore.ions[i]}
                onChange={event => this.selectIon(event.target.value, key)}
                >
                {this.state.particles.map(function(ion) {
                  return <MenuItem value={ion}>{ion}</MenuItem>
                })}
              </Select>
              <FormHelperText>{ExperimentStore.ionsHelperText}</FormHelperText>
            </FormControl>

            <FormControl 
              className={classes.energies}
              error = {ExperimentStore.energiesError}
              > 
              <InputLabel>Energy</InputLabel>
              <Select
                value={ExperimentStore.energies[key]}
                onChange={event => {ExperimentStore.setEnergies(event.target.value, key)}}
                >
                {this.getEnergies(key)}
              </Select>
              <FormHelperText>{ExperimentStore.ionsHelperText}</FormHelperText>
            </FormControl>
            </div>
        );
        }
        return returnedSelectors;
      }
    
      
    render() {
      const { classes } = this.props;
      return(
          <div className={classes.fullDiv}>
            <br/>
            <Box>Please enter the following information about your experiment.</Box>
            <TextField
              className={classes.leftTextField}
              label = "Experiment Title"
              value = {ExperimentStore.title}
              onChange={(event) => {ExperimentStore.setTitle(event.target.value)}}
              error = {ExperimentStore.titleError}
              helperText = {ExperimentStore.titleHelperText}
            />
            <TextField 
              className={classes.rightTextField}
              label = "Total Hours"
              value = {ExperimentStore.hours}
              onChange={event => {ExperimentStore.setHours(event.target.value)}}
              error = {ExperimentStore.hoursError}
              helperText = {ExperimentStore.hoursHelperText}
              type="number"
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

            {this.getIonSelectors()}
            <Button className={classes.ionButton} onClick={() => this.incrementIonCounter()}>
            Add Another Ion
            </Button>
            <TextField 
              className={classes.comments}
              label = "Comments"
              value = {ExperimentStore.comments}
              onChange={event => {ExperimentStore.setComments(event.target.value)}}
            />
            <Button className={classes.startButton} onClick={() => this.setState({open: true})}>
            Select Start Date
            </Button>
            <Dialog open={this.state.openCalendar} onClose={() => this.setState({open: false})}>
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