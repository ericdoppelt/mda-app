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
          requests: []
      }
    }

  async componentDidMount() {
    if ((window.sessionStorage.getItem("access_token") === null)) this.props.history.push('user-login');
    else {
    let url = 'https://mda-phoenix.herokuapp.com/integrator/get-range';
    let self = this;
    await axios.get(url, {
      headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
    }).then(response => {
      self.setState({ranges: response.data.ranges});
    }).catch(error => {
        alert(error);
    });
      
    url = 'https://mda-phoenix.herokuapp.com/getforms/integrator';
    await axios.post(url, null, {
      headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
    }).then(response => {
      self.setState({ requests : response.data.requests});
      }).catch(error => {
        alert(error);
      });
      }

      console.log(this.state.ranges);
      console.log(this.state.requests);
    }
  
  
  getPrioritizers() {
    return this.state.ranges.map(function(range) {
        return(
            <div>
                <Prioritizer start={new Date(range.startDate)} end={new Date(range.endDate)} facility={range.facility}/>
            </div>
        );
    });
  }

  getRequests(facility, startDate, endDate) {

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