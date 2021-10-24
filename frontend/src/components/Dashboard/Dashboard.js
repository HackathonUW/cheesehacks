import React from 'react';
import { Box } from '@chakra-ui/react';
import { Switch, Route } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

import Calendar from '../Calendar/Calendar';
import Map from '../Map/Map';
import Events from "../VolunteerEvents/VolunteerEvents";

import './Dashboard.css';

function Dashboard() {
  return (
    <div className="Dashboard">
      <Navigation>
        <Switch>
          <Route exact path='/dashboard'>
            <Map />
            </Route>
          <Route path={'/dashboard/calendar'}>
            <Calendar />
          </Route>
          <Route path={'/dashboard/volunteerevents'}>
            <Events />
          </Route>
        </Switch>
      </Navigation>
    </div>
  )
}

export default Dashboard;