import {Link} from 'react-router';
import React from 'react';
import Relay from 'react-relay';

class ViewerProfile extends React.Component {
  render () {
    var {viewer} = this.props;
    return <div>
      <h2>{viewer.name}</h2>
      <h3>Resources</h3>
      <ul>
        {viewer.resources.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/resource/${edge.node.id}`}>{edge.node.name}</Link>
        </li>)}
      </ul>
      <h3>Groups</h3>
      <ul>
        {viewer.groups.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/group/${edge.node.id}`}>{edge.node.name}</Link>
        </li>)}
      </ul>
    </div>;
  }
}

export default Relay.createContainer(ViewerProfile, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
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
        }
      }
    `,
  }
});



