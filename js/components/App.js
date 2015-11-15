import RemoveUserRoleMutation from '../mutations/RemoveUserRoleMutation';
import React from 'react';
import Relay from 'react-relay';
import User from './User';
import Role from './Role';

class App extends React.Component {
  _handleRemoveRole = (user, role) => {
    console.log(`remove role ${role} from user ${user}`);
    Relay.Store.update(
      new RemoveUserRoleMutation({user, role})
    );
  }
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
              <Role role={edge.node} onClick={this._handleRemoveRole(user, edge.node)}/>
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
        id,
        name,
        roles(first: 10) {
          edges {
            node {
              id,
              ${Role.getFragment('role')}
              ${RemoveUserRoleMutation.getFragment('role')},
            }
          }
        },
        ${RemoveUserRoleMutation.getFragment('user')},
      }
    `,
    roles: () => Relay.QL`
      fragment on Role @relay(plural: true) {
        id,
        name,
        users(first: 10) {
          edges {
            node {
              id,
              ${User.getFragment('user')},
            }
          }
        }
      }
    `,
  },
});

