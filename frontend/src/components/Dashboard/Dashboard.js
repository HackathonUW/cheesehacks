import React from 'react';
import { Box } from '@chakra-ui/react';
import { Switch, Route } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

import Calendar from '../Calendar/Calendar';
import Map from '../Map/Map';

import './Dashboard.css';

function Dashboard() {
  return (
    <Box className="Dashboard">
      <Navigation>
        <Switch>
          <Route exact path='/dashboard'>
            <Map />
            </Route>
          <Route path={'/dashboard/calendar'}>
            <Calendar />
          </Route>
        </Switch>
      </Navigation>
    </Box>
  )
}

export default Dashboard;