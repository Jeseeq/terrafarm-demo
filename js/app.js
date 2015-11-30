import 'babel/polyfill';
import {createHashHistory} from 'history';
import {IndexRoute, Route} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import {RelayRouter} from 'react-router-relay';

import PluckYourselfApp from './containers/PluckYourselfApp';
import BrowsePage from './containers/BrowsePage';
import LoginPage from './containers/LoginPage';
import ProfilePage from './containers/ProfilePage';
import UserPage from './containers/UserPage';
import ResourcePage from './containers/ResourcePage';
import GroupPage from './containers/GroupPage';
import NewUserPage from './containers/NewUserPage';
import NewResourcePage from './containers/NewResourcePage';
import NewGroupPage from './containers/NewGroupPage';

import MasterAndViewerQueries from './queries/MasterAndViewerQueries';
import MasterQueries from './queries/MasterQueries';
import ViewerQueries from './queries/ViewerQueries';
import UserQueries from './queries/UserQueries';
import ResourceQueries from './queries/ResourceQueries';
import GroupQueries from './queries/GroupQueries';

ReactDOM.render(
  <RelayRouter history={createHashHistory({queryKey: false})}>
    <Route
      path='/' component={PluckYourselfApp}
      queries={MasterAndViewerQueries}
    >
      <IndexRoute
        component={BrowsePage}
        queries={MasterAndViewerQueries}
      />
      <Route
        path='login' component={LoginPage}
        queries={MasterAndViewerQueries}
      />
      <Route
        path='profile' component={ProfilePage}
        queries={ViewerQueries}
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
        queries={GroupQueries}
      />
      <Route
        path='new-user' component={NewUserPage}
        queries={MasterQueries}
      />
      <Route
        path='new-resource' component={NewResourcePage}
        queries={MasterQueries}
      />
      <Route
        path='new-group' component={NewGroupPage}
        queries={MasterQueries}
      />
    </Route>
  </RelayRouter>,
  document.getElementById('root')
);
