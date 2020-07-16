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
import Title from '../../../UIzard/Title';

import { observer } from "mobx-react"
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import { Box, Checkbox, Select, FormControl, FormControlLabel, Input, InputLabel, MenuItem, Button, Avatar } from '@material-ui/core';  
import SchedulingStore from '../../../../stores/SchedulingStore';

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
  '#c0392b',
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

var uniqueEnergies = [];

const eventSample = [
  ['TAMU','MDA','2020-07-20T00:00','10'],
  ['TAMU','MDA','2020-07-21T00:00','10'],
  ['TAMU','MDA','2020-07-22T00:00','15'],
  ['TAMU','MDA','2020-07-23T00:00','15'],
  ['TAMU','MDA','2020-07-24T00:00','20'],
]

const useStyles = makeStyles((theme) => ({
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
}));

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
    
    let sampleProp = "null";
    if (this.props.samp !== null) {
      sampleProp = "not null"
    }

    /*** LIST OF DATES ***/
    this.state = {
      username: "",
      facility: "",
      integrator: "",
      totalTime: "",
      startDate: "",
      cannotRun: "",
      sampleProp: sampleProp,
      data: [],
      facilities: facilities,
      integrators: integrators,
      beamTypes: beamTypes,
      checkedFacilities: this.props.personal
        ? facilities
        : ['TAMU'],
      checkedIntegrators: integrators,
      checkedBeamTypes: beamTypes,
      checkedPersonal: this.props.personal,
      checkedValues: ['TAMU'].concat(integrators).concat(beamTypes),
      calendarWeekends: true,
      colorsReady: false,
      calendarEvents: [ // initial event data
      ],
      personalEvents: ["hello"],
    }
  }

  
  
  /*** COLLECT CALENDAR DATA FROM HEROKU ***/
  async componentDidMount(username) {
    let url = "https://mda-phoenix.herokuapp.com/calendar";
    var self = this;
    await axios.post(url).then(response => {
      /*self.setState({
        username: response.data.username,
        facility: response.data.facility,
        integrator: response.data.integrator,
        totalTime: response.data.totalTime,
        startDate: response.data.startDate,
        cannotRun: response.data.cannotRun
        });*/
        //console.log(response.data)
        var data = [];
        response.data.entries.forEach(function(event) {
          //data.push(self.makeEvent(event.facility,event.integrator,event.startDate));
        })
        console.log('Generating Events')
        eventSample.forEach(function(event) {
          uniqueEnergies.push(event[3]);
        })
        uniqueEnergies = uniqueEnergies.filter((v, i, a) => a.indexOf(v) === i); //make energies unique
        eventSample.forEach(function(event) {
          let theColor = colors[uniqueEnergies.indexOf(event[3])]
          data.push(self.makeEvent(event[0],event[1],event[2],theColor));
        })
        self.state.colorsReady = true;
        console.log(data)
        self.setState({calendarEvents : data});
      })
      .catch(error => {
      });

      url = "https://mda-phoenix.herokuapp.com/calendar/personal";
      await axios.post(url, null, {
        headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
        }).then(response => {
          /*self.setState({
          username: response.data.username,
          facility: response.data.facility,
          integrator: response.data.integrator,
          totalTime: response.data.totalTime,
          startDate: response.data.startDate,
          cannotRun: response.data.cannotRun
          });*/
          var data = [];
          response.data.entries.forEach(function(event) {
            //data.push(self.makeEventPersonal(event.facility,event.integrator,event.startDate));
          })
          //self.setState({personalEvents : data});
        })
        .catch(error => {
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

  handleDateSubmit(e) {
    let calendarApi = this.calendarComponentRef.current.getApi()
    console.log('Retrieving new events');
    let events = calendarApi.getEvents()
    let data = [];
    events.forEach(function(event) {
      data.push(event.start)
    })
    console.log(data)
  }

  
  /*** RENDER CALENDAR APPEARANCE ***/
  render() {
    var self = this;
    const { classes, theme } = this.props;
    
    
    this.state.calendarEvents.forEach(function(event) {
      var facility = event.extendedProps.facility; 
      var integrator = event.extendedProps.integrator; 
      var beamType = event.extendedProps.beamType; 
      var titleString = facility + " - " + integrator + ": " + beamType;
      //console.log(event);
      //event.setProp('title', titleString);
    })
    return (
      <div className='calendar'>
        <div className='calendar-inner'>
          <Stack style={{ justifyContent: 'flex-end', alignSelf: 'auto', minWidth: '50px', minHeight: '50px' }}>

            {/*** FILTER CARD ***/}
            <CardNoShadow style={{ justifyContent: 'left', minWidth: '300px', minHeight: '50px', width: '100%', flexGrow: '0' }}>
              
              <Row>
                {/*** FACILITY FILTER ***/}
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-name-label">Facility</InputLabel>
                  <Select
                    className={classes.select}
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    multiple
                    value={ this.state.checkedFacilities }
                    onChange={ this.handleChangeFacilities }
                    input={<Input />}
                    MenuProps={MenuProps}
                    style={{width:'150px',}}
                  >
                    {facilities.map((name) => (
                      <MenuItem key={name} value={name} style={getStyles(name, facilities, theme)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/*** INTEGRATOR FILTER ***/}
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-name-label">Integrator</InputLabel>
                  <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    multiple
                    value={ this.state.checkedIntegrators }
                    onChange={ this.handleChangeIntegrators }
                    input={<Input />}
                    MenuProps={MenuProps}
                    style={{width:'150px',}}
                  >
                    {integrators.map((name) => (
                      <MenuItem key={name} value={name} style={getStyles(name, integrators, theme)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/*** BEAM TYPE FILTER ***/}
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-name-label">Integrator</InputLabel>
                  <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    multiple
                    value={ this.state.checkedBeamTypes }
                    onChange={ this.handleChangeBeamTypes }
                    input={<Input />}
                    MenuProps={MenuProps}
                    style={{width:'150px',}}
                  >
                    {beamTypes.map((name) => (
                      <MenuItem key={name} value={name} style={getStyles(name, beamTypes, theme)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checkedPersonal}
                      onChange={this.handleCheckPersonal}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Personal"
                />
              </Row>
            </CardNoShadow>
            


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
              slotDuration='04:00:00'
              dateClick={ this.handleDateClick }
              eventOrder="facility,start"
              eventStartEditable='true'

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
              <Row>
                {uniqueEnergies.map( (energy, index) =>
                  <div>
                    <Avatar size={10} style={{backgroundColor: colors[index]}}> </Avatar> {energy + " MeV"}
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

  handleDateClick = (arg) => {/*
    var userStr = prompt('Enter username');
    var dateStr = prompt('Enter a date in YYYY-MM-DD format');
    var timeStr = prompt('Enter a time in HH:MM format');
    var date = new Date(dateStr + 'T'+timeStr+':00');
    // eslint-disable-next-line no-restricted-globals
    //if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      this.setState({  // add new event data
        calendarEvents: this.state.calendarEvents.concat({ // creates a new array
          id: userStr,
          title: 'New Event',
          start: date,
          allDay: arg.allDay
        })
      })
    //}*/
  }

}

export default withStyles(useStyles, { withTheme: true })(observer(CalendarSched))