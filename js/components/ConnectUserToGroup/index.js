import ConnectUserToGroupMutation from './mutation';
import RemovePendingUserToGroupMutation from '../RemovePendingUserToGroup/mutation';
import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';

class RemovePendingUserToGroup extends React.Component {
  static defaultProps = {
    label: 'Approve',
    primary: false,
    secondary: false,
  };
  handleConfirm = () => {
    const {user, group} = this.props;
    Relay.Store.update(
      new ConnectUserToGroupMutation({
        user,
        group,
      })
    );
    Relay.Store.update(
      new RemovePendingUserToGroupMutation({
        user,
        group,
      })
    );
  }
  render () {
    return (
      <FlatButton
        user={this.props.user}
        group={this.props.group}
        label={this.props.label}
        primary={this.props.primary}
        secondary={this.props.secondary}
        onTouchTap={this.handleConfirm}
      />
    );
  }
}

export default Relay.createContainer(RemovePendingUserToGroup, {
  initialVariables: {
    groupId: null,
  },
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        name,
        ${ConnectUserToGroupMutation.getFragment('group')},
        ${RemovePendingUserToGroupMutation.getFragment('group')},
      },
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
        ${ConnectUserToGroupMutation.getFragment('user')},
        ${RemovePendingUserToGroupMutation.getFragment('user')},
      }
    `,
  },
});

