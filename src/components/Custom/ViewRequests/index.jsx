import React from 'react'
import axios from 'axios';
import './ViewRequests.scss'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Row from '../../UIzard/Row'

const columns = [
  { id: 'name', label: 'Name', minWidth: 130 },
  {
    id: 'facility',
    label: 'Facility',
    minWidth: 120,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'integrator',
    label: 'Integrator',
    minWidth: 120,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'company',
    label: 'Company',
    minWidth: 120,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'viewMore',
    label: '',
    minWidth: 120,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, facility, integrator, company, 
    poNum, address, city, email, energies, funding_cell,
    funding_contact, funding_email, ions, phone, startDate, state, zipCode) {
  var viewMore = 'View More'
  return { name, facility, integrator, company, viewMore, 
    poNum, address, city, email, energies, funding_cell,
    funding_contact, funding_email, ions, phone, startDate, state, zipCode };
}

const oldrows = [/*
  createData('James James', 'MSU', 'MDA', 'Boeing',
    'NA','NA','NA','NA','NA','NA','NA','NA','NA','NA','NA','NA','NA'),
  createData('Jim Jim', 'TAMU', 'MDA', 'Boeing',
    ),
  createData('Kim Kim', 'TAMU', 'MDA', 'Aerospace Corp.'),
  createData('Michael McKenna', 'NSRL', 'MDA', 'MDA'),
  createData('Jodi Jansen', 'LBNL', 'MDA', 'MDA'),
  createData('Sam Sam', 'LBNL', 'MDA', 'UTC'),
  createData('Sam Sam', 'MSU', 'MDA', 'UTC'),
  createData('Ken Ken', 'MSU', 'MDA', 'Aerospace Corp.'),
  createData('Bridget Bridget', 'TAMU', 'MDA', 'Boeing'),
  createData('Joan Joan', 'TAMU', 'MDA', 'Aerospace Corp.'),
  createData('Tim Tim', 'NSRL', 'MDA', 'UTC'),
  createData('Jamie Jamie', 'NSRL', 'MDA', 'MDA'),
  createData('Anna Anna', 'NSRL', 'MDA', 'UTC'),
  createData('Jane Jane', 'NSRL', 'MDA', 'Aerospace Corp.'),
  createData('Jan Jan', 'NSRL', 'MDA', 'Aerospace Corp.'),*/
];

const rows = [];

const MAXTABLEWIDTH = 650;
const useStyles = theme => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
    maxWidth: MAXTABLEWIDTH,
  },
  leftTextField: {
    marginLeft: '5%',
    marginRight: '3%',
    marginTop: '2px',
    width: '42%',
  },
  rightTextField: {
    marginLeft: '3%',
    marginRight: '5%',
    marginTop: '2px',
    width: '42%',
  },
  billingAddress: {
    marginLeft: '5%',
    marginRight: '3%',
    marginTop: '2px',
    width: '64%',
  },
  poNumber: {
    marginLeft: '3%',
    marginRight: '5%',
    marginTop: '2px',
    width: '20%',
  },
  billingCity: {
    marginLeft: '5%',
    marginRight: '3%',
    marginTop: '2px',
    width: '29%',
  },
  billingState: {
    marginLeft: '3%',
    marginRight: '3%',
    marginTop: '2px',
    width: '29%',
  },
  billingZip: {
    marginLeft: '3%',
    marginRight: '5%',
    marginTop: '2px',
    width: '20%',
  },
});


class ViewRequests extends React.Component {

  /*** INITIALIZE STATE VARIABLES ***/
  calendarComponentRef = React.createRef();
  
  constructor(props) {
    super(props);
    /*** LIST OF DATES ***/
    this.state = {
      name: "",
      facility: "",
      integrator: "",
      company: "",
      totalTime: "",
      startDate: "",
      cannotRun: "",
      poNum: "",
      address: "",
      city: "",
      email: "",
      energies: "",
      funding_cell: "",
      funding_contact: "",
      funding_email: "",
      ions: "",
      phone: "",
      state: "",
      zipCode: "",
      message: "",
      data: [],
      oldrows: oldrows,
      page: 0,
      rowsPerPage: 10,
      component: "table",
    }
  }

