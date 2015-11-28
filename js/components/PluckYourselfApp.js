import React from 'react';
import Relay from 'react-relay';
import {Link, IndexLink} from 'react-router';

class PluckYourselfApp extends React.Component {
  render () {
    return <div>
      <h1><IndexLink to={'/'}>Pluck Yourself App</IndexLink></h1>
      <div><Link to={'/profile'}>Go to current profile</Link></div>
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

