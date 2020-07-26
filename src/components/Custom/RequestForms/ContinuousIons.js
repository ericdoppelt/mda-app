import React from 'react';
import {Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, TextField} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { observer } from "mobx-react"
import ExperimentStore from '../../../stores/ExpirementStore';
import axios from 'axios';
import ExperimentHours from './ExperimentHours';

const useStyles = theme => ({
  
  energies: {
    marginTop: '4px',
    marginLeft: '5%',
    marginRight: '3%',
    width: '42%',
  },
  
  ions: {
    marginTop: '4px',
    marginLeft: '3%',
    marginRight: '5%',
    width: '42%',
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
            energies: [],
            beams: {},
            maxBeam: 0,
            ionIterator: 0,
        }

        this.selectIon = this.selectIon.bind(this);
        this.getEnergies = this.getIons.bind(this);
        ExperimentStore.clearBeams();

    }

    async componentDidMount() {
        let url = 'https://mda-phoenix.herokuapp.com/beams';
          await axios.post(url, {
            facility: this.props.facility,
            }).then(response => {

              let energyArray = Object.keys(response.data);
              let max = -1;
              energyArray.forEach(energy => {
                if (energy > max) max = energy;
              });
              
              this.setState({
                energies: energyArray,
                beams: response.data,
                maxBeam: max
              });

              }).catch(error => {
              alert(error);
        });
    }

    incrementIonCounter() {
        let numSelectors = this.state.ionIterator + 1;
        this.setState({ionIterator: numSelectors});
        ExperimentStore.addBeam();
    }
    
    getIons(index) {
        let selectedEnergy = ExperimentStore.energies[index];
        
        if (selectedEnergy === "" || selectedEnergy === undefined) {
          return <MenuItem value={""}>{"Please enter a valid energy"}</MenuItem>
          } else {
          let ions = [];
          
          this.state.energies.forEach(energy => {
            if (selectedEnergy <= parseInt(energy, 10)) {
              for (var ion of this.state.beams[energy]) {
                ions.push(ion);
              }
            }
          });

          let returned = [];
          ions.forEach(ion => returned.push(<MenuItem value={ion}>{ion} </MenuItem>)); 
          return returned;
          }
        }
    

    ionArray(index) {
      let returned = [];
      let allIons = ExperimentStore.ions[index];
      for (let i = 0; i < allIons.length; i++) {
        returned.push(allIons[i]);
      }
      return returned;
    }

    selectIon(ion, index) {
        this.setState({selectedIon: true});
        ExperimentStore.setIons(ion, index);
    }

    updateEnergy(energy, key) {
    
      if ((energy > 0 && energy < this.state.maxBeam) || (energy === '')) {
        ExperimentStore.setEnergies(energy, key);
      }
    }

    getIonSelectors() {
        const { classes } = this.props;
        var returnedSelectors = [];
        for (var i = 0; i <= this.state.ionIterator; i++) {      
          const key = i;
          returnedSelectors.push(
            <div>

              <TextField 
                className={classes.energies}
                label = "Energy"
                value={ExperimentStore.energies[key]}
                type = 'number'
                onChange={event => {ExperimentStore.setEnergies(event.target.value, key)}}
                error = {ExperimentStore.energiesError(key)}
                helperText = {ExperimentStore.energiesHelperText(key)}
              />

              
            <FormControl 
                className={classes.ions}
                error = {ExperimentStore.ionsError(key)}
                disabled = {ExperimentStore.energies[key] === ""}
                > 
                <InputLabel>Ions</InputLabel>
                <Select
                  value={this.ionArray(key)}
                  onChange={event => this.selectIon(event.target.value, key)}
                  multiple
                  >
                  {this.getIons(key)}
                </Select>
                <FormHelperText>{ExperimentStore.ionsHelperText(key)}</FormHelperText>
              </FormControl>
              
              <ExperimentHours index={key}/>
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
                    Add Another Experiment
                    </Button>
                </div>
            );
        }
}

export default withStyles(useStyles)(observer(ContinuousIons)); 
