import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import FaUser from 'react-icons/lib/fa/user';
import FaGroup from 'react-icons/lib/fa/group';

import styles from './ResourcePage.css';

class ResourcePage extends React.Component {
  render () {
    const {resource} = this.props;
    const owner = resource.users.edges[0].node;
    return <div>
      <h4>Resource</h4>
      <h2>{resource.name}</h2>
      <p className={styles.category}>| {resource.category} |</p>
      <p className={styles.owner}>
        <Link to={`/user/${owner.id}`}>
          <FaUser className={styles.icon} /> {owner.name}
        </Link>
      </p>
      {resource.groups.edges.map(edge => <p key={edge.node.id}>
        <Link to={`/group/${edge.node.id}`}>
          <FaGroup className={styles.icon} /> {edge.node.name}
        </Link>
      </p>)}
      <p className={styles.description}>{resource.description}</p>
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


