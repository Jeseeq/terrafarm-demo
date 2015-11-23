import {Link} from 'react-router';
import React from 'react';
import Relay from 'react-relay';

class GroupPage extends React.Component {
  render () {
    var {group} = this.props;
    return <div>
      <h2>{group.name}</h2>
      <h3>Users</h3>
      <ul>
        {group.users.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/user/${edge.node.id}`}>{edge.node.name}</Link>
        </li>)}
      </ul>
      <h3>Resources</h3>
      <ul>
        {group.resources.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/resource/${edge.node.id}`}>{edge.node.name}</Link>
        </li>)}
      </ul>
    </div>;
  }
}

export default Relay.createContainer(GroupPage, {
  initialVariables: {
    groupId: null,
  },
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        name,
        users(first: 18) {
          edges {
            node {
              id,
              name,
            }
          }
        }
        resources(first: 18) {
          edges {
            node {
              id,
              name,
            }
          }
        }
      }
    `
  }
});


