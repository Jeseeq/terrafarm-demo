import 'babel/polyfill';
import {createHashHistory} from 'history';
import {IndexRoute, Route} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import {RelayRouter} from 'react-router-relay';

import PluckYourselfApp from './components/PluckYourselfApp';
import BrowsePage from './components/BrowsePage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import UserPage from './components/UserPage';
import ResourcePage from './components/ResourcePage';
import GroupPage from './components/GroupPage';

import MasterAndViewerQueries from './queries/MasterAndViewerQueries';
import MasterQueries from './queries/MasterQueries';
import ViewerQueries from './queries/ViewerQueries';
import UserQueries from './queries/UserQueries';
import ResourceQueries from './queries/ResourceQueries';
import GroupAndViewerQueries from './queries/GroupAndViewerQueries';
import GroupQueries from './queries/GroupQueries';

ReactDOM.render(
  <RelayRouter history={createHashHistory({queryKey: false})}>
    <Route
      path='/' component={PluckYourselfApp}
      queries={MasterAndViewerQueries}
    >
      <Route
        path='browse' component={BrowsePage}
        queries={MasterAndViewerQueries}
      />
      <Route
        path='login' component={LoginPage}
        queries={MasterAndViewerQueries}
      />
      <Route
        path='profile' component={ProfilePage}
        queries={MasterAndViewerQueries}
      />
      <Route
        path='user/:userId' component={UserPage}
        queries={UserQueries}
      />
      <Route
        path='resource/:resourceId' component={ResourcePage}
        queries={ResourceQueries}
      />
      <Route
        path='group/:groupId' component={GroupPage}
        queries={GroupAndViewerQueries}
      />
    </Route>
  </RelayRouter>,
  document.getElementById('root')
);
