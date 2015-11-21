import NewProvisionMutation from '../mutations/NewProvisionMutation';
import React from 'react';
import Relay from 'react-relay';
import TextInput from './TextInput';

class NewProvision extends React.Component {
  _handleTextInputSave = (text) => {
    Relay.Store.update(
      new NewProvisionMutation({
        provisionName: text,
        user: this.props.user,
        resource: this.props.resource,
        group: this.props.group,
        viewer: this.props.viewer
      })
    );
  }
  render () {
    return (
      <TextInput
        autoFocus={true}
        onSave={this._handleTextInputSave}
        placeholder='Name'
      />
    );
  }
}

export default Relay.createContainer(NewProvision, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
        ${NewProvisionMutation.getFragment('user')},
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        ${NewProvisionMutation.getFragment('resource')},
      }
    `,
    group: () => Relay.QL`
      fragment on Group {
        id,
        ${NewProvisionMutation.getFragment('group')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on Viewer {
        provisions(first: 10) {
          edges {
            node {
              id,
            }
          }
        },
        ${NewProvisionMutation.getFragment('viewer')},
      }
    `,
  },
});

