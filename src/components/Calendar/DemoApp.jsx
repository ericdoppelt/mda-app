import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import axios from 'axios';
import "fullcalendar"
import './DemoApp.scss'

//import Card from '../../components/Card';
import CardNoShadow from '../../components/CardNoShadow';
import Header from '../../components/Header';
import Radio from '../../components/Radio';
import Row from '../../components/Row';
import Stack from '../../components/Stack';
import Title from '../../components/Title';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Checkbox, FormControl, FormLabel, RadioGroup, FormControlLabel, Button, Select, InputLabel, useScrollTrigger } from '@material-ui/core';  
import { data } from 'jquery'

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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  }
}));




export default class DemoApp extends React.Component {

  /*** INITIALIZE STATE VARIABLES ***/
  calendarComponentRef = React.createRef();
  
  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    

    /*** LIST OF DATES ***/
    this.state = {
      username: "",
      facility: "",
      integrator: "",
      totalTime: "",
      startDate: "",
      cannotRun: "",
      data: [],
      facilities: facilities,
      integrators: integrators,
      beamTypes: beamTypes,
      checkedValues: facilities.concat(integrators.concat(beamTypes)),
      calendarWeekends: true,
      calendarEvents: [ // initial event data
        { id: "1", extendedProps: {facility: "TAMU", integrator: "MDA", beamType:"Heavy Ion"}, 
            title: 'MDA @ TAMU: Heavy Ion', start: new Date('2020-06-05T00:00') },
        { id: "2", extendedProps: {facility: "TAMU", integrator: "MDA", beamType:"Proton"}, 
            title: 'MDA @ TAMU: Proton', start: new Date('2020-06-15T00:00') },
        { id: "2", extendedProps: {facility: "TAMU", integrator: "NASA", beamType:"Heavy Ion"}, 
            title: 'MDA @ TAMU: Heavy Ion', start: new Date('2020-06-13T00:00') },
        { id: "1", extendedProps: {facility: "LBNL", integrator: "MDA", beamType:"Proton"}, 
            title: 'MDA @ LBNL: Proton', start: new Date('2020-06-14T00:00') },
        { id: "1", extendedProps: {facility: "LBNL", integrator: "NASA", beamType:"Heavy Ion"}, 
            title: 'NASA @ LBNL: Heavy Ion', start: new Date('2020-06-19T00:00') },
        { id: "1", extendedProps: {facility: "MSU", integrator: "MDA", beamType:"Heavy Ion"}, 
            title: 'MDA @ MSU: Heavy Ion', start: new Date('2020-06-18T00:00') },
        { id: "2", extendedProps: {facility: "MSU", integrator: "MDA", beamType:"Heavy Ion"}, 
            title: 'MDA @ MSU: Heavy Ion', start: new Date('2020-06-17T00:00') },
        { id: "2", extendedProps: {facility: "NSRL", integrator: "MDA", beamType:"Heavy Ion"}, 
            title: 'MDA @ NSRL: Heavy Ion', start: new Date('2020-06-16T00:00') },
        { id: "2", extendedProps: {facility: "NSRL", integrator: "NASA", beamType:"Proton"}, 
            title: 'NASA @ NSRL: Proton', start: new Date('2020-06-12T00:00') },
      ]
    }
  }

  
  
  /*** COLLECT CALENDAR DATA FROM HEROKU ***/
  async componentDidMount(username) {
    const url = "https://mda-phoenix.herokuapp.com/calendar";
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
          console.log(self.makeEvent(event.facility,event.integrator,event.startDate));
          data.push(self.makeEvent(event.facility,event.integrator,event.startDate));
        })
        console.log(data);
        self.setState({calendarEvents : data});
      })
      .catch(error => {
        console.log(error);
      });
  }


  /*** EVENT CREATOR FOR UPDATE FROM DATABASE ***/
  makeEvent = (facility, integrator, startDate) => {
    var titleString = facility + " - " + integrator;
    return { id: "1", extendedProps: {facility: facility, integrator: integrator, beamType: "Heavy Ion"}, 
    title: titleString, start: new Date(startDate), backgroundColor: this.makeEventColor(facility)}
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

  handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    //setPersonName(value);
  };


  
  /*** RENDER CALENDAR APPEARANCE ***/
  render() {
    var self = this;
    
    this.state.calendarEvents.forEach(function(event) {
      var facility = event.extendedProps.facility; 
      var integrator = event.extendedProps.integrator; 
      var beamType = event.extendedProps.beamType; 
      var titleString = facility + " - " + integrator + ": " + beamType;
      //console.log(event);
      //event.setProp('title', titleString);
    })
    return (
      <div className='demo-app'>
        <div className='demo-app-calendar'>
        
          <Stack style={{ justifyContent: 'flex-end', alignSelf: 'auto', minWidth: '50px', minHeight: '50px' }}>

            {/*** FILTER CARD ***/}
            <CardNoShadow style={{ justifyContent: 'left', minWidth: '150px', minHeight: '100px', width: '100%', flexGrow: '0' }}>
              
              {/*** FACILITY CHECKBOXES ***/}
              {/* Title */}
              <Row style={{ justifyContent: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '20px' }}>
                <Title style={{ width: '120px', minHeight: '0px', textAlign: 'left', justifyContent: 'left', alignItems: 'flex-end' }}>
                  Testing Site: 
                </Title>
                {/* Checkboxes */}
                <Stack style={{ height: '100%', alignItems: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '0px' , maxWidth: '100%'}}>
                  <form onSubmit={this.handleFormSubmit}>
                    { this.state.facilities.map(x =>
                      <FormControlLabel
                      control={<Checkbox 
                        color="primary" 
                        checked={this.state.checkedValues.includes(x)} 
                        onChange={e => this.handleCheck(e,x)} 
                        name={x} 
                        />}
                      label={x}
                      />
                    ) }
                  </form>
                </Stack>
              </Row>
              {/*** INTEGRATOR CHECKBOXES ***/}
              {/* Title */}
              <Row style={{ justifyContent: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '20px' }}>
                <Title style={{ width: '120px', minHeight: '0px', textAlign: 'center', justifyContent: 'left', alignItems: 'flex-end' }}>
                  Integrator:
                </Title>
                {/* Checkboxes */}
                <Stack style={{ alignItems: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '0px' , maxWidth: '100%'}}>
                  <form onSubmit={this.handleFormSubmit}>
                    { this.state.integrators.map(x =>
                      <FormControlLabel
                      control={<Checkbox 
                        color="primary" 
                        checked={this.state.checkedValues.includes(x)} 
                        onChange={e => this.handleCheck(e,x)} 
                        name={x} 
                        />}
                      label={x}
                      />
                    ) }
                  </form>
                </Stack>
              </Row>
              

              {/*** BEAM TYPE CHECKBOXES ***/}
              {/* Title */}
              <Row style={{ justifyContent: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '20px' }}>
                <Title style={{ width: '120px', minHeight: '0px', textAlign: 'left', justifyContent: 'left', alignItems: 'flex-end' }}>
                  Beam Type:
                </Title>
                {/* Checkboxes */}
                <Stack style={{ alignItems: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '0px' , maxWidth: '100%'}}>
                  <form onSubmit={this.handleFormSubmit}>
                    { this.state.beamTypes.map(x =>
                      <FormControlLabel
                      control={<Checkbox 
                        color="primary" 
                        checked={this.state.checkedValues.includes(x)} 
                        onChange={e => this.handleCheck(e,x)} 
                        name={x} 
                        />}
                      label={x}
                      />
                    ) }
                  </form>
                </Stack>
              </Row>
              
            </CardNoShadow>
            


            {/*** CALENDAR PLUGIN ***/}
            <Row style={{ minWidth: '50px', minHeight: '50px' }}>
              <FullCalendar
              defaultView="dayGridMonth"
              header={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
              }}
              plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
              ref={ this.calendarComponentRef }
              weekends={ this.state.calendarWeekends }
              events={ this.state.calendarEvents }
              dateClick={ this.handleDateClick }

              /* Render Event Options */
              eventRender={ function(info) {
                var arr = self.state.checkedValues;
                //console.log(arr)
                return (arr.indexOf(info.event.extendedProps.facility) >=0 
                  && arr.indexOf(info.event.extendedProps.integrator) >=0
                  && arr.indexOf(info.event.extendedProps.beamType) >=0
                )  
              } }
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

  handleDateClick = (arg) => {
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
    //}
  }

}
