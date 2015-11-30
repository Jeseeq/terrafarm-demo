import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

export default class Menu extends React.Component {
  // if not logged in, show link to login
  // else show logout
  render () {
    return <ul>
      <li><Link to={'/login'}>Login</Link></li>
      <li><Link to={'/profile'}>Profile</Link></li>
      <li><Link to={'/new-user'}>New User</Link></li>
      <li><Link to={'/new-resource'}>New Resource</Link></li>
      <li><Link to={'/new-group'}>New Group</Link></li>
    </ul>;
  }
}

Menu.propTypes = {
  loggedIn: React.PropTypes.bool,
};

