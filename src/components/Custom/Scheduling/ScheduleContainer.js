import React, {useState} from 'react';
import {Typography} from '@material-ui/core';
import CalendarSched from './CalendarSched/CalendarSched';
import RangeButton from './Prioritizer/RangeButton';
import ScheduleStorage from '../../../stores/SchedulingStore';
import { createContext } from "react";
import AllPrioritizers from './Prioritizer/AllPrioritizers';
import { observer } from "mobx-react"
import SchedulingStore from '../../../stores/SchedulingStore';
import {Button} from '@material-ui/core'


const ScheduleStore = createContext(ScheduleStorage);

class ScheduleContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ScheduleStore.Provider>
                <Typography variant="h3">
                    Scheduling
                </Typography>
                <Button onClick={SchedulingStore.toggleCalendar}>Test Switcher</Button>
                {SchedulingStore.viewCalendar 
                        ? <div><AllPrioritizers/>
                          <RangeButton/></div>
                        : <CalendarSched/>}
                
                </ScheduleStore.Provider>
            </div>
        );
    }
};

export default observer(ScheduleContainer)