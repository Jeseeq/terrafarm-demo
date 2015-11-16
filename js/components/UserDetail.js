import React from 'react';
import Relay from 'react-relay';
import RoleSwitch from './RoleSwitch';

class UserDetail extends React.Component {
  render () {
    var {user} = this.props;
    return <div>
      <h3>{user.name}</h3>
      <ol>
        {user.roles.edges.map(edge => <li key={edge.node.id}>
          <RoleSwitch user={user} role={edge.node} />
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
              ${RoleSwitch.getFragment('role')},
            }
          }
        },
        ${RoleSwitch.getFragment('user')},
      }
    `,
  },
});

