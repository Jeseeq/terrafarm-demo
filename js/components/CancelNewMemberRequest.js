import CancelPendingUserToGroupMutation from '../mutations/CancelPendingUserToGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

class CancelNewMemberRequest extends React.Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({open: true});
  }
  handleClose = () => {
    this.setState({open: false});
  }
  handleConfirm = () => {
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
    const {group} = this.props;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={'Confirm'}
        primary
        onTouchTap={this.handleConfirm}
      />,
    ];

    return <div style={{display: 'inline-block', margin: '10px 0 15px 10px'}}>
      <RaisedButton label={'Cancel Membership Request'} onTouchTap={this.handleOpen} />
      <Dialog
        title={'Cancel Membership Request'}
        actions={actions}
        onRequestClose={null}
        open={this.state.open}
      >
        <p>
          Please confirm that you no longer wish to become
          a member of the <strong>{group.name}</strong> group.
        </p>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(CancelNewMemberRequest, {
  initialVariables: {
    groupId: null,
  },
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        name,
        ${CancelPendingUserToGroupMutation.getFragment('group')},
      },
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
        ${CancelPendingUserToGroupMutation.getFragment('user')},
      }
    `,
  },
});


