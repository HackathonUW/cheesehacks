import React, { useState, useEffect } from "react";
import { Container } from '@chakra-ui/react';
import { Calendar as Cal, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import events from "./events";

import "./Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";


const localizer = momentLocalizer(moment)

function Calendar() {

    return (
        <div className="Calendar">
            <Cal
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%', width: '100%' }}
            />
        </div>
    );
}

export default Calendar;