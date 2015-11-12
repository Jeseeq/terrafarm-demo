import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  render () {
    console.log(this.props);
    return <div>
      <h1>Role list</h1>
      <ul>
        {this.props.viewer.roles.edges.map(edge =>
          <li key={edge.node.id}>{edge.node.name} (ID: {edge.node.id})</li>
        )}
      </ul>
    </div>;
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
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
