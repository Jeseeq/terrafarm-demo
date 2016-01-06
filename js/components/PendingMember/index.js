import CancelPendingUserToGroupMutation from '../../mutations/CancelPendingUserToGroupMutation';
import ConnectUserToGroupMutation from '../../mutations/ConnectUserToGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

class PendingMember extends React.Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({open: true});
  }
  handleClose = () => {
    this.setState({open: false});
  }
  handleApprove = () => {
    const {user, group} = this.props;
    Relay.Store.update(
      new ConnectUserToGroupMutation({
        user,
        group,
      })
    );
    Relay.Store.update(
      new CancelPendingUserToGroupMutation({
        user,
        group,
      })
    );
    this.handleClose();
  }
  handleDecline = () => {
    const {user, group} = this.props;
    Relay.Store.update(
      new CancelPendingUserToGroupMutation({
        user,
        group,
      })
    );
    this.handleClose();
  }
  render () {
    const {group, user} = this.props;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={'Decline'}
        secondary
        onTouchTap={this.handleDecline}
      />,
      <FlatButton
        label={'Approve'}
        primary
        onTouchTap={this.handleApprove}
      />,
    ];

    return <div style={{display: 'inline-block'}}>
      <FlatButton label={'Pending'} onTouchTap={this.handleOpen} />
      <Dialog
        title={'Membership Request'}
        actions={actions}
        onRequestClose={null}
        open={this.state.open}
      >
        <p>
          <Link to={`/user/${user.id}`} style={{textDecoration: 'underline'}}>
            {user.name}
          </Link> has requested to join the <strong>{group.name}</strong> group.
        </p>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(PendingMember, {
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        name,
        ${CancelPendingUserToGroupMutation.getFragment('group')},
        ${ConnectUserToGroupMutation.getFragment('group')},
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
        ${CancelPendingUserToGroupMutation.getFragment('user')},
        ${ConnectUserToGroupMutation.getFragment('user')},
      }
    `,
  },
});


