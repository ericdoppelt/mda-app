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
import Paragraph from '../../components/Paragraph';
import Radio from '../../components/Radio';
import Row from '../../components/Row';
import Stack from '../../components/Stack';
import Title from '../../components/Title';

import { Checkbox, FormControl, FormLabel, RadioGroup, FormControlLabel } from '@material-ui/core';  

export default class DemoApp extends React.Component {

  /*** INITIALIZE STATE VARIABLES ***/
  calendarComponentRef = React.createRef()
  
  constructor(props) {
    super(props);

    /*** LIST OF DATES ***/
    this.state = {
      username: "",
      facility: "",
      integrator: "",
      totalTime: "",
      startDate: "",
      cannotRun: "",
      calendarWeekends: true,
      calendarEvents: [ // initial event data
        { id: '1', title: 'Event Now', start: new Date() },
        { id: '2', title: 'Test', start: new Date('2020-06-05T00:00') }
      ]
    }
  }

  /*** COLLECT CALENDAR DATA FROM HEROKU ***/
  async componentDidMount(username) {
    const url = "https://mda-phoenix.herokuapp.com/calendar";

    var self = this;
    await axios.post(url, {"username":username}).then(response => {
      self.setState({
        username: response.data.username,
        facility: response.data.facility,
        integrator: response.data.integrator,
        totalTime: response.data.totalTime,
        startDate: response.data.startDate,
        cannotRun: response.data.cannotRun
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  

  /*** RENDER CALENDAR APPEARANCE ***/
  render() {
    return (
      <div className='demo-app'>
        <div className='demo-app-top'>
          <button onClick={ this.testMike }>Mike</button>&nbsp;
        </div>
        <div className='demo-app-calendar'>
        <Row style={{ minWidth: '50px', minHeight: '50px' }}>
          <Stack style={{ justifyContent: 'flex-end', alignSelf: 'auto', minWidth: '50px', minHeight: '50px' }}>
            {/*<Image style={{ width: '90px', height: '90px', backgroundImage: 'url(/images/d102a6df-a42a-4af3-bfdc-8da28402a42d.png)' }} /> */}
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
            //eventRender={ function(info) {
              //console.log('hi');
            //} }
            />
          </Stack>
          <CardNoShadow style={{ justifyContent: 'center', minWidth: '200px', minHeight: '100px', width: '350px', flexGrow: '0' }}>
            <Header>
              Filter
            </Header>
            <Row style={{ justifyContent: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '0px' }}>
              <Title style={{ width: 'calc(100% - 20px)', minHeight: '0px', textAlign: 'center', justifyContent: 'center', alignItems: 'flex-end' }}>
                Testing Site
              </Title>
            </Row>
            <Row style={{ justifyContent: 'left', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
              <Stack style={{ alignItems: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '20px' }}>
                <Checkbox
                  defaultChecked
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                <Checkbox
                  defaultChecked
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                <Checkbox
                  defaultChecked
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                <Checkbox
                defaultChecked
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              </Stack>
              <Stack style={{ alignItems: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '20 px' }}>
                <Paragraph>
                  TAMU
                </Paragraph>
                <Paragraph>
                  LBNL
                </Paragraph>
                <Paragraph>
                  NSRL
                </Paragraph>
                <Paragraph>
                  MSU
                </Paragraph>
              </Stack>
            </Row>
            <Row style={{ justifyContent: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '0px' }}>
              <Title style={{ width: '180px', minHeight: '0px', textAlign: 'center', justifyContent: 'center', alignItems: 'flex-end' }}>
                Integrator
              </Title>
            </Row>
            <Row style={{ justifyContent: 'left', flexGrow: '0', minWidth: '50px', minHeight: '0px' }}>
              <Stack style={{ justifyContent: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '0px' }}>
                <Checkbox
                  defaultChecked
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                <Checkbox
                  defaultChecked
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                <Checkbox
                  defaultChecked
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              </Stack>
              <Stack style={{ alignItems: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '0px' }}>
                <Paragraph>
                  MDA
                </Paragraph>
                <Paragraph>
                  NASA
                </Paragraph>
                <Paragraph>
                  Independent
                </Paragraph>
              </Stack>
            </Row>
            <Row style={{ justifyContent: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '0px' }}>
              <Title style={{ width: '180px', minHeight: '0px', textAlign: 'center', justifyContent: 'center', alignItems: 'flex-end' }}>
                Beam Type
              </Title>
            </Row>
            <Row style={{ justifyContent: 'left', flexGrow: '0', minWidth: '50px', minHeight: '0px' }}>
              <Stack style={{ justifyContent: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '0px' }}>
                <Checkbox
                  defaultChecked
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                <Checkbox
                  defaultChecked
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              </Stack>
              <Stack style={{ alignItems: 'flex-start', flexGrow: '0', minWidth: '50px', minHeight: '0px' }}>
                <Paragraph>
                  Heavy Ion
                </Paragraph>
                <Paragraph>
                  Proton
                </Paragraph>
              </Stack>
            </Row>
          </CardNoShadow>
        </Row>
          
        </div>
      </div>
    )
  }
  
  /*** TESTING ***/
  testMike = () => {
    this.componentDidMount('mm92');
    let calendarApi = this.calendarComponentRef.current.getApi();
    var inputId = this.state.username;
    var event = this.state.calendarEvents.filter(function(el) {
      return el.id !== inputId;
    });
    console.log(event);
    event.forEach(function(ev) {
      console.log(ev.id);
      var e = calendarApi.getEventById(inputId);
      e.remove();
    })
    
    event = calendarApi.getEventById(inputId);
    console.log(this.state.startDate);
    if (event !== null) {
      event.remove();
    }
    var titleString = this.state.facility + " - " + this.state.integrator;
    var dateObj = new Date(this.state.startDate + "T00:00");
    console.log(dateObj)
    this.setState({  // add new event data
      calendarEvents: this.state.calendarEvents.concat({ // creates a new array
        id: inputId,
        title: titleString,
        start: dateObj
      })
    })
    event = calendarApi.getEventById(inputId);
    console.log(this.state.calendarEvents);
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

  RadioButtonsGroup = () => {
    const [value, setValue] = React.useState('female');
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };
  
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
          <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
        </RadioGroup>
      </FormControl>
    );
  }

}
