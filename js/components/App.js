import React from 'react';
import Relay from 'react-relay';
import User from './User';
import Role from './Role';

class App extends React.Component {
  render () {
    var {roles, users} = this.props;
    return <div>
      <h1>By Role</h1>
      <ol>
        {roles.map((role, i) => <li key={i}>
          <h2>{role.name}</h2>
          <ol>
            {role.users.edges.map((edge, ii) => <li key={ii}>
              <User user={edge.node}/>
            </li>)}
          </ol>
        </li>)}
      </ol>
      <h1>By User</h1>
      <ol>
        {users.map((user, j) => <li key={j}>
          <h2>{user.name}</h2>
          <ol>
            {user.roles.edges.map((edge, jj) => <li key={jj}>
              <Role role={edge.node}/>
            </li>)}
          </ol>
        </li>)}
      </ol>
    </div>;
  }
}

export default Relay.createContainer(App, {
  fragments: {
    users: () => Relay.QL`
      fragment on User @relay(plural: true) {
        name,
        roles(first: 10) {
          edges {
            node {
              ${Role.getFragment('role')}
            }
          }
        }
      }
    `,
    roles: () => Relay.QL`
      fragment on Role @relay(plural: true) {
        name,
        users(first: 10) {
          edges {
            node {
              ${User.getFragment('user')}
            }
          }
        }
      }
    `,
  },
});

