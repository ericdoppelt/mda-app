import React from 'react';
import {Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, InputAdornment, TextField} from '@material-ui/core';
import Row from '../../UIzard/Row';
import { withStyles } from '@material-ui/core/styles';
import { observer } from "mobx-react"
import ExperimentStore from '../../../stores/ExpirementStore';
import axios from 'axios';


const useStyles = theme => ({
    ions: {
      marginTop: '4px',
      marginLeft: '5%',
      marginRight: '3%',
      width: '26%',
    },
    energyText: {
      marginTop: '4px',
      marginLeft: '3%',
      marginRight: '3%',
      width: '26%',
    },
    energyHours: {
      marginTop: '4px',
      marginLeft: '3%',
      marginRight: '5%',
      width: '26%'
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

class ContinuousIons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            particles: [],
            energies: {},
            ionIterator: 0,
        }
        ExperimentStore.clearBeams();
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

    incrementIonCounter() {
        let numSelectors = this.state.ionIterator + 1;
        this.setState({ionIterator: numSelectors});
        ExperimentStore.addBeam();
    }

    getLabel(index) {
        let ion = ExperimentStore.ions[index];
        if (ion === "" || ion === undefined || this.state.energies[ion] == undefined) {
            return "Energy";
        } else {
            return "Max Value: " + this.state.energies[ExperimentStore.ions[index]][0];
        }
    }

    updateEnergy(value, index) {
        let max = this.state.energies[ExperimentStore.ions[index]][0];
        if (value >=  0 && value <= max) ExperimentStore.setEnergies(value, index);
    }

    getIonSelectors() {
        const { classes } = this.props;
        var returnedSelectors = [];
        for (var i = 0; i <= this.state.ionIterator; i++) {      
          const key = i;
          returnedSelectors.push(
            <div className = {classes.fullDiv}>
            <FormControl 
                className={classes.ions}
                error = {ExperimentStore.ionsError(key)}
                > 
                <InputLabel>Ion</InputLabel>
                <Select
                  value={ExperimentStore.ions[i]}
                  onChange={event => ExperimentStore.setIons(event.target.value, key)}
                  >
                  {this.state.particles.map(function(ion) {
                    return <MenuItem value={ion}>{ion}</MenuItem>
                  })}
                </Select>
                <FormHelperText>{ExperimentStore.ionsHelperText(key)}</FormHelperText>
              </FormControl>
              <TextField 
                className={classes.energyText}
                label = {this.getLabel(key)}
                type = "number"
                value = {ExperimentStore.energies[key]}
                disabled = {ExperimentStore.ions[key] === ""}
                error = {ExperimentStore.energiesError(key)}
                helperText = {ExperimentStore.energiesHelperText(key)}
                onChange={event => {this.updateEnergy(event.target.value, key)}}
                InputProps={{
                  endAdornment: <InputAdornment>{'\xa0\xa0\xa0'}MeV</InputAdornment>,
                }}
              />
              <TextField 
                className={classes.energyHours}
                label = "Hours Testing"
                type = "number"
                value = {ExperimentStore.energyHours[key]}
                disabled = {ExperimentStore.ions[key] === ""}
                error = {ExperimentStore.energyHoursError(key)}
                helperText = {ExperimentStore.energyHoursHelperText(key)}
                onChange={event => {ExperimentStore.setEnergyHours(event.target.value, key)}}
              />
              </div>
          );
          }
          return returnedSelectors;
        }

        render() {
            console.log(ExperimentStore.ions);
            const { classes } = this.props;
            return(
                <div className={classes.fullDiv}>
                    {this.getIonSelectors()}
                    <Button className={classes.ionButton} onClick={() => this.incrementIonCounter()}>
                    Add Another Ion
                    </Button>
                </div>
            );
        }
}

export default withStyles(useStyles)(observer(ContinuousIons)); 
