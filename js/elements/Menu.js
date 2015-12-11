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
    ].map((item, i) => <Link to={'/'+item} key={i}>{item.replace('-', ' ')}</Link>);
    // <ul><li><h4>

    return <div>{menuItems}</div>;
  }
}

Menu.propTypes = {
  loggedIn: React.PropTypes.bool,
};

