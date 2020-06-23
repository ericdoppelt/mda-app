import React from 'react';
import './FacilitiesSelector.css'

import {FormControl, InputLabel, Select, MenuItem, Button} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Stack from '../../UIzard/Stack';
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


class FacilitiesSelector extends React.Component {

  constructor(props) {
    super(props);
    this.routeToForm = this.routeToForm.bind(this);
    this.state = {
      facility: ""
    }
  }
  
  routeToForm() {
    var facilityLowercase = this.state.facility.toLowerCase();
    var URL = "/request-" + facilityLowercase;
    console.log(URL);
    this.props.history.push(URL);
  }

  render() {
    return (
        <div className='wrapper'>
            <Stack>
            <FormControl className='dropdownBox' style={{ backgroundColor: "#fafafa" }}> 
                <InputLabel style={{ color: 'rgba(0, 0, 0, 0.26)', backgroundColor: "#fafafa" }}>Facility</InputLabel>
                <Select
                    value={this.state.facility}
                    onChange={event => {this.setState({facility: event.target.value})}}
                    style={{ backgroundColor: "#fafafa" }}
                >
                    <MenuItem value={"TAMU"}>TAMU</MenuItem>
                    <MenuItem value={"NSRL"}>NSRL</MenuItem>
                    <MenuItem value={"LBNL"}>LBNL</MenuItem>
                </Select>
            </FormControl>
            <br/>
            <br/>
            <Button onClick={this.routeToForm}>Submit</Button>
            </Stack>
        </div>
    );
  }
}

export default withRouter(FacilitiesSelector);