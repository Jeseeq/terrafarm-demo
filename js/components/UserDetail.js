import React from 'react';
import Relay from 'react-relay';
import RoleSwitch from './RoleSwitch';

class UserDetail extends React.Component {
  render () {
    var {user, roles} = this.props;
    var userRoleIds = user.roles.edges.map(edge => edge.node.id);

    return <div>
      <h3>{user.name}</h3>
      <ol>
        {roles.edges.map(edge => <li key={edge.node.id}>
          <RoleSwitch
            user={user}
            role={edge.node}
            connected={!!userRoleIds.find(id => id === edge.node.id)}
          />
        </li>)}
      </ol>
    </div>;
  }
}

export default Relay.createContainer(UserDetail, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name,
        roles(first: 10) {
          edges {
            node {
              id,
            }
          }
        },
        ${RoleSwitch.getFragment('user')},
      }
    `,
    roles: () => Relay.QL`
      fragment on RoleConnection {
        edges {
          node {
            id,
            ${RoleSwitch.getFragment('role')},
          }
        }
      }
    `,
  },
});

