import DisconnectUserFromResourceMutation from '../mutations/DisconnectUserFromResourceMutation';
import DisconnectUserFromGroupMutation from '../mutations/DisconnectUserFromGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import styles from './ProfilePage.css';

class ProfilePage extends React.Component {
  _handleDisconnectUserFromResource (resource) {
    Relay.Store.update(
      new DisconnectUserFromResourceMutation({
        user: this.props.viewer.user,
        resource: resource,
      })
    );
  }
  _handleDisconnectUserFromGroup (group) {
    Relay.Store.update(
      new DisconnectUserFromGroupMutation({
        user: this.props.viewer.user,
        group: group,
      })
    );
  }
  render () {
    var {viewer} = this.props;
    var {user} = viewer;

    return <div>
      <h2 className={styles.heading}>{user.name}</h2>
      <h3>Resources</h3>
      <ul>
        {user.resources.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/resource/${edge.node.id}`}>{edge.node.name}</Link>
          <button
            onClick={this._handleDisconnectUserFromResource.bind(this, edge.node)}>
            disconnect
          </button>
        </li>)}
      </ul>
      <h3>Groups</h3>
      <ul>
        {user.groups.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/group/${edge.node.id}`}>{edge.node.name}</Link>
          <button
            onClick={this._handleDisconnectUserFromGroup.bind(this, edge.node)}>
            disconnect
          </button>
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
                ${DisconnectUserFromResourceMutation.getFragment('resource')},
              }
            }
          },
          groups(first: 18) {
            edges {
              node {
                id,
                name,
                ${DisconnectUserFromGroupMutation.getFragment('group')},
              }
            }
          },
          ${DisconnectUserFromResourceMutation.getFragment('user')},
          ${DisconnectUserFromGroupMutation.getFragment('user')}
        },
      }
    `,
  }
});



