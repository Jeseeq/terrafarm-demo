import 'babel/polyfill';
// import {createHistory} from 'history';
import {IndexRoute, Route, browserHistory} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import {RelayRouter} from 'react-router-relay';
import injectTapEventPlugin from 'react-tap-event-plugin';

import TerrafarmApp from './elements/TerrafarmApp';
import HomePage from './elements/HomePage';
import AboutPage from './elements/AboutPage';

import BrowsePage from './components/BrowsePage';
import LoginPage from './components/LoginPage';
import CreateAccountPage from './components/CreateAccountPage';
import ProfilePage from './components/ProfilePage';
import UserPage from './components/UserPage';
import ResourcePage from './components/ResourcePage';
import GroupPage from './components/GroupPage';

import MasterAndViewerQueries from './queries/MasterAndViewerQueries';
import MasterQueries from './queries/MasterQueries';
import UserQueries from './queries/UserQueries';
import ResourceQueries from './queries/ResourceQueries';
import GroupAndViewerQueries from './queries/GroupAndViewerQueries';

injectTapEventPlugin();

ReactDOM.render(
  <RelayRouter history={browserHistory}>
    <Route
      path={'/'} component={TerrafarmApp}
    >
      <IndexRoute component={HomePage} />
      <Route path={'about'} component={AboutPage} />

      <Route
        path={'login'} component={LoginPage}
        queries={MasterAndViewerQueries}
      />
      <Route
        path={'create-account'} component={CreateAccountPage}
        queries={MasterQueries}
      />
      <Route
        path={'browse'} component={BrowsePage}
        queries={MasterAndViewerQueries}
      />
      <Route
        path={'profile'} component={ProfilePage}
        queries={MasterAndViewerQueries}
      />
      <Route
        path={'user/:userId'} component={UserPage}
        queries={UserQueries}
      />
      <Route
        path={'resource/:resourceId'} component={ResourcePage}
        queries={ResourceQueries}
      />
      <Route
        path={'group/:groupId'} component={GroupPage}
        queries={GroupAndViewerQueries}
      />
    </Route>
  </RelayRouter>,
  document.getElementById('root')
);
