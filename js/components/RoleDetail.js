import React from 'react';
import Relay from 'react-relay';
import UserSwitch from './UserSwitch';

class RoleDetail extends React.Component {
  render () {
    var {role} = this.props;
    return <div>
      <h3>{role.name}</h3>
      <ol>
        {role.users.edges.map(edge => <li key={edge.node.id}>
          <UserSwitch role={role} user={edge.node} />
        </li>)}
      </ol>
    </div>;
  }
}

export default Relay.createContainer(RoleDetail, {
  fragments: {
    role: () => Relay.QL`
      fragment on Role {
        name,
        users(first: 10) {
          edges {
            node {
              id,
              ${UserSwitch.getFragment('user')},
            }
          }
        },
        ${UserSwitch.getFragment('role')},
      }
    `,
  },
});

