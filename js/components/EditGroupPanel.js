import RenameGroupMutation from '../mutations/RenameGroupMutation';
import DisconnectUserFromGroupMutation from '../mutations/DisconnectUserFromGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import TextInput from '../elements/TextInput';

class EditGroupPanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      editMode: false,
    };
  }
  _toggleEditMode = () => {
    this.setState({
      editMode: !this.state.editMode,
    });
  }
  _handleRename = (text) => {
    Relay.Store.update(
      new RenameGroupMutation({
        group: this.props.group,
        name: text,
      })
    );
    this.setState({
      editMode: false,
    });
  }
  _handleDisconnectUserFromGroup = () => {
    Relay.Store.update(
      new DisconnectUserFromGroupMutation({
        user: this.props.user,
        group: this.props.group,
      })
    );
  }
  render () {
    if (this.state.editMode) {
      return <div>
        <TextInput
          initialValue={this.props.group.name}
          onSave={this._handleRename}
        />
        <button onClick={this._handleDisconnectUserFromGroup}>Disconnect</button>
        <button onClick={this._toggleEditMode}>Cancel</button>
      </div>;
    } else {
      return <div>
        <span>{this.props.group.name}</span>
        <button onClick={this._toggleEditMode}>Edit</button>
      </div>;
    }
  }
}

export default Relay.createContainer(EditGroupPanel, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
        ${DisconnectUserFromGroupMutation.getFragment('user')},
      }
    `,
    group: () => Relay.QL`
      fragment on Group {
        id,
        name,
        ${RenameGroupMutation.getFragment('group')},
        ${DisconnectUserFromGroupMutation.getFragment('group')},
      }
    `,
  },
});

