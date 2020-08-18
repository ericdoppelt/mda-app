import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import axios from 'axios';
import "fullcalendar"
import './Calendar.scss'

import CardNoShadow from '../../UIzard/CardNoShadow';
import Row from '../../UIzard/Row';
import Stack from '../../UIzard/Stack';

import { makeStyles, withStyles} from '@material-ui/core/styles';
import { Checkbox, Select, FormControl, FormControlLabel, Input, InputLabel, MenuItem } from '@material-ui/core';  

// Checkbox items
const facilities = [
  'TAMU',
  'LBNL',
  'NSRL',
  'MSU'
]; 

let integrators = new Set();



const beamTypes = [
  'Heavy Ion',
  'Proton'
]; 

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


class Calendar extends React.Component {

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
      checkedIntegrators: [],
      checkedBeamTypes: beamTypes,
      checkedPersonal: this.props.personal,
      checkedValues: [],
      calendarWeekends: true,
      calendarEvents: [ // initial event data
      ],
      personalEvents: ["hello"],
    }
  }

  
  
  /*** COLLECT CALENDAR DATA FROM HEROKU ***/
  async componentDidMount(username) {
    let url = "https://vcm-15941.vm.duke.edu/api/calendar";
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
          data.push(self.makeEvent(event.facility,event.integrator,event.startDate));
          integrators.add(event.integrator);
        })
        self.setState({
          calendarEvents : data, 
          integrators: Array.from(integrators),
          checkedValues: ['TAMU'].concat(Array.from(integrators)).concat(beamTypes),
          checkedIntegrators: Array.from(integrators),
        });
      })
      .catch(error => {
      });

      url = "https://vcm-15941.vm.duke.edu/api/calendar/personal";
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
            data.push(self.makeEventPersonal(event.facility,event.integrator,event.startDate));
          })
          self.setState({personalEvents : data});
          //self.setState(state => ({checkedValues: self.state.checkedFacilities.concat(integrators.concat(beamTypes)),}));
          
        })
        .catch(error => {
        });
  }


  /*** EVENT CREATOR FOR UPDATE FROM DATABASE ***/
  makeEvent = (facility, integrator, startDate) => {
    var titleString = facility + " - " + integrator;
    var endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 8);
    return { id: "1", extendedProps: {facility: facility, integrator: integrator, beamType: "Heavy Ion"}, 
    title: titleString, start: new Date(startDate), end: endDate, backgroundColor: this.makeEventColor(facility)}
  };

  makeEventPersonal = (facility, integrator, startDate) => {
    var titleString = facility + " - " + integrator;
    var endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 8);
    return { id: "1", extendedProps: {facility: facility, integrator: integrator, beamType: "Heavy Ion"}, 
    title: titleString, start: new Date(startDate), end: endDate, backgroundColor: this.makeEventColor(facility), className: 'moreBorder'}
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

  
  /*** RENDER CALENDAR APPEARANCE ***/
  render() {
    var self = this;
    const { classes, theme } = this.props;
    
    
    this.state.calendarEvents.forEach(function(event) {
      /* var facility = event.extendedProps.facility; 
      var integrator = event.extendedProps.integrator; 
      var beamType = event.extendedProps.beamType;  */
      /* var titleString = facility + " - " + integrator + ": " + beamType; */
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
                    style={{width:'250px',}}
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
                    style={{width:'250px',}}
                  >
                    
                    {this.state.integrators.length > 1
                    ? this.state.integrators.map((name) => (
                      <MenuItem key={name} value={name} style={getStyles(name, this.state.integrators, theme)}>
                        {name}
                      </MenuItem>
                    ))
                    : null
                    }
                  </Select>
                </FormControl>

                {/*** BEAM TYPE FILTER DSIABLED ***/}
                {/*
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-name-label">Beam Type</InputLabel>
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
                */}

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
                defaultView="dayGridMonth"
                header={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridTwoWeeks,timeGridWeek,timeGridDay,listWeek'
                }}
                views= {{
                  timeGridTwoWeeks: {
                    type: 'timeGrid',
                    duration: { weeks: 2 },
                    rows: 3,
                    buttonText: '2 weeks',
                  }
                }}
                allDaySlot={false}
                expandRows={true} // not working??
                //height='500'
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
                }}
              />
            </Row>

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

export default withStyles(useStyles, { withTheme: true })(Calendar)