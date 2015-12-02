import RenameGroupMutation from '../mutations/RenameGroupMutation';
import DisconnectUserFromGroupMutation from '../mutations/DisconnectUserFromGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import TextInput from '../components/TextInput';

class EditGroupPanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showFields: false,
    };
  }
  _handleToggle = () => {
    this.setState({
      showFields: !this.state.showFields,
    });
  }
  _handleRename = (text) => {
    Relay.Store.update(
      new RenameGroupMutation({
        group: this.props.group,
        name: text,
      })
    );
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
    return <div>
      <span>{this.props.group.name}</span>
      <button onClick={this._handleToggle}>
        {this.state.showFields ? 'Cancel' : 'Edit'}
      </button>
      <div style={{
        display: this.state.showFields ? 'block' : 'none'
      }}>
        <TextInput
          initialValue={this.props.group.name}
          onSave={this._handleRename}
        />
        <h5 onClick={this._handleDisconnectUserFromGroup}>Disconnect</h5>
      </div>
    </div>;
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

