import React from 'react';
import Relay from 'react-relay';
//import User from './User';
//import Role from './Role';

class App extends React.Component {
  render () {
    var {viewer} = this.props;
    return <div>Got sum work to do
    </div>;
    /*
      <h1>By Role</h1>
      <ol>
        {roles.map(role => <li key={role.id}>
          <h2>{role.name}</h2>
          <ol>
            {role.users.edges.map(edge => <li key={edge.node.id}>
              <User user={edge.node}/>
            </li>)}
          </ol>
        </li>)}
      </ol>
      <h1>By User</h1>
      <ol>
        {users.map(user => <li key={user.id}>
          <h2>{user.name}</h2>
          <ol>
            {user.roles.edges.map(edge => <li key={edge.node.id}>
              <Role role={edge.node} user={user}/>
            </li>)}
          </ol>
        </li>)}
      </ol>
    */
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
            }
          }
        },
        roles(first: 10) {
          edges {
            node {
              id,
              name,
            }
          }
        },
      }
    `,
  },
});

