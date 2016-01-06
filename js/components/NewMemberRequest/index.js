import PendingUserToGroup from '../../actions/PendingUserToGroup';
import React from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

class NewMemberRequest extends React.Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({open: true});
  }
  handleClose = () => {
    this.setState({open: false});
  }
  render () {
    const {user, group} = this.props;
    console.log(user);
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <PendingUserToGroup
        user={user}
        group={group}
        primary
        onComplete={this.handleClose}
      />,
    ];

    return <div style={{display: 'inline-block', margin: '10px 0 15px 10px'}}>
      <RaisedButton label={'Request Membership'} onTouchTap={this.handleOpen} />
      <Dialog
        title={'New Membership Request'}
        actions={actions}
        onRequestClose={null}
        open={this.state.open}
      >
        <p>Please confirm your request to become a member of the <strong>{group.name}</strong> group.</p>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(NewMemberRequest, {
  initialVariables: {
    groupId: null,
  },
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        name,
        ${PendingUserToGroup.getFragment('group')},
      },
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
        ${PendingUserToGroup.getFragment('user')},
      }
    `,
  },
});

