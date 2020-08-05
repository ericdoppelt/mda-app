import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import axios from 'axios';
import "fullcalendar"
import './CalendarSched.scss'

import CardNoShadow from '../../../UIzard/CardNoShadow';
import Row from '../../../UIzard/Row';
import Stack from '../../../UIzard/Stack';

import {withStyles} from '@material-ui/core/styles';
import { Box, TextField, Button, Avatar} from '@material-ui/core';  
import SchedulingStore from '../../../../stores/SchedulingStore';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import ViewRequestsSched from '../../ViewRequestsSched'

// Checkbox items
const facilities = [
  'TAMU',
  'LBNL',
  'NSRL',
  'MSU'
]; 

const integrators = [
  'MDA',
  'NASA',
  'Independent',
]; 

const beamTypes = [
  'Heavy Ion',
  'Proton'
]; 

const colors = [
  '#2980b9',
  '#27ae60',
  '#8e44ad',
  '#f39c12',
  '#16a085',
  '#2c3e50',
  '#55efc4',
  '#81ecec',
  '#74b9ff',
  '#a29bfe',
  '#dfe6e9',
  '#ffeaa7',
  '#fab1a0',
  '#ff7675',
  '#fd79a8',
  '#34495e',
]

const downtimeColor = '#c0392b';

/* const eventSample = [
  ['TAMU','MDA','2020-07-20T00:00','10'],
  ['TAMU','MDA','2020-07-21T00:00','10'],
  ['TAMU','MDA','2020-07-22T00:00','15'],
  ['TAMU','MDA','2020-07-23T00:00','15'],
  ['TAMU','MDA','2020-07-24T00:00','20'],
] */

