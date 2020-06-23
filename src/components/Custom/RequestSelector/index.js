import React from 'react';
import './FacilitiesSelector.css'

import {FormControl, InputLabel, Select, MenuItem, Button} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Stack from '../../UIzard/Stack';
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    //background: '#FFC0CB'
    background: {
      default: "#fafafa"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)"
    }
  },
});

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
      <ThemeProvider theme={darkTheme}>
        <div className='wrapper'>
            <Stack>
            <FormControl className='dropdownBox' style={{ backgroundColor: "#fafafa" }}> 
                <InputLabel style={{ color: 'rgba(0, 0, 0, 0.26)', backgroundColor: "#fafafa" }}>Facility</InputLabel>
                <Select
                    value={this.state.facility}
                    onChange={event => {this.setState({facility: event.target.value})}}
                    style={{ backgroundColor: "#fafafa" }}
                >
                    <MenuItem value={"TAMU"} style={{ backgroundColor: "#fafafa" }}>TAMU</MenuItem>
                    <MenuItem value={"NSRL"} style={{ backgroundColor: "#fafafa" }}>NSRL</MenuItem>
                    <MenuItem value={"LBNL"} style={{ backgroundColor: "#fafafa" }}>LBNL</MenuItem>
                </Select>
            </FormControl>
            <br/>
            <br/>
            <Button onClick={this.routeToForm}>Submit</Button>
            </Stack>
        </div>
      </ThemeProvider>
    );
  }
}

export default withRouter(FacilitiesSelector);