import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

class UserPage extends React.Component {
  render () {
    var {user} = this.props;
    return <div>
      <h2>{user.name}</h2>
      <h3>Resources</h3>
      <ul>
        {user.resources.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/resource/${edge.node.id}`}>{edge.node.name}</Link>
        </li>)}
      </ul>
      <h3>Groups</h3>
      <ul>
        {user.groups.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/group/${edge.node.id}`}>{edge.node.name}</Link>
        </li>)}
      </ul>
    </div>;
  }
}

export default Relay.createContainer(UserPage, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
        user,
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
        resources(first: 18) {
          edges {
            node {
              id,
              name,
            }
          }
        },
        groups(first: 18) {
          edges {
            node {
              id,
              name,
            }
          }
        },
      }
    `,
  }
});

