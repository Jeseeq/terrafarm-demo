import RemoveUserRoleMutation from '../mutations/RemoveUserRoleMutation';
import React from 'react';
import Relay from 'react-relay';

class RoleSwitch extends React.Component {
  _handleDestroyClick = () => {
    this._removeRole();
  }
  _removeRole () {
    Relay.Store.update(
      new RemoveUserRoleMutation({
        user: this.props.user,
        role: this.props.role,
      })
    );
  }
  render () {
    var {role} = this.props;
    return <div onClick={this._handleDestroyClick}>{role.name}</div>;
  }
}

export default Relay.createContainer(RoleSwitch, {
  fragments: {
    role: () => Relay.QL`
      fragment on Role {
        id,
        name,
        ${RemoveUserRoleMutation.getFragment('role')},
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
        ${RemoveUserRoleMutation.getFragment('user')},
      }
    `,
  },
});

