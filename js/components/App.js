import React from 'react';
import Relay from 'react-relay';
import User from './User';
import Role from './Role';

class App extends React.Component {
  render () {
    var {viewer} = this.props;
    var {users, roles} = viewer;
    return <div>
      <h1>By Role</h1>
      <ol>
        {roles.edges.map(role => <li key={role.node.id}>
          <h2>{role.node.name}</h2>
          <ol>
            {role.node.users.edges.map(user => <li key={user.node.id}>
              <User user={user.node} role={role.node}/>
            </li>)}
          </ol>
        </li>)}
      </ol>
      <h1>By User</h1>
      <ol>
        {users.edges.map(user => <li key={user.node.id}>
          <h2>{user.node.name}</h2>
          <ol>
            {user.node.roles.edges.map(role => <li key={role.node.id}>
              <Role role={role.node} user={user.node}/>
            </li>)}
          </ol>
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
              name,
              roles(first: 10) {
                edges {
                  node {
                    id,
                    ${Role.getFragment('role')},
                  }
                }
              },
              ${Role.getFragment('user')},
            },
          }
        },
        roles(first: 10) {
          edges {
            node {
              id,
              name,
              users(first: 10) {
                edges {
                  node {
                    id,
                    ${User.getFragment('user')},
                  }
                }
              },
            }
          }
        },
      }
    `,
  },
});

