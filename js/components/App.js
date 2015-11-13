import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  render () {
    return <div>
      <h1>Profile</h1>
      <h2>{this.props.viewer.name}</h2>
      <h3>Roles</h3>
      <ul>
        {this.props.viewer.roles.edges.map(edge =>
          <li key={edge.node.id}>{edge.node.name}</li>
        )}
      </ul>
    </div>;
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        name,
        roles(first: 10) {
          edges {
            node {
              id,
              name,
            },
          },
        },
      }
    `,
  },
});
