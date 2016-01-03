import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

class ResourcePage extends React.Component {
  render () {
    const {resource} = this.props;
    return <div>
      <h4>Resource</h4>
      <h2>{resource.name}</h2>
      <h3>Description</h3>
      <p>{resource.description}</p>
      <h3>Category</h3>
      <p>{resource.category}</p>
      <h3>Owner</h3>
      <ul>
        {resource.users.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/user/${edge.node.id}`}>{edge.node.name}</Link>
        </li>)}
      </ul>
      <h3>Groups</h3>
      <ul>
        {resource.groups.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/group/${edge.node.id}`}>{edge.node.name}</Link>
        </li>)}
      </ul>
    </div>;
  }
}

export default Relay.createContainer(ResourcePage, {
  initialVariables: {
    resourceId: null,
  },
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        name,
        description,
        category,
        users(first: 18) {
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


