import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import axios from 'axios';
import "fullcalendar"
import './DemoApp.scss'

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
        { title: 'Event Now', start: new Date() },
        { title: 'Test', start: new Date('2020-06-05T00:00') }
      ]
    }
  }

  /*** COLLECT CALENDAR DATA FROM HEROKU ***/
  async componentDidMount(username) {
    const url = "https://mda-phoenix.herokuapp.com/calendar";
    console.log(url);

    var self = this;
    await axios.post(url, {"username":username}).then(response => {
      console.log("Heroku Response" + response);
      self.setState({
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
            />
        </div>
      </div>
    )
  }

  /*** TESTING ***/
  testMike = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    var inputId = this.state.username;
    /* var event = this.state.calendarEvents.filter(function(el) {
      return el.id !== inputId;
    }); */
    var event = calendarApi.getEventById(inputId);
    event.remove();
    this.componentDidMount("mm92");
    //this.setState({ username: "mm92" });
    var titleString = this.state.facility + " - " + this.state.integrator;
    var dateObj = new Date(this.state.startDate + "T00:00");
    this.setState({  // add new event data
      calendarEvents: this.state.calendarEvents.concat({ // creates a new array
        id: inputId,
        title: titleString,
        start: dateObj
      })
    })
    
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
