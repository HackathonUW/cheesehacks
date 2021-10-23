import React from 'react';
import { Box } from '@chakra-ui/react';
import { Switch, Route } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import Calendar from '../Calendar/Calendar';
import Events from "../VolunteerEvents/VolunteerEvents";

import './Dashboard.css';

function Dashboard() {
  return (
    <Box className="Dashboard">
      <Navigation>
        <Switch>
          <Route exact path='/dashboard'>
            <div>Map</div>
            </Route>
          <Route path={'/dashboard/calendar'}>
            <Calendar />
          </Route>
          <Route path={'/dashboard/volunteerevents'}>
            <Events />
          </Route>
        </Switch>
      </Navigation>
    </Box>
  )
}

export default Dashboard;