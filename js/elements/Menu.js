import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

export default class Menu extends React.Component {
  // if not logged in, show link to login
  // else show logout
  render () {
    var menuItems = [
      'login',
      'profile',
      'browse',
    ].map((item, i) => <li key={i}>
      <h4><Link to={'/'+item}>{item.replace('-', ' ')}</Link></h4>
    </li>);

    return <ul>{menuItems}</ul>;
  }
}

Menu.propTypes = {
  loggedIn: React.PropTypes.bool,
};

