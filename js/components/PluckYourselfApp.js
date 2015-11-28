import React from 'react';
import Relay from 'react-relay';
import {Link, IndexLink} from 'react-router';

class PluckYourselfApp extends React.Component {
  // if not logged in, show link to login
  // else show username
  render () {
    return <div>
      <h1><IndexLink to={'/'}>Pluck Yourself App</IndexLink></h1>
      <div><Link to={'/login'}>Login</Link></div>
      {this.props.children}
    </div>;
  }
}

export default Relay.createContainer(PluckYourselfApp, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
      }
    `,
  },
});

