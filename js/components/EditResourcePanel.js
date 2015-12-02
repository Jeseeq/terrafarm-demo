import RenameResourceMutation from '../mutations/RenameResourceMutation';
import DisconnectUserFromResourceMutation from '../mutations/DisconnectUserFromResourceMutation';
import React from 'react';
import Relay from 'react-relay';
import TextInput from '../elements/TextInput';

class EditResourcePanel extends React.Component {
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
      new RenameResourceMutation({
        resource: this.props.resource,
        name: text,
      })
    );
    this.setState({
      editMode: false,
    });
  }
  _handleDisconnectUserFromResource = () => {
    Relay.Store.update(
      new DisconnectUserFromResourceMutation({
        user: this.props.user,
        resource: this.props.resource,
      })
    );
  }
  render () {
    if (this.state.editMode) {
      return <div>
        <TextInput
          initialValue={this.props.resource.name}
          onSave={this._handleRename}
        />
        <button onClick={this._handleDisconnectUserFromResource}>Disconnect</button>
        <button onClick={this._toggleEditMode}>Cancel</button>
      </div>
    } else {
      return <div>
        <span>{this.props.resource.name}</span>
        <button onClick={this._toggleEditMode}>Edit</button>
      </div>;
    }
  }
}

export default Relay.createContainer(EditResourcePanel, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
        ${DisconnectUserFromResourceMutation.getFragment('user')},
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        ${RenameResourceMutation.getFragment('resource')},
        ${DisconnectUserFromResourceMutation.getFragment('resource')},
      }
    `,
  },
});

