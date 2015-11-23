import {Link} from 'react-router';
import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  render () {
    return <div>
      <h1><Link to={'/'}>App</Link></h1>
      {this.props.children}
    </div>;
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
      }
    `,
  },
});

