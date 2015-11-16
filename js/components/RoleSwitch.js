import RemoveUserRoleMutation from '../mutations/RemoveUserRoleMutation';
import AddUserRoleMutation from '../mutations/AddUserRoleMutation';
import React from 'react';
import Relay from 'react-relay';

class RoleSwitch extends React.Component {
  _handleClick = () => {
    this.props.connected ? this._removeRole() : this._addRole();
  }
  _removeRole () {
    Relay.Store.update(
      new RemoveUserRoleMutation({
        user: this.props.user,
        role: this.props.role,
      })
    );
  }
  _addRole () {
    Relay.Store.update(
      new AddUserRoleMutation({
        user: this.props.user,
        role: this.props.role,
      })
    );
  }
  render () {
    var {role, connected} = this.props;
    return <div onClick={this._handleClick}>
      {role.name} {connected && '*'}
    </div>;
  }
}

export default Relay.createContainer(RoleSwitch, {
  fragments: {
    role: () => Relay.QL`
      fragment on Role {
        id,
        name,
        ${RemoveUserRoleMutation.getFragment('role')},
        ${AddUserRoleMutation.getFragment('role')},
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
        ${RemoveUserRoleMutation.getFragment('user')},
        ${AddUserRoleMutation.getFragment('user')},
      }
    `,
  },
});

