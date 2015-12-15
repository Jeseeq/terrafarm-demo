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
    const {viewer, master} = this.props;
    const {user} = viewer;

    return <div>
      <h2 className={styles.heading}>{user.name}</h2>
      <h3>Resources</h3>
      <ul>
        {user.resources.edges.map(edge => <li key={edge.node.id}>
          <EditResourcePanel resource={edge.node} />
        </li>)}
        <li><NewResourcePanel user={user} master={master} /></li>
      </ul>
      <h3>Groups</h3>
      <ul>
        {user.groups.edges.map(edge => <li key={edge.node.id}>
          <EditGroupPanel user={user} group={edge.node} />
        </li>)}
        <li><NewGroupPanel user={user} master={master} /></li>
      </ul>
      <h3>Pending Groups</h3>
      <ul>
        {user.groupsPending.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/group/${edge.node.id}`}>{edge.node.name}</Link>
        </li>)}
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
          groupsPending(first: 18) {
            edges {
              node {
                id,
                name,
              }
            }
          },
          ${EditGroupPanel.getFragment('user')},
          ${NewResourcePanel.getFragment('user')},
          ${NewGroupPanel.getFragment('user')},
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

