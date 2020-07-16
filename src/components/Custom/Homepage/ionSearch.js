import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Box, Button,List, ListItem, ListItemText, TextField, Typography, Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@material-ui/core';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Row from '../../UIzard/Row';
import Paragraph from '../../../components/UIzard/Paragraph';
import Title from '../../../components/UIzard/Title';
import Card from '../../../components/UIzard/Card';
import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from '@material-ui/icons/ListAlt';


const useStyles = theme => ({
  header: {
    marginTop: '5%',
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
    this.handleSearch= this.handleSearch.bind(this);

    this.state = {
      ion: "",
      minEnergy: "",
      maxEnergy: "",
      facilities: [],
      errorMessage: "",
      submitted: false,
    }
  }

  async handleSearch(event) {
    event.preventDefault();
    this.setState({submitted:true});
    console.log("called");
    console.log(this.state.ion);
    console.log(this.state.energy);
    let url = 'https://mda-phoenix.herokuapp.com/filterion';
    var self = this;
    await axios.post(url, {
      ion: self.state.ion,
      minEnergy: self.state.minEnergy,
      maxEnergy: self.state.maxEnergy
    }).then(response => {
      console.log(response);
      self.setState({facilities:response.data.result});

    }).catch(error => {
        alert(error);
        console.log(error)
    });
  }

    render() {
      const { classes } = this.props;
      return (

      <div className="ionsearch">
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Typography className={classes.header} variant='h4'>Search Facilities by Energy and Ion</Typography>

        </Row>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Box>Enter ion atomic symbol and energy in MeV/amu to find matching facilities</Box>
        </Row>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <TextField
            id="outlined-basic"
            label="Ion"
            variant="outlined"
            onChange={event => {this.setState({ion: event.target.value})}}
            />

          <TextField
            id="outlined-basic"
            label="Min Energy"
            variant="outlined"
            onChange={event => {this.setState({minEnergy: event.target.value})}}
            />

          <TextField
            id="outlined-basic"
            label="Max Energy"
            variant="outlined"
            onChange={event => {this.setState({maxEnergy: event.target.value})}}
            />
          </Row>
          <Button variant="contained" style={{height: '50px', width: '150px'}} onClick={(event) => this.handleSearch(event)}>
            Search
          </Button>
          <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Typography><h3>Matching Facilities</h3></Typography>
          </Row>

          <TableContainer component={Paper}>
            <Table aria-label="Matching Facilities List">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Facility</StyledTableCell>
                  <StyledTableCell align="right">Ion : Energy <small>(MeV/amu)</small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">Homepage</StyledTableCell>
                  <StyledTableCell align="right">Request Form</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {this.state.facilities.map(function(facDict){
                return(  <StyledTableRow key={facDict.facility}>
                    <StyledTableCell component="th" scope="row">{facDict.facility}</StyledTableCell>
                    <StyledTableCell align="right">
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
                    <StyledTableCell align="right">
                      <Button href={facilityLinks[facDict.facility].info}>
                      <HomeIcon/>
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button  href={facilityLinks[facDict.facility].request}>
                      <ListAltIcon/>
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                )})}
              </TableBody>
            </Table>
          </TableContainer>
          <br/><br/>
        </div>
          );
  }
}

export default withStyles(useStyles, { withTheme: true })(IonSearch);
