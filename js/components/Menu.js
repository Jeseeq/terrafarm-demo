import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

export default class Menu extends React.Component {
  // if not logged in, show link to login
  // else show logout
  render () {
    var menuItems = [
      'browse',
      'login',
      'profile',
      'new-user',
      'new-resources',
      'new-group',
    ].map((item, i) => <li key={i}>
      <h4><Link to={'/'+item}>{item.replace('-', ' ')}</Link></h4>
    </li>);

    return <ul>{menuItems}</ul>;
/*
      <li><h4><Link to={'/browse'}>Browse</Link></h4></li>
      <li><h4><Link to={'/login'}>Login</Link></h4></li>
      <li><h4><Link to={'/profile'}>Profile</Link></h4></li>
      <li><h4><Link to={'/new-user'}>New User</Link></h4></li>
      <li><h4><Link to={'/new-resource'}>New Resource</Link></h4></li>
      <li><h4><Link to={'/new-group'}>New Group</Link></h4></li>
*/
  }
}

Menu.propTypes = {
  loggedIn: React.PropTypes.bool,
};

