import DisconnectResourceMutation from '../mutations/DisconnectResourceMutation';
import DisconnectGroupMutation from '../mutations/DisconnectGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

class ViewerProfile extends React.Component {
  _handleDisconnectResource (resource) {
    Relay.Store.update(
      new DisconnectResourceMutation({
        user: this.props.viewer.user,
        resource: resource,
      })
    );
  }
  _handleDisconnectGroup (group) {
    Relay.Store.update(
      new DisconnectGroupMutation({
        user: this.props.viewer.user,
        group: group,
      })
    );
  }
  render () {
    var {viewer} = this.props;
    var {user} = viewer;

    return <div>
      <h2>Profile: {user.name}</h2>
      <h3>Resources</h3>
      <ul>
        {user.resources.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/resource/${edge.node.id}`}>{edge.node.name}</Link>
          <button
            onClick={this._handleDisconnectResource.bind(this, edge.node)}>
            disconnect
          </button>
        </li>)}
      </ul>
      <h3>Groups</h3>
      <ul>
        {user.groups.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/group/${edge.node.id}`}>{edge.node.name}</Link>
          <button
            onClick={this._handleDisconnectGroup.bind(this, edge.node)}>
            disconnect
          </button>
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
        user {
          name,
          resources(first: 18) {
            edges {
              node {
                id,
                name,
                ${DisconnectResourceMutation.getFragment('resource')},
              }
            }
          },
          groups(first: 18) {
            edges {
              node {
                id,
                name,
                ${DisconnectGroupMutation.getFragment('group')},
              }
            }
          },
          ${DisconnectResourceMutation.getFragment('user')},
          ${DisconnectGroupMutation.getFragment('user')}
        },
      }
    `,
  }
});



