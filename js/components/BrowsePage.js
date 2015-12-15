import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

class BrowsePage extends React.Component {
  render () {
    const {master} = this.props;
    const {users, resources, groups} = master;

    return <div>
      <h2>Browse</h2>
      <h3>Users</h3>
      <ul>
        {users.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/user/${edge.node.id}`}>{edge.node.name}</Link>
        </li>)}
      </ul>
      <h3>Resources</h3>
      <ul>
        {resources.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/resource/${edge.node.id}`}>{edge.node.name}</Link>
        </li>)}
      </ul>
      <h3>Groups</h3>
      <ul>
        {groups.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/group/${edge.node.id}`}>{edge.node.name}</Link>
        </li>)}
      </ul>
    </div>;
  }
}

export default Relay.createContainer(BrowsePage, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        users(first: 18) {
          edges {
            node {
              id,
              name,
            }
          }
        },
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
  },
});
