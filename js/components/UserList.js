import React from 'react';
import Relay from 'react-relay';
import UserDetail from './UserDetail';
import UserNew from './UserNew';

class UserList extends React.Component {
  render () {
    var {master} = this.props;
    var {users} = master;

    return <div>
      <h2>Users</h2>
      <ul>
        {users.edges.map(edge => <li key={edge.node.id}>
          <UserDetail user={edge.node} />
        </li>)}
        <li><UserNew master={master}/></li>
      </ul>
    </div>;
  }
}

export default Relay.createContainer(UserList, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        users(first: 10) {
          edges {
            node {
              id,
              ${UserDetail.getFragment('user')},
            },
          }
        },
        ${UserNew.getFragment('master')},
      }
    `,
  },
});


