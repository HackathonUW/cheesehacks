import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

function Dashboard() {
  return (
    <Navigation>
      <Switch>
        <Route exact path='/dashboard'>
          <div>Map</div>
          </Route>
        <Route path={'/dashboard/Calendar'}>
          <div>Calendar</div>
        </Route>
      </Switch>
    </Navigation>
  )
}

export default Dashboard;