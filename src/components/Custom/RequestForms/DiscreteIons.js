import React from 'react';
import {Button, FormControl, InputLabel, Select, MenuItem, FormHelperText} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { observer } from "mobx-react"
import ExperimentStore from '../../../stores/ExpirementStore';
import axios from 'axios';


const useStyles = theme => ({
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
                    {this.getIonSelectors()}
                    <Button className={classes.ionButton} onClick={() => this.incrementIonCounter()}>
                    Add Another Ion
                    </Button>
                </div>
            );
        }
}

export default withStyles(useStyles)(observer(DiscreteIons)); 
