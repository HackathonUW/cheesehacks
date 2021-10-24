import React, { useState, useEffect } from "react";
import { Container } from '@chakra-ui/react';
import { Calendar as Cal, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import "./Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";


const localizer = momentLocalizer(moment)

function Calendar() {

  const [fetching, setFetching] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log("EVENTS:" + events);
  }, [events]);

  useEffect(() => {
    getAttendingEvents();
  }, []);

  function getAttendingEvents() {
    const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
        email: "temp"
      })
		};

    console.log(options);
    setFetching(true);
    fetch("https://cheesehack-backend.herokuapp.com/attended", options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (!data) {
        throw Error("Null data");
      }
      var events = []

      data.forEach(e => {
        var event = {};
        event.id = e.pid;
        event.title = e.evname;
        event.start = new Date(e.dates.split(',')[0]);
        event.end = new Date(e.dates.split(',')[1]);
        events.push(event);
      });
      setEvents(events);
      setFetching(false);
    })
    .catch(err => {
      console.error(err);
      setFetching(false);
    });
  }

  return (
      <div className="Calendar">
          <Cal
              defaultView={'agenda'}
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