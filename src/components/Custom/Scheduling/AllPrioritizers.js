import React from 'react';
import {Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Prioritizer from './Prioritizer';

const useStyles = theme => ({
    priotizer: {
      backgroundColor: "#bfddff",
      marginTop: '15px',
      marginLeft:'5%',
      marginRight: '5%',
      width: '90%',
    },
    fullDiv: {
      width: '100%',
    }
  });

class AllPrioritizers extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          ranges: [],
      }
    }

  async componentDidMount() {
    let url = 'https://mda-phoenix.herokuapp.com/integrator/get-range';
    await axios.get(url, {
      headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
    }).then(response => {
      this.setState({ranges: response.data.ranges});
      console.log(this.state.ranges);
    }).catch(error => {
        alert(error);
    });
  }
  
  getPrioritizers() {
    return this.state.ranges.map(function(range) {
        return(
            <div>
                <Prioritizer start={range.startDate} end={range.endDate} facility={range.facility}/>
            </div>
        );
    });
  }
  
  render() {
    const { classes } = this.props;
    return(
        <div>
            {this.getPrioritizers()}
        </div>
    
    );
  }
}

export default withStyles(useStyles)(AllPrioritizers);