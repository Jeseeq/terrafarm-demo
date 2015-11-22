import NewResourceMutation from '../mutations/NewResourceMutation';
import React from 'react';
import Relay from 'react-relay';
import TextInput from './TextInput';

class ResourceNew extends React.Component {
  _handleTextInputSave = (text) => {
    Relay.Store.update(
      new NewResourceMutation({resourceName: text, viewer: this.props.viewer})
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

export default Relay.createContainer(ResourceNew, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        resources(first: 10) {
          edges {
            node {
              id,
            }
          }
        },
        ${NewResourceMutation.getFragment('viewer')},
      }
    `,
  },
});

