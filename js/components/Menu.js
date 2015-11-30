import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

export default class Menu extends React.Component {
  // if not logged in, show link to login
  // else show logout
  render () {
    return <div>
      <div><Link to={'/login'}>Login</Link></div>
      <div><Link to={'/profile'}>Profile</Link></div>
      <div><Link to={'/new-user'}>New User</Link></div>
      <div><Link to={'/new-resource'}>New Resource</Link></div>
      <div><Link to={'/new-group'}>New Group</Link></div>
    </div>;
  }
}

/*
Menu.propTypes = {
  loggedIn: React.PropTypes.bool,
};
*/
