import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  render () {
    return <div>
      <h1>Pluck Yourself App</h1>
      <h2>Roles</h2>
      <h3>Master</h3>
      <ul>
        {this.props.master.roles.edges.map(edge =>
          <li key={edge.node.id}>{edge.node.name}</li>
        )}
      </ul>
      <h3>Viewer (Name: {this.props.viewer.name})</h3>
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
    master: () => Relay.QL`
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
