import React from 'react';
import { Box } from '@chakra-ui/react';
import { Switch, Route } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

import Calendar from '../Calendar/Calendar';
import Map from '../Map/Map';
import Events from "../VolunteerEvents/VolunteerEvents";
import Profile from "../Profile/Profile";

import { useAuth0 } from "@auth0/auth0-react";

import './Dashboard.css';

function Dashboard() {
  const { user } = useAuth0();
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
          <Route path={'/dashboard/profile'}>
            <Profile />
          </Route>
        </Switch>
      </Navigation>
    </div>
  )
}

export default Dashboard;