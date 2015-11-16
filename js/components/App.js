import React from 'react';
import Relay from 'react-relay';
import UserDetail from './UserDetail';
import RoleDetail from './RoleDetail';

class App extends React.Component {
  render () {
    var {viewer} = this.props;
    var {users, roles} = viewer;
    return <div>
      <h1>By User</h1>
      <ol>
        {users.edges.map(edge => <li key={edge.node.id}>
          <UserDetail user={edge.node} />
        </li>)}
      </ol>
      <h1>By Role</h1>
      <ol>
        {roles.edges.map(edge => <li key={edge.node.id}>
          <RoleDetail role={edge.node} />
        </li>)}
      </ol>
    </div>;
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        users(first: 10) {
          edges {
            node {
              id,
              ${UserDetail.getFragment('user')},
            },
          }
        },
        roles(first: 10) {
          edges {
            node {
              id,
              ${RoleDetail.getFragment('role')},
            },
          }
        },

      }
    `,
  },
});

