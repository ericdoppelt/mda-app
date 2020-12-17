import React from 'react';
import {Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, Chip} from '@material-ui/core';
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
    marginTop: '30px',
    marginLeft:'5%',
    marginRight: '5%',
    width: '90%',
    height: '50px',
  },
  fullDiv: {
    width: '100%',
  }
  });

class DiscreteIons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            energies: [],
            beams: {},
            ionIterator: 0,
        }

        this.selectIon = this.selectIon.bind(this);
        this.getEnergies = this.getIons.bind(this);
    }

    async componentDidMount() {
        let url = 'https://vcm-17934.vm.duke.edu/api/beams';
          await axios.post(url, {
            facility: this.props.facility,
            }).then(response => {
              console.log(response);
              this.setState({energies: Object.keys(response.data)});
              this.setState({beams: response.data});
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
    
    getIons(index) {
        let energy = ExperimentStore.energies[index];
        if (energy === "" || energy === undefined || this.state.beams[energy] === undefined) {
          return <MenuItem value={""}>{"Please enter a valid energy"}</MenuItem>
          } else if (this.state.beams[ExperimentStore.energies[index]] !== undefined) {
          let ions = this.state.beams[ExperimentStore.energies[index]].map(function(ions) {
            return <MenuItem value={ions}>{ions} </MenuItem>
          });
          return ions;
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

    getIonSelectors() {
        const { classes } = this.props;
        var returnedSelectors = [];
        for (var i = 0; i <= this.state.ionIterator; i++) {      
          const key = i;
          returnedSelectors.push(
            <div>

              <FormControl 
                className={classes.energies}
                error = {ExperimentStore.energiesError(key)}
                > 
                <InputLabel>Energy</InputLabel>
                <Select
                  value={ExperimentStore.energies[key]}
                  onChange={event => {ExperimentStore.setEnergies(event.target.value, key)}}
                  >
                  {this.state.energies.map(function(energy) {
                    return <MenuItem value={energy}>{energy} MeV</MenuItem>
                  })}
                </Select>
                
                <FormHelperText>{ExperimentStore.energiesHelperText(key)}</FormHelperText>
              </FormControl>
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
                  renderValue={(selected) => (
                    <div>
                    {selected.map((value) => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                    </div>
                    )
                  }
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
                    <Button 
                      variant='contained' 
                      className={classes.ionButton} 
                      onClick={() => this.incrementIonCounter()}>
                    Add Another Experiment
                    </Button>
                </div>
            );
        }
}

export default withStyles(useStyles)(observer(DiscreteIons)); 
