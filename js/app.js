import 'babel/polyfill';
//import {createHashHistory} from 'history';
//import {IndexRoute, Route} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
//import {RelayRouter} from 'react-router-relay';
import App from './components/App';
import HomeRoute from './routes/HomeRoute';
//import MasterQueries from './queries/MasterQueries';

ReactDOM.render(
  <Relay.RootContainer
    Component={App}
    route={new HomeRoute({
      roleNames: ['supervisor', 'engineer', 'farmhand'],
      userNames: ['anonymous', 'jane', 'bob']
    })}
  />,
  document.getElementById('root')
);

/**
ReactDOM.render(
  <RelayRouter history={createHashHistory({queryKey: false})}>
    <Route
      path='/' component={App}
      queries={new MasterQueries({
        roleNames: ['supervisors', 'engineers', 'farmhands']
      })}
    />
  </RelayRouter>,
  document.getElementById('root')
);
*/
