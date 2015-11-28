import 'babel/polyfill';
import {createHashHistory} from 'history';
import {IndexRoute, Route} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import {RelayRouter} from 'react-router-relay';

import PluckYourselfApp from './components/PluckYourselfApp';
// import BrowsePage from './BrowsePage';
// import LoginPage from './LoginPage';
// import ProfilePage from './ProfilePage';
// import UserPage from './UserPage';
// import ResourcePage from './ResourcePage';
// import GroupPage from './GroupPage';
// import NewResourcePage from './NewResourcePage';
// import NewGroupPage from './NewGroupPage';
import MasterList from './components/MasterList';
import UserList from './components/UserList';
import ResourceList from './components/ResourceList';
import GroupList from './components/GroupList';
import ViewerProfile from './components/ViewerProfile';
import UserPage from './components/UserPage';
import ResourcePage from './components/ResourcePage';
import GroupPage from './components/GroupPage';

import MasterQueries from './queries/MasterQueries';
import ViewerQueries from './queries/ViewerQueries';
import UserQueries from './queries/UserQueries';
import ResourceQueries from './queries/ResourceQueries';
import GroupQueries from './queries/GroupQueries';

ReactDOM.render(
  <RelayRouter history={createHashHistory({queryKey: false})}>
    <Route
      path='/' component={PluckYourselfApp}
      queries={MasterQueries}
    >
      <IndexRoute
        component={MasterList}
        queries={MasterQueries}
      />
      <Route
        path='profile' component={ViewerProfile}
        queries={ViewerQueries}
      />
      <Route
        path='users' component={UserList}
        queries={MasterQueries}
      />
      <Route
        path='resources' component={ResourceList}
        queries={MasterQueries}
      />
      <Route
        path='groups' component={GroupList}
        queries={MasterQueries}
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
    </Route>
  </RelayRouter>,
  document.getElementById('root')
);
