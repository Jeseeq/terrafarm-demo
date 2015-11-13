import 'babel/polyfill';
import {createHashHistory} from 'history';
import {IndexRoute, Route} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import {RelayRouter} from 'react-router-relay';
import App from './components/App';
import MasterQueries from './queries/MasterQueries';

ReactDOM.render(
  <RelayRouter history={createHashHistory({queryKey: false})}>
    <Route
      path='/' component={App}
      queries={MasterQueries}
    />
  </RelayRouter>,
  document.getElementById('root')
);

