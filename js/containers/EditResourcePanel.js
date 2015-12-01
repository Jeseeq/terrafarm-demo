import DisconnectUserFromResourceMutation from '../mutations/DisconnectUserFromResourceMutation';
import React from 'react';
import Relay from 'react-relay';
import TextInput from '../components/TextInput';

class EditResourcePanel extends React.Component {
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
  _handleDisconnectUserFromResource = () => {
    Relay.Store.update(
      new DisconnectUserFromResourceMutation({
        user: this.props.user,
        resource: this.props.resource,
      })
    );
  }
  render () {
    return <div>
      <span>{this.props.resource.name}</span>
      <button onClick={this._handleToggle}>
        {this.state.showFields ? 'Cancel' : 'Edit'}
      </button>
      <div style={{
        display: this.state.showFields ? 'block' : 'none'
      }}>
        <h5 onClick={this._handleDisconnectUserFromResource}>Disconnect</h5>
      </div>
    </div>;
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
        ${DisconnectUserFromResourceMutation.getFragment('resource')},
      }
    `,
  },
});

