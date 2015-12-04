import CancelPendingUserToGroupMutation from '../mutations/CancelPendingUserToGroupMutation';
import PendingUserToGroupMutation from '../mutations/PendingUserToGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

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
    var {group, viewer} = this.props;
    var {groups, groupsPending} = viewer.user;
    var isMember = groups.edges.find(node => node.id === group.id);
    var isPendingMember = groupsPending.edges.find(node => node.id === group.id);

    if (isMember) {
      // TODO: add 'accept' and 'reject' buttons
      return <div>
        <h3>Pending Users</h3>
        <ul>
          {group.usersPending.edges.map(edge => <li key={edge.node.id}>
            <Link to={`/user/${edge.node.id}`}>{edge.node.name}</Link>
          </li>)}
        </ul>
      </div>;
    } else if (isPendingMember) {
      return <button onClick={this._handleCancelMembershipRequest}>Cancel Membership Request</button>
    } else {
      return <button onClick={this._handleRequestMembership}>Request Membership</button>;
    }
  }
  render () {
    var {group, viewer} = this.props;
    var memberControls = this._getMemberControls();

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
        ${PendingUserToGroupMutation.getFragment('group')},
        ${CancelPendingUserToGroupMutation.getFragment('group')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on Viewer {
        user {
          id,
          groups(first: 18) {
            edges {
              node {
                id,
              }
            }
          },
          groupsPending(first: 18) {
            edges {
              node {
                id,
              }
            }
          },
          ${PendingUserToGroupMutation.getFragment('user')},
          ${CancelPendingUserToGroupMutation.getFragment('user')},
        }
      }
    `,
  },
});


