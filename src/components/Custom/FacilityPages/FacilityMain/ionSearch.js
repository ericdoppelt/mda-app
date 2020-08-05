import { Button, List, ListItem, ListItemText, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';



const useStyles = theme => ({
  header: {
    marginTop: '5%',
    marginBottom: '2%',
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
      backgroundColor: '#e0e0e0',
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#bdbdbd',
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
      minEnergy: "",
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
      energyReverseError: false,
      noMatch: false,
      validMinEnergyError: false,
      validMaxEnergyError: false,

    }
  }

  handleSearch(event) {
    this.setState({
      minEnergyErrorHelper: '',
      maxEnergyErrorHelper: '',
      ionError: (this.state.ion === ''),
      maxEnergyError: ( this.state.maxEnergy === ''),
      minEnergyError: (this.state.minEnergy === ''),
      validMinEnergyError: !(this.isNaturalNumber(this.state.minEnergy)),
      validMaxEnergyError: !(this.isNaturalNumber(this.state.maxEnergy)),
      energyReverseError: (parseFloat(this.state.minEnergy) > parseFloat(this.state.maxEnergy)),
    }, () => {
      if (this.state.ionError) this.setState({ionErrorHelper: "Please enter an ion"});
      if (this.state.maxEnergyError) this.setState({ maxEnergyErrorHelper: "Please enter a maximum energy"});
      else if (this.state.validMaxEnergyError) this.setState({maxEnergyError: true, maxEnergyErrorHelper: "Energy must  be a positive integer",});
      if (this.state.minEnergyError) this.setState({minEnergyErrorHelper: "Please enter a minimum energy"})
      else if (this.state.validMinEnergyError) this.setState({minEnergyError: true,  minEnergyErrorHelper: "Energy must be a positive integer",});
      if (this.state.energyReverseError && (!this.state.validMinEnergyError &&  !this.state.validMaxEnergyError)) this.setState({minEnergyError: true, maxEnergyError: true, minEnergyErrorHelper: "Min energy cannot be greater than max energy", maxEnergyErrorHelper: "Max energy cannot be less than min energy"});
      if(!(this.state.validMinEnergyError|| this.state.validMaxEnergyError || this.state.energyReverseError||this.state.ionError||this.state.minEnergyError||this.state.maxEnergyError)) this.submit(event);
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
      if(response.data.result.length===0){
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

    isNaturalNumber(energy) {
      let energyRegex = new RegExp('^[1-9]+[0-9]*$');
      return energyRegex.test(energy);
    }

    render() {
      const { classes } = this.props;
      var self = this;
      return (
      <div style={{width:'75%',}}>
          <Typography className={classes.header} variant='h4'>Search Facilities by Energy and Ion</Typography>
          <Typography variant='body1' className={classes.header}>Enter ion atomic symbol (case sensitive) and energy in MeV/amu to find matching facilities</Typography>
          <TextField
            id="outlined-basic1"
            label="Ion"
            variant="outlined"
            onChange={event => {this.setState({ion: event.target.value, ionErrorHelper: '', ionError: false})}}
            error={this.state.ionError}
            helperText={this.state.ionErrorHelper}
            />

          <TextField
            id="outlined-basic2"
            label="Min Energy"
            variant="outlined"
            onChange={event => {this.setState({minEnergy: event.target.value, energyReverseError:false, minEnergyError: false, validEnergyError: false, minEnergyErrorHelper: '',})}}
            error={this.state.minEnergyError}
            helperText={this.state.minEnergyErrorHelper}
            />

          <TextField
            id="outlined-basic3"
            label="Max Energy"
            variant="outlined"
            onChange={event => {this.setState({maxEnergy: event.target.value, energyReverseError: false, maxEnergyError: false, validEnergyError: false, maxEnergyErrorHelper: '',})}}
            error={this.state.maxEnergyError}
            helperText={this.state.maxEnergyErrorHelper}
            />
            <br/>
          <Button variant="contained" style={{align: 'center', height: '50px', width: '150px', marginTop:'1%', marginBottom:'5%'}} onClick={(event) => this.handleSearch(event)}>
            Search
          </Button>
          <Typography variant="h4" style={{marginBottom:'3%'}} >Matching Facilities</Typography>
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
              {this.state.facilities.map((facDict) => (
                  <StyledTableRow key={facDict.facility}>
                    <StyledTableCell align="center" component="th" scope="row">{facDict.facility}</StyledTableCell>
                    <StyledTableCell align="center">
                      {facDict.ions.map(function(ion){
                        return(
                          <List>
                            <ListItem>
                              <ListItemText align="center" primary={ion}/>
                            </ListItem>
                          </List>
                        )
                      })}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button onClick={() => {self.props.history.push(facilityLinks[facDict.facility].info)}}>
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
          <br/><br/>
          {this.getAlert()}
        </div>
          );
  }
}

export default withRouter(withStyles(useStyles, { withTheme: true })(IonSearch));
