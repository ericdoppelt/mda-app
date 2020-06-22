import React from 'react';
import { render } from 'react-dom';
import InfiniteCalendar, {Calendar, withMultipleDates, defaultMultipleDateInterpolation} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

var today = new Date();
var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

class MultipeDatesPicker extends React.Component {


render() {
  return(
    <div>
    <InfiniteCalendar
      Component={withMultipleDates(Calendar)}
      selected={[
       new Date(2020, 6, 15),
       new Date(),
       new Date(2020, 7, 2)
      ]}
     interpolateSelection={defaultMultipleDateInterpolation}
     />
    </div>
  );
  }
}
export default MultipeDatesPicker;