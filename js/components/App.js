import {Link, IndexLink} from 'react-router';
import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  render () {
    return <div>
      <h1><IndexLink to={'/'}>App</IndexLink></h1>
      <div><Link to={'/profile'}>Go to current profile</Link></div>
      {this.props.children}
    </div>;
  }
}

export default Relay.createContainer(App, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        id,
      }
    `,
  },
});

