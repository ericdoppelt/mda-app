import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Button,List, ListItem, ListItemText, Snackbar, TextField, Typography, Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@material-ui/core';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Row from '../../UIzard/Row';
import Paragraph from '../../../components/UIzard/Paragraph';
import Title from '../../../components/UIzard/Title';
import Card from '../../../components/UIzard/Card';
import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from '@material-ui/icons/ListAlt';
import {Alert, AlertTitle} from '@material-ui/lab';



const useStyles = theme => ({
  header: {
    marginTop: '5%',
  },
  table: {
    width: '100%',
    align: 'center',

  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#424242',
    color: theme.palette.common.white,
    marginBottom: '5%',
  },
  body: {
    fontSize: 14,
    marginBottom: '5%',
  },

}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const facilityLinks = {'':{info:'', request:''},
                       'Texas A&M': {info:'/facilities-tamu', request: '/request-tamu'},
                       'Lawrence Berkeley National Laboratory': {info:'/facilities-LBNL', request: '/request-LBNL'},
                       'NASA Space Radiation Laboratory': {info:'/facilities-NSRL', request: '/request-NSRL'},
                       'Michigan State University': {info:'/facilities-MSU', request: '/request-MSU'}}

class IonSearch extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      ion: "",
      minEnergy: 1,
      maxEnergy: "",
      facilities: [],
      errorMessage: "",
      submitted: false,

      ionError: false,
      ionErrorHelper: '',
      minEnergyError: false,
      minEnergyErrorHelper: '',
      maxEnergyError: false,
      maxEnergyErrorHelper: '',
      energyReverseError: [],
      noMatch: false,

    }
  }

  handleSearch(event) {
    this.setState({
      ionError: (this.state.ion === ''),
      maxEnergyError: (this.state.minEnergy === '' || this.state.maxEnergy === ''),
      minEnergyError: (this.state.minEnergy <= 0),
      energyReverseError: (this.state.minEnergy > this.state.maxEnergy),
    }, () => {
      if (this.state.ionError) this.setState({ionErrorHelper: "Please enter an ion"});
      if (this.state.maxEnergyError) this.setState({minEnergyError: true, minEnergyErrorHelper: "Please enter a minimum energy", maxEnergyErrorHelper: "Please enter a maximum energy"});
      if (this.state.minEnergyError) this.setState({minEnergyErrorHelper: "Minimum energy value must be positive"})
      if (this.state.energyReverseError) this.setState({minEnergyErrorHelper: "Min energy cannot be greater than max energy", maxEnergyErrorHelper: "Max energy cannot be less than min energy"});
      if(!(this.state.energyReverseError||this.state.ionError||this.state.minEnergyError||this.state.maxEnergyError)) this.submit(event);
    });
  }


  async submit(event) {
    event.preventDefault();
    this.setState({submitted:true});
    console.log("called");
    console.log(this.state.ion);
    let url = 'https://mda-phoenix.herokuapp.com/filterion';
    var self = this;
    await axios.post(url, {
      ion: self.state.ion,
      minEnergy: self.state.minEnergy,
      maxEnergy: self.state.maxEnergy
    }).then(response => {
      console.log(response);
      self.setState({facilities:response.data.result});
      console.log(response.data.result);
      if(response.data.result.length==0){
        this.setState({noMatch: true});
        console.log(this.state.noMatch);
      }
      else{this.setState({noMatch:false})}

    }).catch(error => {
        alert(error);
        console.log(error)
    });
  }

  getAlert() {
    if (this.state.noMatch) {
      return(
        <Snackbar
          open={this.state.noMatch}
          autoHideDuration={6000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          onClose={() => {this.setState({noMatch: false})}}
          >
          <Alert severity="warning">
            No matching ions
          </Alert>
        </Snackbar>
    );
    }
  }

    render() {
      const { classes } = this.props;
      return (
      <div style={{width:'75%',}}>
          <Typography className={classes.header} variant='h4'>Search Facilities by Energy and Ion</Typography>
          <br/>
          <Typography variant='body'>Enter ion atomic symbol and energy in MeV/amu to find matching facilities</Typography>
          <br/>
          <br/>
          <TextField
            id="outlined-basic"
            label="Ion"
            variant="outlined"
            onChange={event => {this.setState({ion: event.target.value, ionErrorHelper: '', ionError: false})}}
            error={this.state.ionError}
            helperText={this.state.ionErrorHelper}
            />

          <TextField
            id="outlined-basic"
            label="Min Energy"
            variant="outlined"
            onChange={event => {this.setState({minEnergy: event.target.value, minEnergyError: false, minEnergyErrorHelper: '',})}}
            error={this.state.minEnergyError}
            helperText={this.state.minEnergyErrorHelper}
            />

          <TextField
            id="outlined-basic"
            label="Max Energy"
            variant="outlined"
            onChange={event => {this.setState({maxEnergy: event.target.value, maxEnergyError: false, maxEnergyErrorHelper: '',})}}
            error={this.state.maxEnergyError}
            helperText={this.state.maxEnergyErrorHelper}
            />
            <br/>
          <Button variant="contained" style={{height: '50px', width: '150px', marginTop:'1%',}} onClick={(event) => this.handleSearch(event)}>
            Search
          </Button>
          <Typography><h3>Matching Facilities</h3></Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="Matching Facilities List">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Facility</StyledTableCell>
                  <StyledTableCell align="center">Ion : Energy<br/><small>(MeV/amu)</small></StyledTableCell>
                  <StyledTableCell align="center">Homepage</StyledTableCell>
                  <StyledTableCell align="center">Request Form</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {this.state.facilities.map((facDict, self) => (
                  <StyledTableRow key={facDict.facility}>
                    <StyledTableCell component="th" scope="row">{facDict.facility}</StyledTableCell>
                    <StyledTableCell align="center">
                      {facDict.ions.map(function(ion){
                        return(
                          <List>
                            <ListItem>
                              <ListItemText primary={ion}/>
                            </ListItem>
                          </List>
                        )
                      })}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button href={facilityLinks[facDict.facility].info}>
                      <HomeIcon/>
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button onClick={() => {self.props.history.push(facilityLinks[facDict.facility].request)}}>
                      <ListAltIcon/>
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br/><br/>
          {this.getAlert()}
        </div>
          );
  }
}

export default withStyles(useStyles, { withTheme: true })(IonSearch);
