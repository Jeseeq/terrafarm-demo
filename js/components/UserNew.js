import NewUserMutation from '../mutations/NewUserMutation';
import React from 'react';
import Relay from 'react-relay';
import TextInput from './TextInput';

class UserNew extends React.Component {
  _handleTextInputSave = (text) => {
    Relay.Store.update(
      new NewUserMutation({userName: text, viewer: this.props.viewer})
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

export default Relay.createContainer(UserNew, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        users(first: 10) {
          edges {
            node {
              id,
            }
          }
        },
        ${NewUserMutation.getFragment('viewer')},
      }
    `,
  },
});

