import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';
import RemoveUserFromGroupMutation from './mutation';

class RemoveUserFromGroup extends React.Component {
  static defaultProps = {
    label: 'Remove',
    primary: false,
    secondary: false,
  };
  handleRemove = () => {
    const {user, group} = this.props;
    Relay.Store.update(
      new RemoveUserFromGroupMutation({
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
        onTouchTap={this.handleRemove}
      />
    );
  }
}

export default Relay.createContainer(RemoveUserFromGroup, {
  initialVariables: {
    groupId: null,
  },
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        name,
        ${RemoveUserFromGroupMutation.getFragment('group')},
      },
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
        ${RemoveUserFromGroupMutation.getFragment('user')},
      }
    `,
  },
});

