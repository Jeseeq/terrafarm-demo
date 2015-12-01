import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import EditResourcePanel from './EditResourcePanel';
import EditGroupPanel from './EditGroupPanel';
import NewResourcePanel from './NewResourcePanel';
import NewGroupPanel from './NewGroupPanel';
import styles from './ProfilePage.css';

class ProfilePage extends React.Component {
  render () {
    var {viewer, master} = this.props;
    var {user} = viewer;

    return <div>
      <h2 className={styles.heading}>{user.name}</h2>
      <h3>Resources</h3>
      <ul>
        {user.resources.edges.map(edge => <li key={edge.node.id}>
          <EditResourcePanel user={user} resource={edge.node} />
        </li>)}
        <NewResourcePanel master={master} />
      </ul>
      <h3>Groups</h3>
      <ul>
        {user.groups.edges.map(edge => <li key={edge.node.id}>
          <EditGroupPanel user={user} group={edge.node} />
        </li>)}
        <NewGroupPanel master={master} />
      </ul>
    </div>;
  }
}

export default Relay.createContainer(ProfilePage, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
        user {
          name,
          resources(first: 18) {
            edges {
              node {
                id,
                name,
                ${EditResourcePanel.getFragment('resource')},
              }
            }
          },
          groups(first: 18) {
            edges {
              node {
                id,
                name,
                ${EditGroupPanel.getFragment('group')},
              }
            }
          },
          ${EditResourcePanel.getFragment('user')},
          ${EditGroupPanel.getFragment('user')},
        },
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        ${NewResourcePanel.getFragment('master')},
        ${NewGroupPanel.getFragment('master')},
      }
    `,
  },
});



