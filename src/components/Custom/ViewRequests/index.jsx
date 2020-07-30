import React from 'react'
import axios from 'axios';
import './ViewRequests.scss'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Skeleton from '@material-ui/lab/Skeleton';
import Row from '../../UIzard/Row'
import Image from '../../../components/UIzard/Image';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const columns = [
  { id: 'name', label: 'Name', width: 200 },
  {
    id: 'facility',
    label: 'Facility',
    width: 80,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'integrator',
    label: 'Integrator',
    width: 80,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'company',
    label: 'Company',
    width: 80,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'status',
    label: 'Status',
    width: 80,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'viewMore',
    label: '',
    width: 80,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(id, name, status, facility, integrator, company, 
    poNum, address, city, email, energies, funding_cell,
    funding_contact, funding_email, ions, phone, startDate, state, zipCode, rejectNote) {
  var viewMore = 'View More'
  //var status = 'Pending'
  return { id, name, status, facility, integrator, company, viewMore, 
    poNum, address, city, email, energies, funding_cell,
    funding_contact, funding_email, ions, phone, startDate, state, zipCode, rejectNote };
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const oldrows = [];

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
    this.handleDialog= this.handleDialog.bind(this);
    this.handleApproveSnackClose = this.handleApproveSnackClose.bind(this);
    this.handleModifySnackClose = this.handleModifySnackClose.bind(this);
    this.handleRejectSnackClose = this.handleRejectSnackClose.bind(this);
    this.tableView = this.tableView.bind(this);
    this.viewRequestsHeader = this.viewRequestsHeader.bind(this);
    /*** LIST OF DATES ***/
    this.state = {
      id: "",

      /*** ORIGINAL DATA ***/
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
      status: "",

      /*** MODIFIED DATA ***/
      nameNew: "",
      facilityNew: "",
      integratorNew: "",
      companyNew: "",
      totalTimeNew: "",
      startDateNew: "",
      cannotRunNew: "",
      poNumNew: "",
      addressNew: "",
      cityNew: "",
      emailNew: "",
      energiesNew: "",
      funding_cellNew: "",
      funding_contactNew: "",
      funding_emailNew: "",
      ionsNew: "",
      phoneNew: "",
      stateNew: "",
      zipCodeNew: "",
      statusNew: "",

      /*** ETC ***/
      loggedAffiliation: "",
      isAuthenticatedIntegrator: false,
      rejectNote: "",
      dialogOpen: false,
      approveSnackOpen: false,
      modifySnackOpen: false,
      rejectSnackOpen: false,
      message: "",
      data: [],
      modifyBool: false,
      oldrows: oldrows,
      entryCount: 0,
      page: 0,
      rowsPerPage: 10,
      component: "",
    }
  }

  newRows = [];
  tester;
  
  // Collects request form data.
  async componentDidMount() {
    let url = "https://mda-phoenix.herokuapp.com/getforms/integrator";
    let self = this;
    let result;
    await axios.get(url, 
      {headers: {Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}`}}
      ).then(response => {
      result = response.data.requests;
      console.log(response.data);
      let tempRows = [];
      result.forEach(function(entry) {
        //console.log(entry);
        tempRows.push(createData(entry.id, entry.name, entry.status, entry.facility, entry.integrator, entry.company,
          entry.PO_number, entry.address, entry.city, entry.email, entry.energies, entry.funding_cell,
          entry.funding_contact, entry.funding_email, entry.ions, entry.phone, entry.start, entry.state, entry.zipcode, entry.rejectNote))
      });
      self.setState(state=>({oldrows: tempRows, entryCount: tempRows.length}))
    })
    .catch(error => {
      console.log(error);
    });

    url = 'https://mda-phoenix.herokuapp.com/user';
    await axios.get(url, {
      headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
      }).then(response => {
      console.log(response.data);
      self.setState({
        loggedAffiliation: response.data.affiliation,
        isAuthenticatedIntegrator: response.data.isAuthenticatedIntegrator,
      });
      }).catch(error => {
        console.log("error");
        console.log(error);
    });


    self.setState({component: "table"})
    //console.log(result);


  }

  // Used to view form information.
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
      id: row.id,
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
      status: row.status,

      nameNew: row.name,
      facilityNew: row.facility,
      companyNew: row.company,
      integratorNew: row.integrator,
      poNumNew: row.poNum,
      addressNew: row.address,
      cityNew: row.city,
      emailNew: row.email,
      energiesNew: row.energies,
      funding_cellNew: row.funding_cell,
      funding_contactNew: row.funding_contact,
      funding_emailNew: row.funding_email,
      ionsNew: row.ions,
      phoneNew: row.phone,
      startDateNew: row.startDate,
      stateNew: row.state,
      zipCodeNew: row.zipCode,
      statusNew: row.status,

      rejectNote: row.rejectNote,
      component: "view",
    }))
  }

  handleBack() {
    this.setState(state=>({
      component: "table",
      modifyBool: false,
    }))
  }

  async handleApprove() {
    let url = "https://mda-phoenix.herokuapp.com/request/modify";
    let self = this;
    let vars = {
      id: self.state.id, 
    }
    await axios.post(url, vars,
      {headers: {Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}`}}
      ).then(response => {
      console.log(response);
      //self.setState({modifyBool: false, component: "table"});
    })
    .catch(error => {
      console.log(error);
    });

    url = "https://mda-phoenix.herokuapp.com/calendar-entry";

    await axios.post(url, {
      "username" : self.state.name,
      "facility" : self.state.facility,
      "integrator" : self.state.integrator,
      "totalTime" : 8,
      "startDate" : self.state.startDate,
      "title" : "approval test",
      "private" : false,
      headers: {Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}`}
      }).then(response => {
        this.setState(state=>({
          //component: "table",
          approveSnackOpen: true,
          message: "The form has been approved and added to the calendar.",
        }))
        self.componentDidMount();
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleModify () {
    this.setState({
      modifyBool: !this.state.modifyBool
    });
    console.log("Modify true")
  }

  async handleApproveChanges () {

    const url = "https://mda-phoenix.herokuapp.com/request/modify";
    let self = this;
    let vars = {
      id: self.state.id, 
      name: self.state.nameNew,
      facility: self.state.facilityNew,
      company: self.state.companyNew,
      integrator: self.state.integratorNew,
      PO_number: self.state.poNumNew,
      address: self.state.addressNew,
      city: self.state.cityNew,
      email: self.state.emailNew,
      //energies: self.state.energiesNew,
      funding_cell: self.state.funding_cellNew,
      funding_contact: self.state.funding_contactNew,
      funding_email: self.state.funding_emailNew,
      //ions: self.state.ionsNew,
      phone: self.state.phoneNew,
      start: self.state.startDateNew,
      state: self.state.stateNew,
      zipCode: self.state.zipCodeNew,
      //status: self.state.statusNew,
    }
    console.log(vars);
    await axios.post(url, vars,
      {headers: {Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}`}}
      ).then(response => {
      console.log(response);
      self.componentDidMount();
      self.setState({
        modifyBool: !this.state.modifyBool,
        modifySnackOpen: true,
      });
      //self.setState({modifyBool: false, component: "table"});
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleDialog () {
    this.setState( {dialogOpen: !this.state.dialogOpen} );
  }

  handleApproveSnackClose () {
    this.setState({approveSnackOpen: false})
  }

  handleModifySnackClose () {
    this.setState({modifySnackOpen: false})
  }

  handleRejectSnackClose () {
    this.setState({rejectSnackOpen: false})
  }

  async handleReject () {
    const url = "https://mda-phoenix.herokuapp.com/request/reject";
    let self = this;
    await axios.post(url, {id: self.state.id, rejectNote: self.state.rejectNote},
      {headers: {Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}`}}
      ).then(response => {
      console.log(response);
      self.handleDialog();
      self.componentDidMount();
      self.setState({rejectSnackOpen: true});
      //self.setState({modifyBool: false, component: "table"});
    })
    .catch(error => {
      console.log(error);
    });
  }

  showButtons () {
    if (this.state.modifyBool) {
      return (
        <div>
          <Row style={{maxWidth: MAXTABLEWIDTH, justifyContent: 'center'}}>
            <Button 
              id="button" 
              variant="contained"
              style={{width: '160px', height: '40px', fontSize: '12px', margin:'0 30px'}}
              onClick={(event) => this.handleApproveChanges()}
              color="primary"
            >
              Approve Changes
            </Button>

            <Button 
              id="button" 
              variant="contained"
              style={{width: '100px', height: '40px', fontSize: '12px', margin:'0 30px'}}
              onClick={(event) => this.handleModify()}
            >
              Cancel
            </Button>
          </Row>
        </div>
      );
    } else {
      return (
        <div>
          <Row style={{maxWidth: MAXTABLEWIDTH, justifyContent: 'center'}}>
            <Button 
              id="button" 
              variant="contained"
              style={{width: '100px', height: '40px', fontSize: '12px', margin:'0 30px'}}
              onClick={(event) => this.handleApprove()}
              color="primary"
            >
              Approve
            </Button>

            <Button 
              id="button" 
              variant="contained"
              style={{width: '100px', height: '40px', fontSize: '12px', margin:'0 30px'}}
              onClick={(event) => this.handleModify()}
            >
              Modify
            </Button>
            <Button 
              id="button" 
              variant="contained"
              style={{width: '100px', height: '40px', fontSize: '12px', margin:'0 30px'}}
              onClick={(event) => this.handleDialog()}
              color="secondary"
            >
              Reject
            </Button>
          </Row>
        </div>
      )
    }
    
  }

  viewRequestsHeader () {

    // set logo image
    let logo = <Image style={{ width: '200px', height: '200px', backgroundImage: 'url(/images/ISEEULogo.png)', justifyContent:'center' }} />;
    if (this.state.loggedAffiliation === 'MDA') {
      logo = <Image style={{ width: '200px', height: '200px', backgroundImage: 'url(/images/MDALogo.png)', justifyContent:'center' }} />
    } else if (this.state.loggedAffiliation === 'NASA') {
      logo = <Image style={{ width: '200px', height: '200px', backgroundImage: 'url(/images/NASALogo.png)', justifyContent:'center' }} />
    }

    return (
      <div>
        <Row style={{justifyContent: 'center'}}>
          {logo}
        </Row>
        <br/>
        <Typography variant="h6">
          Beam Request Forms for {this.state.loggedAffiliation}
        </Typography>
        <br/><br/>
      </div>
    );
  }

  tableView () {
    let page = this.state.page;
    let rowsPerPage = this.state.rowsPerPage;

    if (this.state.oldrows.length > 0) {
      this.state.oldrows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
      })
    } else {
      return 'hello'
    }
  }


  /*** RENDER CALENDAR APPEARANCE ***/
  render() {

    const { classes } = this.props;
    const handleChangePage = (event, newPage) => {
      this.setState({page: newPage});
    };
    const handleChangeRowsPerPage = (event) => {
      this.setState({rowsPerPage: event.target.value})
      this.setState({page: 0});
    };

    let page = this.state.page;
    let rowsPerPage = this.state.rowsPerPage;

    const tableAndViewMaster = () => {
      if (this.state.component === 'view') {
        return(
            <div>
              {this.viewRequestsHeader()}
            
              <br/>
                <Row>
                  <TextField
                    label="Status"
                    className={classes.leftTextField}
                    id="standard-read-only-input"
                    defaultValue={this.state.status}
                    InputProps={{
                      readOnly: true
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
                {this.state.status === 'Rejected'
                  ? <div>
                      <Row style={{justifyContent: 'flex-start'}}>
                        <TextField
                          label="Rejection Reason"
                          className={classes.leftTextField}
                          id="standard-read-only-input"
                          defaultValue={this.state.rejectNote}
                          InputProps={{
                            readOnly: true
                          }}
                        />
                      </Row>
                      <br/>
                    </div>
                : null}
                
                <Row >
                  <TextField
                    label="Facility"
                    className={classes.leftTextField}
                    id="standard-read-only-input"
                    defaultValue={this.state.facility}
                    InputProps={{
                      readOnly: !this.state.modifyBool,
                    }}
                    onChange={event => {this.setState({facilityNew: event.target.value})}}
                    variant={this.state.modifyBool ? "outlined" : "standard"}
                  />
                  
                </Row>
                <br/>
                <Typography variant="h6">Contact and Funding Information</Typography>
                <br/>
                <TextField
                  label="Name"
                  className={classes.leftTextField}
                  id="standard-read-only-input"
                  defaultValue={this.state.name}
                  InputProps={{
                    readOnly: !this.state.modifyBool,
                  }}
                  onChange={event => {this.setState({nameNew: event.target.value})}}
                  variant={this.state.modifyBool ? "outlined" : "standard"}
                  margin={this.state.modifyBool ? "normal" : "none"}
                />
                <TextField 
                  label = "Company"
                  className={classes.rightTextField}
                  id="standard-read-only-input"
                  defaultValue={this.state.company}
                  InputProps={{
                    readOnly: !this.state.modifyBool,
                  }}
                  onChange={event => {this.setState({companyNew: event.target.value})}}
                  variant={this.state.modifyBool ? "outlined" : "standard"}
                  margin={this.state.modifyBool ? "normal" : "none"}
                />
                <TextField 
                  label = "Email"
                  className={classes.leftTextField}
                  id="standard-read-only-input"
                  defaultValue={this.state.email}
                  InputProps={{
                    readOnly: !this.state.modifyBool,
                  }}
                  onChange={event => {this.setState({emailNew: event.target.value})}}
                  variant={this.state.modifyBool ? "outlined" : "standard"}
                  margin={this.state.modifyBool ? "normal" : "none"}
                />
                <TextField 
                  label = "Phone"
                  className={classes.rightTextField}
                  id="standard-read-only-input"
                  defaultValue={this.state.phone}
                  InputProps={{
                    readOnly: !this.state.modifyBool,
                  }}
                  onChange={event => {this.setState({phoneNew: event.target.value})}}
                  variant={this.state.modifyBool ? "outlined" : "standard"}
                  margin={this.state.modifyBool ? "normal" : "none"}
                />
                <br/>
                <br/>
                <TextField 
                  label = "Integrator"
                  className={classes.leftTextField}
                  id="standard-read-only-input"
                  defaultValue={this.state.integrator}
                  InputProps={{
                    readOnly: !this.state.modifyBool,
                  }}
                  onChange={event => {this.setState({integratorNew: event.target.value})}}
                  variant={this.state.modifyBool ? "outlined" : "standard"}
                  margin={this.state.modifyBool ? "normal" : "none"}
                />
                <TextField 
                  label = "Funding Contact"
                  className={classes.rightTextField}
                  id="standard-read-only-input"
                  defaultValue={this.state.funding_contact}
                  InputProps={{
                    readOnly: !this.state.modifyBool,
                  }}
                  onChange={event => {this.setState({funding_contactNew: event.target.value})}}
                  variant={this.state.modifyBool ? "outlined" : "standard"}
                  margin={this.state.modifyBool ? "normal" : "none"}
                />
                <TextField 
                  label = "Funding Contact Phone"
                  className={classes.leftTextField}
                  id="standard-read-only-input"
                  defaultValue={this.state.funding_cell}
                  InputProps={{
                    readOnly: !this.state.modifyBool,
                  }}
                  onChange={event => {this.setState({funding_cellNew: event.target.value})}}
                  variant={this.state.modifyBool ? "outlined" : "standard"}
                  margin={this.state.modifyBool ? "normal" : "none"}
                />
                <TextField 
                  label = "Funding Contact Email"
                  className={classes.rightTextField}
                  id="standard-read-only-input"
                  defaultValue={this.state.funding_email}
                  InputProps={{
                    readOnly: !this.state.modifyBool,
                  }}
                  onChange={event => {this.setState({funding_emailNew: event.target.value})}}
                  variant={this.state.modifyBool ? "outlined" : "standard"}
                  margin={this.state.modifyBool ? "normal" : "none"}
                />
                <br/>
                <br/>
                <TextField 
                  label = "Billing Address"
                  className={classes.billingAddress}
                  id="standard-read-only-input"
                  defaultValue={this.state.address}
                  InputProps={{
                    readOnly: !this.state.modifyBool,
                  }}
                  onChange={event => {this.setState({billingAddressNew: event.target.value})}}
                  variant={this.state.modifyBool ? "outlined" : "standard"}
                  margin={this.state.modifyBool ? "normal" : "none"}
                />
                <TextField 
                  label = "P.O. No."
                  className={classes.poNumber}
                  id="standard-read-only-input"
                  defaultValue={this.state.poNum}
                  InputProps={{
                    readOnly: !this.state.modifyBool,
                  }}
                  onChange={event => {this.setState({poNumNew: event.target.value})}}
                  variant={this.state.modifyBool ? "outlined" : "standard"}
                  margin={this.state.modifyBool ? "normal" : "none"}
                />
                <TextField 
                  label = "City"
                  className={classes.billingCity}
                  id="standard-read-only-input"
                  defaultValue={this.state.city}
                  InputProps={{
                    readOnly: !this.state.modifyBool,
                  }}
                  onChange={event => {this.setState({cityNew: event.target.value})}}
                  variant={this.state.modifyBool ? "outlined" : "standard"}
                  margin={this.state.modifyBool ? "normal" : "none"}
                />
                <TextField 
                  label = "State"
                  className={classes.billingState}
                  id="standard-read-only-input"
                  defaultValue={this.state.state}
                  InputProps={{
                    readOnly: !this.state.modifyBool,
                  }}
                  onChange={event => {this.setState({stateNew: event.target.value})}}
                  variant={this.state.modifyBool ? "outlined" : "standard"}
                  margin={this.state.modifyBool ? "normal" : "none"}
                />
                <TextField 
                  label = "Zip"
                  className={classes.billingZip}
                  id="standard-read-only-input"
                  defaultValue={this.state.zipCode}
                  InputProps={{
                    readOnly: !this.state.modifyBool,
                  }}
                  onChange={event => {this.setState({zipCodeNew: event.target.value})}}
                  variant={this.state.modifyBool ? "outlined" : "standard"}
                  margin={this.state.modifyBool ? "normal" : "none"}
                />
                <br/><br/>
                <Typography variant="h6">Experiment Information</Typography>
                <TextField 
                  label = "Energies"
                  className={classes.leftTextField}
                  id="standard-read-only-input"
                  defaultValue={this.state.energies}
                  InputProps={{
                    readOnly: !this.state.modifyBool,
                  }}
                  onChange={event => {this.setState({energiesNew: event.target.value})}}
                  variant={this.state.modifyBool ? "outlined" : "standard"}
                  margin={this.state.modifyBool ? "normal" : "none"}
                />
                <TextField 
                  label = "Ions"
                  className={classes.rightTextField}
                  id="standard-read-only-input"
                  defaultValue={this.state.ions}
                  InputProps={{
                    readOnly: !this.state.modifyBool,
                  }}
                  onChange={event => {this.setState({ionsNew: event.target.value})}}
                  variant={this.state.modifyBool ? "outlined" : "standard"}
                  margin={this.state.modifyBool ? "normal" : "none"}
                />
                <TextField 
                  label = "Start Date"
                  className={classes.leftTextField}
                  id="standard-read-only-input"
                  defaultValue={this.state.startDate}
                  InputProps={{
                    readOnly: !this.state.modifyBool,
                  }}
                  onChange={event => {this.setState({startDateNew: event.target.value})}}
                  variant={this.state.modifyBool ? "outlined" : "standard"}
                  margin={this.state.modifyBool ? "normal" : "none"}
                />
    
                <br/><br/><br/>
    
                {this.showButtons()}
                <br/><br/><br/><br/>
    
                {/* Rejection Dialog */}
                <Dialog
                  open={this.state.dialogOpen}
                  onClose={this.handleDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <TextField
                        label="Enter the reason for rejection."
                        fullWidth
                        id="standard-read-only-input"
                        onChange={event => {this.setState({rejectNote: event.target.value})}}
                      />
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button 
                      id="button" 
                      variant="contained"
                      style={{width: '160px', height: '40px', fontSize: '12px', margin:'0 30px'}}
                      onClick={(event) => this.handleReject()}
                      color="secondary"
                    >
                      Confirm Rejection
                    </Button>
                    <Button 
                      id="button" 
                      variant="contained"
                      style={{width: '100px', height: '40px', fontSize: '12px', margin:'0 30px'}}
                      onClick={this.handleDialog}
                    >
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
            </div>
          );
        } else if (this.state.component === 'table') {
          return (
            
            <div className='view-requests'>
              {this.viewRequestsHeader()}
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
                        {this.state.oldrows.length > 0 
                          ? this.state.oldrows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
                          })
                          : <div style={{textAlign: 'center', display: 'inline-block'}}><br/>  No requests found for this account.<br/></div>
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={this.state.entryCount}
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
        } else {
          return ( //loading screen
            <div>
              <Row style={{justifyContent: 'center'}}>
                <Skeleton variant="circle" width={200} height={200} />
              </Row>
              <br/><br/>
              <Row style={{justifyContent: 'center'}}>
                <Skeleton variant="text" width={250} />
              </Row>
              <br/><br/>
              <Skeleton variant="rect" width={MAXTABLEWIDTH-100} height={50} />
              <br/><br/>
              <Skeleton variant="text"/>
              <br/><br/>
              <Skeleton variant="text" />
              <br/><br/>
              <Skeleton variant="text" />
              <br/><br/>
              <Skeleton variant="text" />
              <br/><br/>
              <Skeleton variant="text" />
              <br/><br/>
              <Skeleton variant="text" />
            </div>
          )
        }
    }

    const snackbarsComponent = () => {
      return (
        <div>
          {/* Snackbars */}
          <Snackbar 
            anchorOrigin={{vertical: 'top',horizontal: 'center'}}
            open={this.state.approveSnackOpen} 
            autoHideDuration={6000} 
            onClose={this.handleApproveSnackClose}
          >
            <Alert onClose={this.handleApproveSnackClose} severity="success">
              The form has been approved.
            </Alert>
          </Snackbar>
          <Snackbar 
            anchorOrigin={{vertical: 'top',horizontal: 'center'}}
            open={this.state.modifySnackOpen} 
            autoHideDuration={6000} 
            onClose={this.handleModifySnackClose}
          >
            <Alert onClose={this.handleModifySnackClose} severity="success">
              The form has been approved with modifications.
            </Alert>
          </Snackbar>
          <Snackbar 
            anchorOrigin={{vertical: 'top',horizontal: 'center'}}
            open={this.state.rejectSnackOpen} 
            autoHideDuration={6000} 
            onClose={this.handleRejectSnackClose}
          >
            <Alert onClose={this.handleRejectSnackClose} severity="error">
              The form has been rejected.
            </Alert>
          </Snackbar>
        </div>
      )
    }
    
    return (
      <div>
        {tableAndViewMaster()}
        {snackbarsComponent()}
      </div>
    );
  }

}

export default withStyles(useStyles)(ViewRequests)