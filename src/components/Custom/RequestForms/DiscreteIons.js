import React from 'react';
import {Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, TextField} from '@material-ui/core';
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
  energies: {
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

class DiscreteIons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            particles: [],
            energies: {},
            ionIterator: 0,
        }

        this.selectIon = this.selectIon.bind(this);
        this.getEnergies = this.getEnergies.bind(this);
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
    
    getEnergies(index) {
        let ion = ExperimentStore.ions[index];
        if (ion === "" || ion === undefined || this.state.energies[ion] == undefined) {
          return <MenuItem value={""}>{"Please enter an ion"}</MenuItem>
          } else if (this.state.energies[ExperimentStore.ions[index]] != undefined) {
          let energies = this.state.energies[ExperimentStore.ions[index]].map(function(energy) {
            return <MenuItem value={energy}>{energy} MeV</MenuItem>
          });
          return energies;
        }
    }

    selectIon(ion, index) {
        this.setState({selectedIon: true});
        ExperimentStore.setIons(ion, index);
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
                error = {ExperimentStore.ionsError(key)}
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
                <FormHelperText>{ExperimentStore.ionsHelperText(key)}</FormHelperText>
              </FormControl>
  
              <FormControl 
                className={classes.energies}
                error = {ExperimentStore.energiesError(key)}
                disabled = {ExperimentStore.ions[key] === ""}
                > 
                <InputLabel>Energy</InputLabel>
                <Select
                  value={ExperimentStore.energies[key]}
                  onChange={event => {ExperimentStore.setEnergies(event.target.value, key)}}
                  >
                  {this.getEnergies(key)}
                </Select>
                
                <FormHelperText>{ExperimentStore.ionsHelperText(key)}</FormHelperText>
              </FormControl>

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

export default withStyles(useStyles)(observer(DiscreteIons)); 
