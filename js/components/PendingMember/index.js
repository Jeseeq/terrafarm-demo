import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RemovePendingUserToGroup from '../../actions/RemovePendingUserToGroup';
import AddUserToGroup from '../../actions/AddUserToGroup';

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
  render () {
    const {group, user} = this.props;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <RemovePendingUserToGroup
        user={user}
        group={group}
        label={'Decline'}
        secondary
      />,
      <AddUserToGroup user={user} group={group} primary />,
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
        ${RemovePendingUserToGroup.getFragment('group')},
        ${AddUserToGroup.getFragment('group')},
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
        ${RemovePendingUserToGroup.getFragment('user')},
        ${AddUserToGroup.getFragment('user')},
      }
    `,
  },
});


