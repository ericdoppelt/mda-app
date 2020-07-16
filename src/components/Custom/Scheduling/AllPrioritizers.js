import React from 'react';
import axios from 'axios';
import Prioritizer from './Prioritizer';
import SchedulingStore from '../../../stores/SchedulingStore';

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

    let  url = 'https://mda-phoenix.herokuapp.com/getforms/integrator';
    await axios.get(url, {
      headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
    }).then(response => {
      SchedulingStore.setRequests(response.data.requests);
    }).catch(error => {
      alert(error);
    });

    url = 'https://mda-phoenix.herokuapp.com/integrator/get-range';
    let self = this;
    await axios.get(url, {
      headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
    }).then(response => {
      self.setState({ranges: response.data.ranges});
    }).catch(error => {
        alert(error);
    });
      
    
      }
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
    return <Prioritizer
      start={start} 
      end={end} 
      facility={facility}
      />
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