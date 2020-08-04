import React from 'react';
import axios from 'axios';
import Prioritizer from './Prioritizer';
import SchedulingStore from '../../../../stores/SchedulingStore';
import {Typography, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  rangeSelector: {
    marginBottom: '30px',
    width: '60%',
  },
});

class AllPrioritizers extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          ranges: [],
          requests: [],
          displayedRange: '',
          loaded: false,
      }
    }

  async componentDidMount() {
    if ((window.sessionStorage.getItem("access_token") === null)){
      window.sessionStorage.setItem("next_page", '/scheduler');
      this.props.history.push('user-login');
    }
    else {
    let  url = 'https://mda-phoenix.herokuapp.com/getforms/integrator';
    await axios.get(url, {
      headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
    }).then(response => {
      console.log("REQUESTS");
      console.log(response.data.requests);

      let validRequests = [];
      for (let i = 0; i < response.data.requests.length; i++) {
        let request = response.data.requests[i];
        if (request.status === "Approved" && request.scheduledStart === null) {
          validRequests.push(request);
        }
      }
      console.log(validRequests);
      SchedulingStore.setRequests(validRequests);
    }).catch(error => {
      alert(error);
    });

    url = 'https://mda-phoenix.herokuapp.com/integrator/get-range';
    let self = this;
    await axios.get(url, {
      headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
    }).then(response => {
      let validRanges = [];
      let current = new Date();
      for (let i = 0; i < response.data.ranges.length; i++) {
        let range = response.data.ranges[i];
        let rangeStart = new Date(range.startDate);
        if (current < rangeStart) validRanges.push(range);
      }
      self.setState({ranges: validRanges});
    }).catch(error => {
        alert(error);
    });
      }
      this.setState({loaded: true});
    }


  getPrioritizer() {
    if (this.state.displayedRange != '') {
        return(
          <div>
            {this.createPrioritizer(this.state.displayedRange)}
          </div>
        );
    } else {
        return(
          <div>
            {/* <Skeleton variant="rect" width={400} height={400}/> */}
          </div>
      )
    }
  }

  createPrioritizer(range) {
    console.log(range);
    let prioritizer = (<Prioritizer
      start={range.startDate}
      end= {range.endDate}
      facility= {range.facility}
      hours = {range.hours}
      />);
    console.log(prioritizer);
    return prioritizer;
  }

  getMessage() {
    if (this.state.ranges === []) return <Typography variant='h4'>There are no upcoming ranges in ISEEU tied to your account!</Typography>;
    else if (this.state.requests === []) return <Typography variant='h4'>There are no upcoming requests tied to your account!</Typography>;
    else if (this.state.displayedRange === '') return <Typography variant='h4'>Please select a range!</Typography>;
  }

  getSelector() {
    let {classes} = this.props;
    return(
      <FormControl
        className={classes.rangeSelector}
        >
        <InputLabel>Select a Range</InputLabel>
        <Select
          value={this.state.displayedRange}
          onChange={(event) => {this.setState({displayedRange: event.target.value})}}
          >
          {this.state.ranges.map(function(range) {
          let start = new Date(range.startDate);
          let end = new Date(range.endDate);
          return <MenuItem value={range}>{start.toDateString()} to {end.toDateString()} at {range.facility} </MenuItem>
          })}
        </Select>
      </FormControl>
    );

  }

  render() {
    console.log("render");
    return(
        <div>
            {this.getMessage()}
            {this.getSelector()}
            {this.getPrioritizer()}
        </div>
    );
  }
}

export default withStyles(useStyles)(AllPrioritizers);
