import CancelPendingUserToGroupMutation from '../mutations/CancelPendingUserToGroupMutation';
import PendingUserToGroupMutation from '../mutations/PendingUserToGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import MembershipRequests from './MembershipRequests';
import CommitResourcesPanel from './CommitResourcesPanel';
import FlatButton from 'material-ui/lib/flat-button';
import createColorChart from '../shared-styles/create-color-chart';

class GroupPage extends React.Component {
  state = {
    colorChart: {},
  };
  componentWillMount () {
    const {group} = this.props;
    const {users} = group;
    const userIds = users.edges.map(edge => edge.node.id);
    const colorChart = createColorChart(userIds);
    this.setState({colorChart});
  }
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
      <h4>Group</h4>
      <h2>{group.name}</h2>
      <h3>Users</h3>
      <ul>
        {group.users.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/user/${edge.node.id}`}>{edge.node.name}</Link>
          <div
            style={{
              display: 'inline-block', width: 25, height: 8,
              marginLeft: 10,
              borderRadius: 3,
              backgroundColor: this.state.colorChart[edge.node.id],
            }}
          />
        </li>)}
      </ul>
      <h3>Resources</h3>
      <ul>
        {group.resources.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/resource/${edge.node.id}`}>{edge.node.name}</Link>
          {edge.node.users.edges.map(userEdge => <div key={userEdge.node.id}
            style={{
              display: 'inline-block', width: 10, height: 10,
              marginLeft: 10,
              borderRadius: '50%',
              backgroundColor: this.state.colorChart[userEdge.node.id],
            }}
          />)}
        </li>)}
      </ul>
      {memberControls}
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
              users(first: 18) {
                edges {
                  node {
                    id,
                  }
                }
              }
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