  newRows = [];
  tester;
  
  /*** COLLECT CALENDAR DATA FROM HEROKU ***/
  async componentDidMount(username) {
    const url = "https://mda-phoenix.herokuapp.com/getforms";
    let self = this;
    let result;
    await axios.post(url, {"name": "Rob"}).then(response => {
      result = response.data.requests;
      //console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
    console.log(result);
    result.forEach(function(entry) {
      //console.log(entry);
      self.setState(state=>({oldrows: [ 
        createData(entry.name, entry.facility, entry.integrator, entry.company,
          entry.PO_number, entry.address, entry.city, entry.email, entry.energies, entry.funding_cell,
          entry.funding_contact, entry.funding_email, entry.ions, entry.phone, entry.start, entry.state, entry.zipcode),
        ...state.oldrows]}))
      //self.state.oldrows.push(createData(entry.name, entry.facility, entry.integrator, entry.company))
    });
    console.log(self.state.oldrows);
  }

  viewMore(row) {
    return(
      <Button 
            id="button" 
            variant="contained"
            style={{width: '100px', height: '30px', fontSize: '12px'}}
            onClick={(event) => this.handleViewMore(row)}
          >
            View More
      </Button>
    );
  }

  handleViewMore(row) {
    this.setState(state=>({
      name: row.name,
      facility: row.facility,
      company: row.company,
      integrator: row.integrator,
      poNum: row.poNum,
      address: row.address,
      city: row.city,
      email: row.email,
      energies: row.energies,
      funding_cell: row.funding_cell,
      funding_contact: row.funding_contact,
      funding_email: row.funding_email,
      ions: row.ions,
      phone: row.phone,
      startDate: row.startDate,
      state: row.state,
      zipCode: row.zipCode,
      component: "view",
    }))
    console.log(row)
    console.log(row.name)
    console.log(this.state.integrator)
  }

  handleBack() {
    this.setState(state=>({
      component: "table",
    }))
  }

  async handleApprove() {
    const url = "https://mda-phoenix.herokuapp.com/calendar-entry";
    let self = this;
    let result;

    console.log('checking state')
    console.log(self.state.facility)
    console.log(self.state.integrator)
    console.log(self.state.startDate)

    await axios.post(url, {
      "username" : "test123",
      "facility" : self.state.facility,
      "integrator" : self.state.integrator,
      "totalTime" : 8,
      "startDate" : self.state.startDate,
      "title" : "",
      "private" : false,
      headers: {Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}`}
      }).then(response => {
        result = response.data.requests;
        console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
    this.setState(state=>({
      //component: "table",
      message: "The form has been approved and added to the calendar.",
    }))
  }

  /*** RENDER CALENDAR APPEARANCE ***/
  render() {

    const { classes } = this.props;
    const handleChangePage = (event, newPage) => {
      this.setState({page: newPage});
    };
    const handleChangeRowsPerPage = (event) => {
      this.setState({rowsPerPage: this.state.rowsPerPage + event.target.value})
      this.setState({page: 0});
    };

    const page = this.state.page;
    const rowsPerPage = this.state.rowsPerPage;
    
    if (this.state.component === 'view') {
      return(
        <div>
          <Row style={{maxWidth: MAXTABLEWIDTH, justifyContent:'flex-end'}}>
            {this.state.message}
          </Row>
          <br/>
            <Row >
              <TextField
                label="Facility"
                className={classes.leftTextField}
                id="standard-read-only-input"
                defaultValue={this.state.facility}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Button 
                className={classes.rightTextField}
                id="button" 
                variant="contained"
                style={{width: '100px', height: '30px', fontSize: '12px'}}
                onClick={(event) => this.handleBack()}
              >
                Return
              </Button>
            </Row>
            <br/>
            <Box>Contact and Funding Information</Box>
            <br/>
            <TextField
              label="Name"
              className={classes.leftTextField}
              id="standard-read-only-input"
              defaultValue={this.state.name}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField 
              label = "Company"
              className={classes.rightTextField}
              id="standard-read-only-input"
              defaultValue={this.state.company}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField 
              label = "Email"
              className={classes.leftTextField}
              id="standard-read-only-input"
              defaultValue={this.state.email}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField 
              label = "Phone"
              className={classes.rightTextField}
              id="standard-read-only-input"
              defaultValue={this.state.phone}
              InputProps={{
                readOnly: true,
              }}
            />
            <br/>
            <br/>
            <TextField 
              label = "Integrator"
              className={classes.leftTextField}
              id="standard-read-only-input"
              defaultValue={this.state.integrator}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField 
              label = "Funding Contact"
              className={classes.rightTextField}
              id="standard-read-only-input"
              defaultValue={this.state.funding_contact}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField 
              label = "Funding Contact Phone"
              className={classes.leftTextField}
              id="standard-read-only-input"
              defaultValue={this.state.funding_cell}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField 
              label = "Funding Contact Email"
              className={classes.rightTextField}
              id="standard-read-only-input"
              defaultValue={this.state.funding_email}
              InputProps={{
                readOnly: true,
              }}
            />
            <br/>
            <br/>
            <TextField 
              label = "Billing Address"
              className={classes.billingAddress}
              id="standard-read-only-input"
              defaultValue={this.state.address}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField 
              label = "P.O. No."
              className={classes.poNumber}
              id="standard-read-only-input"
              defaultValue={this.state.poNum}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField 
              label = "City"
              className={classes.billingCity}
              id="standard-read-only-input"
              defaultValue={this.state.city}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField 
              label = "State"
              className={classes.billingState}
              id="standard-read-only-input"
              defaultValue="New York"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField 
              label = "Zip"
              className={classes.billingZip}
              id="standard-read-only-input"
              defaultValue={this.state.zipCode}
              InputProps={{
                readOnly: true,
              }}
            />
            <br/><br/>
            <Box>Experiment Information</Box>
            <TextField 
              label = "Energies"
              className={classes.leftTextField}
              id="standard-read-only-input"
              defaultValue={this.state.energies}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField 
              label = "Ions"
              className={classes.rightTextField}
              id="standard-read-only-input"
              defaultValue={this.state.ions}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField 
              label = "Start Date"
              className={classes.leftTextField}
              id="standard-read-only-input"
              defaultValue={this.state.startDate}
              InputProps={{
                readOnly: true,
              }}
            />

            <br/><br/><br/>

            <Row style={{maxWidth: MAXTABLEWIDTH, justifyContent: 'center'}}>
              <Button 
                id="button" 
                variant="contained"
                style={{width: '100px', height: '30px', fontSize: '12px', margin:'0 30px'}}
                onClick={(event) => this.handleApprove()}
                color="primary"
              >
                Approve
              </Button>

              <Button 
                id="button" 
                variant="contained"
                style={{width: '100px', height: '30px', fontSize: '12px', margin:'0 30px'}}
                onClick={(event) => this.handleBack()}
              >
                Modify
              </Button>
              <Button 
                id="button" 
                variant="contained"
                style={{width: '100px', height: '30px', fontSize: '12px', margin:'0 30px'}}
                onClick={(event) => this.handleBack()}
                color="secondary"
              >
                Reject
              </Button>
            </Row>
            <br/><br/><br/><br/>
        </div>
      );
    } else {
      return (
        <div className='view-requests'>
          <div className='view-requests-inner'>
            <Paper className={classes.root}>
              <TableContainer className={classes.container} >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.oldrows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      return (
                        
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            if(column.id === 'viewMore') {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {this.viewMore(row)}
                                </TableCell>
                              )
                            } else {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number' ? column.format(value) : value}
                                </TableCell>
                              );
                            }
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                style={{ backgroundColor: 'white' }}
              />
            </Paper>
            <br/><br/>
          </div>
        </div>
      )
    }
    
  }

}

export default withStyles(useStyles)(ViewRequests)