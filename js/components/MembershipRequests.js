import CancelPendingUserToGroupMutation from '../mutations/CancelPendingUserToGroupMutation';
import ConnectUserToGroupMutation from '../mutations/ConnectUserToGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

class MembershipRequests extends React.Component {
  _handleApproveMembershipRequest = (user) => {
    Relay.Store.update(
      new ConnectUserToGroupMutation({
        user: user,
        group: this.props.group,
      })
    );
    Relay.Store.update(
      new CancelPendingUserToGroupMutation({
        user: user,
        group: this.props.group,
      })
    );
  }
  _handleDeclineMembershipRequest = (user) => {
    Relay.Store.update(
      new CancelPendingUserToGroupMutation({
        user: user,
        group: this.props.group,
      })
    );
  }
  render () {
    const {group} = this.props;
    return <div>
      <h3>Pending Users</h3>
      <ul>
        {group.usersPending.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/user/${edge.node.id}`}>{edge.node.name}</Link>
          <button onClick={this._handleApproveMembershipRequest.bind(this, edge.node)}>Approve</button>
          <button onClick={this._handleDeclineMembershipRequest.bind(this, edge.node)}>Decline</button>
        </li>)}
      </ul>
    </div>;
  }
}

export default Relay.createContainer(MembershipRequests, {
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        usersPending(first: 18) {
          edges {
            node {
              id,
              name,
              ${CancelPendingUserToGroupMutation.getFragment('user')},
              ${ConnectUserToGroupMutation.getFragment('user')},
            }
          }
        },
        ${CancelPendingUserToGroupMutation.getFragment('group')},
        ${ConnectUserToGroupMutation.getFragment('group')},
      }
    `,
  },
});


