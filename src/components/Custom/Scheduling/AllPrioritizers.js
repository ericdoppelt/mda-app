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
        console.log("ranges");
        alert(error);
    });
      
    url = 'https://mda-phoenix.herokuapp.com/getforms/integrator';
    await axios.get(url, {
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
    let self = this;
    return this.state.ranges.map(function(range) {
        return(
            <div>
                {self.createPrioritizer(range.startDate, range.endDate, range.facility)}
            </div>
        );
    });
  }

  createPrioritizer(start, end, facility) {
    let requestStartDate = new Date(start);
    let requestEndDate =  new Date(end);
    let possibleRequests = this.getRequests(facility, start);
    return <Prioritizer
      start={requestStartDate} 
      end={requestEndDate} 
      facility={facility}
      requests={possibleRequests}
      />
  }

  getRequests(facility, startDate) {
    let returnedRequests = [];
    for (let i = 0; i < this.state.requests.length; i++) {
        let tempRequest = this.state.requests[i];
        let tempStart = new Date(tempRequest.startDate);
        let tempFacility = tempRequest.facility;

        if (tempFacility === facility && tempStart < startDate) {
            returnedRequests.unshift(tempRequest);
        }
    }
    return returnedRequests;
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