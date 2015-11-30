import React from 'react';
import Relay from 'react-relay';
import {IndexLink} from 'react-router';

export default class Logo extends React.Component {
  render () {
    return <div>
      <h1><IndexLink to={'/'}>Pluck Yourself App</IndexLink></h1>
    </div>;
  }
}