const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  select: {
    backgroundColor: '#000',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
    minWidth: '50vw',
    width: 1000,
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

/*
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
*/


class CalendarSched extends React.Component {

  /*** INITIALIZE STATE VARIABLES ***/
  calendarComponentRef = React.createRef();

  
  static defaultProps = {
    personal: false,
    facility: ['TAMU'],
  }
  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleCheckPersonal = this.handleCheckPersonal.bind(this);
    this.handleChangeFacilities = this.handleChangeFacilities.bind(this);
    this.handleChangeIntegrators = this.handleChangeIntegrators.bind(this);
    this.handleChangeBeamTypes = this.handleChangeBeamTypes.bind(this);
    this.handleDateSubmit = this.handleDateSubmit.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleEventClick = this.handleEventClick.bind(this);
    this.handleAddNewDialog = this.handleAddNewDialog.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.colorEvents = this.colorEvents.bind(this);
    
    let sampleProp = "null";
    if (this.props.samp !== null) {
      sampleProp = "not null"
    }

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
      address: "hello",
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
      rejectNote: "",

      username: "",
      sampleProp: sampleProp,
      data: [],
      facilities: facilities,
      integrators: integrators,
      beamTypes: beamTypes,
      checkedFacilities: facilities,
      checkedIntegrators: integrators,
      checkedBeamTypes: beamTypes,
      checkedPersonal: this.props.personal,
      checkedValues: facilities.concat(integrators).concat(beamTypes),
      calendarWeekends: true,
      colorsReady: false,
      calendarEvents: [ // initial event data
      ],
      calendarStartDate: new Date(),
      personalEvents: ["hello"],
      modalOpen: false,
      addNewOpen: false,
      addNewDate: new Date(),
      uniqueEnergies: [],
    }
  }

  makeUniqueEnergies(eventArray) {
    let tempEnergies = [];
    eventArray.forEach(function(event) {
      //Add beam energies to uniques
      if (event.energy !== undefined) {
        tempEnergies.push(event.energy);
      }
    })
    tempEnergies = tempEnergies.filter((v, i, a) => a.indexOf(v) === i).sort(); //make energies unique
    this.setState({uniqueEnergies: tempEnergies});
  }

  // Input - array of suggestions
  // Output - array of event objects with updated colors, names, companies
  colorEvents(eventArray) {
    let data = [];
    let self = this;
    eventArray.forEach(function(event) {
      let theColor;
      let titleString;
      let {name, company} = self.findNameAndCompany(event.id);
      if (event.energy === undefined) {
        theColor = downtimeColor;
        titleString = 'Tune Time';
      } else {
        theColor = colors[self.state.uniqueEnergies.indexOf(event.energy)];
        titleString = company + " - " + name;
      }
      data.push(self.makeEvent2(event.id, event.start, event.end, event.energy, titleString, theColor));
      if (event.start < self.state.calendarStartDate) {
        console.log('changing calendar start')
        self.setState({calendarStartDate: event.start});
      }
    })

    return data;
  }

  // Temporary fix - ideally get name and company from Prioritizer/Scheduler
  findNameAndCompany = (id) => {
    //console.log('finding name and company');
    //console.log(id);
    let {name, company} = [null, null]
    SchedulingStore.requests.forEach(function (form) {
      //console.log(form);
      if (form.id === id) {
        //console.log('found it');
        name = form.name;
        company = form.company;
      }
    })
    //console.log(name);
    //console.log(company);
    return {name, company};
  }

  
  
  /*** COLLECT CALENDAR DATA FROM HEROKU ***/
  async componentDidMount(username) {
    console.log('Generating Events')
    console.log(SchedulingStore);
    this.makeUniqueEnergies(SchedulingStore.suggestion)

    var data = [];
    var self = this;
    
    //console.log('Setting Start Date')
    //this.setState({calendarStartDate: SchedulingStore.suggestion[0].start});
    this.setState({ calendarStartDate: SchedulingStore.suggestion[0].start }, () => {
      console.log('setting start')
      console.log(SchedulingStore.suggestion[0].start)
      console.log(self.state.calendarStartDate);
      let calendarApi = this.calendarComponentRef.current.getApi()
      calendarApi.gotoDate(self.state.calendarStartDate);
    }); 
    //console.log(typeof SchedulingStore.suggestion[0].start);
    //console.log(typeof self.state.calendarStartDate)
    //console.log(self.dateStringConverter(self.state.calendarStartDate))

    data = this.colorEvents(SchedulingStore.suggestion)
    /*
    SchedulingStore.suggestion.forEach(function(event) {
      console.log(event)
      let theColor;
      let titleString;
      if (event.type === 'downtime') {
        theColor = downtimeColor;
        titleString = 'Tune Time';
      } else {
        theColor = colors[self.state.uniqueEnergies.indexOf(event.energy)];
        titleString = event.energy + " MeV";
      }
      console.log(event.energy)
      data.push(self.makeEvent2(event.start, event.end, event.energy, titleString, theColor));
      if (event.start < self.state.calendarStartDate) {
        console.log('changing calendar start')
        self.setState({calendarStartDate: event.start});
      }
    })
    */

    this.setState({
      calendarEvents: data, 
      colorsReady: true,
    });
    
  }


  /*** EVENT CREATOR FOR UPDATE FROM DATABASE ***/
  

  makeEvent = (facility, integrator, startDate, color) => {
    var titleString = facility + " - " + integrator;
    var endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 8);
    return { id: "1", extendedProps: {facility: facility, integrator: integrator, beamType: "Heavy Ion"}, 
    title: titleString, start: new Date(startDate), end: endDate, backgroundColor: color}
  };

  makeEvent2 = (id, startDate, endDate, energy, titleString, color) => {
    return { id: id, extendedProps: {facility: "TAMU", integrator: "MDA", beamType: "Heavy Ion"}, 
    title: titleString, start: startDate, end: endDate, backgroundColor: color, energy: energy}
  };

  makeEventColor = (facility) => {
    return facility==='TAMU' ? '#c0392b'
      : facility==='LBNL' ? '#2980b9'
      : facility==='MSU' ? '#27ae60'
      : '#34495e';
  }

  


  /***  CHECKBOX IMPLEMENTATION  ***/
  handleCheck(e,x) {
    this.setState(state => ({
      checkedValues: state.checkedValues.includes(x)
          ? state.checkedValues.filter(c => c !== x)
          : [...state.checkedValues, x]
      })
    );
  }

  handleCheckPersonal(event) {
    this.setState(state => ({checkedPersonal: !state.checkedPersonal}))
  };

  handleChangeFacilities(e) {
    this.setState(state=> ({checkedFacilities: e.target.value}))
  }

  handleChangeIntegrators(e) {
    this.setState(state=> ({checkedIntegrators: e.target.value}))
  }

  handleChangeBeamTypes(e) {
    this.setState(state=> ({checkedBeamTypes: e.target.value}))
  }

  async handleDateSubmit(e) {
    let calendarApi = this.calendarComponentRef.current.getApi()
    console.log('Retrieving new events');
    let events = calendarApi.getEvents()
    let ids = [];
    let startDates = [];
    let endDates = [];
    let energies = [];
    events.forEach(function(event) {
      if (event.id !== "") {
        ids.push(event.id);
      } else {
        ids.push(null);
      }
      startDates.push(event.start.toISOString());
      endDates.push(event.end.toISOString());
      energies.push(event.extendedProps.energy)
    })
    console.log(startDates)
    console.log(ids)
    console.log(endDates)
    console.log(energies)
    console.log(SchedulingStore.requests[0].rangeId)

    
    let url = "https://mda-phoenix.herokuapp.com/request/send-forms";
    
    await axios.post(url, 
      {
        "ids": ids, 
        "startDate": startDates, 
        "endDate": endDates,
        "energies": energies,
        "rangeId" : 13
      }, {headers: {Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}`}}
      ).then(response => {
        
      })
      .catch(error => {
        console.log(error);
      }
    );
    
  }

  handleModal(row) {
    console.log('opening modal')
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
      modalOpen: !this.state.modalOpen,
    }));
  }

  handleAddNewDialog() {
    this.setState({
      addNewOpen: !this.state.addNewOpen
    })
  }

  // Adds event after viewing them from ViewRequestsSched
  async addEvent(id) {
    console.log('event adding')
    console.log(id.type)
    let self = this;

    // Check if it's down time
    if (id.type === 'click') {
      let theColor = downtimeColor;
      let titleString = 'Tune Time';
      let eventEnergy = undefined;
      // Setting end time
      var endDate = new Date(self.state.addNewDate);
      let h = 4;
      console.log(endDate.getTime())
      endDate.setTime(endDate.getTime() + (h*60*60*1000));

      let data = [self.makeEvent2(id, self.state.addNewDate, endDate, eventEnergy, titleString, theColor), ...this.state.calendarEvents];
      self.setState({calendarEvents: [...data]})
    } else {
      let url = "https://mda-phoenix.herokuapp.com/getforms/id";
    
      await axios.post(url, 
        {"id": id}, {headers: {Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}`}}
        ).then(response => {
          console.log('checking add')
          console.log(response)
          let data  = [];
          let theColor = "";
          let titleString = "";
          let eventType = 'beamtime';
          let eventEnergy = Object.keys(response.data.requests[0].beams)[0]
          let {name, company} = this.findNameAndCompany(id);

          // Setting color and title
          if (eventType === 'downtime') {
            theColor = downtimeColor;
            titleString = 'Tune Time';
          } else {
            theColor = colors[self.state.uniqueEnergies.indexOf(eventEnergy)];
            titleString = name + " - " + company;
          }

          // Setting end time
          console.log('doing end time')
          var endDate = new Date(self.state.addNewDate);
          if (response.data.requests[0].totalHours === null) {
            let h = 4;
            console.log(endDate.getTime())
            endDate.setTime(endDate.getTime() + (h*60*60*1000));
            console.log(endDate.getTime())
          } else {
            //let h = response.data.requests[0].totalHours; // totalHours is 96 for many requests??
            let h = 4;
            console.log(response.data)
            console.log(h)
            console.log(endDate.getTime())
            endDate.setTime(endDate.getTime() + (h*60*60*1000));
            console.log(endDate.getTime())
          }

          // Re-running to reset colors
          data = [self.makeEvent2(id, self.state.addNewDate, endDate, eventEnergy, titleString, theColor), ...this.state.calendarEvents];
          console.log(data);
          console.log(this.state.uniqueEnergies)
          this.makeUniqueEnergies(data);
          console.log(this.state.uniqueEnergies)
          if (eventType === 'downtime') {
            theColor = downtimeColor;
          } else {
            theColor = colors[self.state.uniqueEnergies.indexOf(eventEnergy)];
          }
          console.log('checky here');
          data = [self.makeEvent2(id, self.state.addNewDate, endDate, eventEnergy, titleString, theColor), ...this.state.calendarEvents];
          data = this.colorEvents(data);

          self.setState({calendarEvents: [...data]})
        })
        .catch(error => {
          console.log(error);
        }
      );
    }
    this.handleAddNewDialog();
  }

  dateStringConverter (date) {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();
  
    return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-');
  };
  

  async handleEventClick(id) {
    console.log("Event clicked");
    console.log(id);
    
    let self = this;
  
    let url = "https://mda-phoenix.herokuapp.com/getforms/id";
    
    await axios.post(url, 
      {"id": id}, {headers: {Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}`}}
      ).then(response => {
        console.log('Printing response');
        console.log(response);
        this.handleModal(response.data.requests[0]);
      })
      .catch(error => {
        console.log(error);
      }
    );

    
  }

  

  
  /*** RENDER CALENDAR APPEARANCE ***/
  render() {
    var self = this;
    const { classes } = this.props;

    
    
    
    
    this.state.calendarEvents.forEach(function(event) {
      //var facility = event.extendedProps.facility; 
      //var integrator = event.extendedProps.integrator; 
      //var beamType = event.extendedProps.beamType; 
      //var titleString = facility + " - " + integrator + ": " + beamType;
      //console.log(event);
      //event.setProp('title', titleString);
    })
    return (
      <div className='calendar'>
        <div className='calendar-inner'>
          <Stack style={{ justifyContent: 'flex-end', alignSelf: 'auto', minWidth: '50px', minHeight: '50px' }}>

            {/*** CALENDAR PLUGIN ***/}
            <Row style={{ minWidth: '50px', minHeight: '50px' }}>
              <FullCalendar
                defaultView="timeGridWeek"
                header={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridTwoWeeks,timeGridWeek,timeGridDay,listWeek'
                }}
                views= {{
                  timeGridTwoWeeks: {
                    type: 'timeGrid',
                    duration: { weeks: 2 },
                    rows: 2,
                    buttonText: '2 weeks'
                  }
                }}
                height='500'
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                ref={ this.calendarComponentRef }
                weekends={ this.state.calendarWeekends }
                events={ this.state.checkedPersonal
                          ? this.state.personalEvents
                          : this.state.calendarEvents
                        }
                allDaySlot={false}
                expandRows={true} // not working??
                slotDuration='04:00:00'
                defaultDate={this.state.calendarStartDate}
                dateClick={(info) => {this.handleDateClick(info.date)} }
                eventClick={(info) => {this.handleEventClick(info.event.id)} }
                eventOrder="facility,start"
                editable='true'

                /* Render Event Options */
                eventRender={ function(info) {
                  var arr1 = self.state.checkedFacilities;
                  var arr2 = self.state.checkedIntegrators;
                  var arr3 = self.state.checkedBeamTypes;
                  //console.log(arr)
                  return (arr1.indexOf(info.event.extendedProps.facility) >=0
                    && arr2.indexOf(info.event.extendedProps.integrator) >=0
                    && arr3.indexOf(info.event.extendedProps.beamType) >=0
                  )  
                } }
              />
            </Row>
            <Row>
              <Row style={{justifyContent: 'flex-start'}}>
                {this.state.uniqueEnergies.map( (energy, index) =>
                  <div>
                    <Box mx='10px'>
                      <Avatar size={10} style={{backgroundColor: colors[index]}}> </Avatar> {energy + " MeV"}
                    </Box>
                  </div>
                )}
              </Row>
              
              <Button
                variant="contained"
                color="primary"
                onClick={e => this.handleDateSubmit(e)}
              >
                Submit Schedule
              </Button>

              
            </Row>
            <Box></Box>
        </Stack>
        </div>



        {/*** Add new event ***/}
        <Dialog classes={{paper: classes.dialogPaper}} onClose={this.handleAddNewDialog}         aria-labelledby="addevent" open={this.state.addNewOpen}>
          Add New event
          <ViewRequestsSched addEvent={this.addEvent}/>
        </Dialog>
 



        {/*** Popup for events ***/}
        <Dialog classes={{paper: classes.dialogPaper}} onClose={this.handleModal} aria-labelledby="simple-dialog-title" open={this.state.modalOpen}>
          {/*<DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>*/}
          <CardNoShadow style={{display: 'inline'}}>
            <DialogTitle id="simple-dialog-title" style={{textAlign: 'center'}}>Contact and Funding Information</DialogTitle>
            
            <Row>
              <TextField
                label="Status"
                className={classes.leftTextField}
                id="standard-read-only-input"
                defaultValue={this.state.status}
              />
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
              />
            </Row>

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
            <DialogTitle id="simple-dialog-title" style={{textAlign: 'center'}}>Experiment Information</DialogTitle>
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
          </CardNoShadow>
          <Row style={{justifyContent: 'flex-end'}}>
            <Button 
              onClick={this.handleModal} 
              variant="contained"
              color="primary"
              style={{maxWidth:'150px', margin:'25px 25px 25px 25px'}}
            >
              Return
            </Button>
          </Row>
        </Dialog>
      </div>
    )
  }
  
  toggleWeekends = () => {
    this.setState({ // update a property
      calendarWeekends: !this.state.calendarWeekends
    })
  }

  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi()
    calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
  }

  handleDateClick = (arg) => {
    console.log(arg.date);
    this.handleAddNewDialog();
    this.setState({addNewDate : arg})
  }

}

export default withStyles(useStyles, { withTheme: true })(CalendarSched)