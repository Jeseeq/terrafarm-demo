import CancelPendingUserToGroupMutation from '../mutations/CancelPendingUserToGroupMutation';
import PendingUserToGroupMutation from '../mutations/PendingUserToGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import MembershipRequests from './MembershipRequests';
import CommitResourcesPanel from './CommitResourcesPanel';
import FlatButton from 'material-ui/lib/flat-button';

class GroupPage extends React.Component {
  _handleRequestMembership = () => {
    Relay.Store.update(
      new PendingUserToGroupMutation({
        user: this.props.viewer.user,
        group: this.props.group,
      })
    );
  }
  _handleCancelMembershipRequest = () => {
    Relay.Store.update(
      new CancelPendingUserToGroupMutation({
        user: this.props.viewer.user,
        group: this.props.group,
      })
    );
  }
  _getMemberControls () {
    const {group, viewer} = this.props;
    const {users, usersPending} = group;
    const {user} = viewer;
    const isMember = users.edges.find(edge => edge.node.id === user.id);
    const isPendingMember = usersPending.edges.find(edge => edge.node.id === user.id);

    if (isMember) {
      return <div>
        <MembershipRequests group={group} />
        <CommitResourcesPanel group={group} viewer={viewer} />
      </div>;
    } else if (isPendingMember) {
      return <FlatButton label={'Cancel Membership Request'} onClick={this._handleCancelMembershipRequest} />;
    }
    return <FlatButton label={'Request Membership'} onClick={this._handleRequestMembership} />;
  }
  render () {
    const {group} = this.props;
    const memberControls = this._getMemberControls();
    return <div>
      <h2>{group.name}</h2>
      <h3>Users</h3>
      <ul>
        {group.users.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/user/${edge.node.id}`}>{edge.node.name}</Link>
        </li>)}
      </ul>
      {memberControls}
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
        id,
        name,
        users(first: 18) {
          edges {
            node {
              id,
              name,
            }
          }
        },
        usersPending(first: 18) {
          edges {
            node {
              id,
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
        ${PendingUserToGroupMutation.getFragment('group')},
        ${CancelPendingUserToGroupMutation.getFragment('group')},
        ${MembershipRequests.getFragment('group')},
        ${CommitResourcesPanel.getFragment('group')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on Viewer {
        user {
          id,
          ${CancelPendingUserToGroupMutation.getFragment('user')},
          ${PendingUserToGroupMutation.getFragment('user')},
        },
        ${CommitResourcesPanel.getFragment('viewer')},
      }
    `,
  },
});


