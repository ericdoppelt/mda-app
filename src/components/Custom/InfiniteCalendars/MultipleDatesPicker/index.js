import React from 'react';
import { render } from 'react-dom';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

var today = new Date();
var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

class MultipeDatesPicker extends React.Component {


render() {
  return(
    <InfiniteCalendar
      width={400}
      height={600}
      selected={today}
      disabledDays={[0,6]}
      minDate={lastWeek}
    />
  );
  }
}
export default MultipeDatesPicker;