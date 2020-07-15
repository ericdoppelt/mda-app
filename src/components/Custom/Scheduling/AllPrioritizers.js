import React from 'react';
import axios from 'axios';
import Prioritizer from './Prioritizer';

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
    await axios.get(url, {
      headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
    }).then(response => {
      self.setState({ requests : response.data.requests});
      }).catch(error => {
        alert(error);
      });
      }
      console.log("info");
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
    let rangeStart = new Date(start);
    let rangeEnd =  new Date(end);
    let possibleRequests = this.getRequests(facility, rangeStart);
    return <Prioritizer
      start={rangeStart} 
      end={rangeEnd} 
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
    return(
        <div>
            {this.getPrioritizers()}
        </div>
    
    );
  }
}

export default AllPrioritizers;