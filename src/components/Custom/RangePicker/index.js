import React, { useState } from 'react';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

function RangePicker(props) {

    const [state, setState] = useState({
        selection1: {
          startDate: addDays(new Date(), 1),
          endDate: null,
          key: 'selection1'
        },
        selection2: {
          startDate: addDays(new Date(), 4),
          endDate: addDays(new Date(), 8),
          key: 'selection2'
        },
        selection3: {
          startDate: addDays(new Date(), 8),
          endDate: addDays(new Date(), 10),
          key: 'selection3',
          autoFocus: false
        }
      });

    return(
          <DateRangePicker
            onChange={item => setState({ ...state, ...item })}
            ranges={[state.selection1, state.selection2, state.selection3]}
          />
    );
}

export default RangePicker;