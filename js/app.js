import 'babel/polyfill';
import {createHashHistory} from 'history';
import {IndexRoute, Route} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import {RelayRouter} from 'react-router-relay';
import App from './components/App';
import MasterList from './components/MasterList';
import UserList from './components/UserList';
import ResourceList from './components/ResourceList';
import GroupList from './components/GroupList';
import HomeRoute from './routes/HomeRoute';
import ViewerQueries from './queries/ViewerQueries';

ReactDOM.render(
  <RelayRouter history={createHashHistory({queryKey: false})}>
    <Route
      path='/' component={App}
      queries={ViewerQueries}
    >
      <IndexRoute
        component={MasterList}
        queries={ViewerQueries}
        prepareParams={() => ({})}
      />
      <Route
        path='users' component={UserList}
        queries={ViewerQueries}
        prepareParams={() => ({})}
      />
      <Route
        path='resources' component={ResourceList}
        queries={ViewerQueries}
        prepareParams={() => ({})}
      />
      <Route
        path='groups' component={GroupList}
        queries={ViewerQueries}
        prepareParams={() => ({})}
      />
    </Route>
  </RelayRouter>,
  document.getElementById('root')
);
