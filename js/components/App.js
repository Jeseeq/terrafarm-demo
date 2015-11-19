import React from 'react';
import Relay from 'react-relay';
import UserDetail from './UserDetail';
// InputDetail
// GroupDetail
// ProvisionDetail

class App extends React.Component {
  render () {
    var {viewer} = this.props;
    console.log('viewer:', viewer);
    var {users, inputs, groups, provisions} = viewer;

    return <div>
      <h1>App</h1>
      <ul>
        {users.edges.map(edge => <li key={edge.node.id}>
          <UserDetail user={edge.node} />
        </li>)}
      </ul>
    </div>;
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        users(first: 5) {
          edges {
            node {
              id,
              ${UserDetail.getFragment('user')},
            },
          }
        },
      }
    `,
  },
});

