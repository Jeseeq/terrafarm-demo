import NewUserMutation from '../mutations/NewUserMutation';
import React from 'react';
import Relay from 'react-relay';
import TextInput from './TextInput';

class NewUser extends React.Component {
  _handleTextInputSave = (text) => {
    Relay.Store.update(
      new NewUserMutation({userName: text, viewer: this.props.viewer})
    );
  }
  render () {
    return <div>
      Enter a new user name and press enter:
      <TextInput
        autoFocus={true}
        onSave={this._handleTextInputSave}
        placeholder='Name'
      />
    </div>;
  }
}

export default Relay.createContainer(NewUser, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        users(first: 18) {
          edges {
            node {
              id,
            },
          }
        },
        ${NewUserMutation.getFragment('viewer')},
      }
    `,
  },
});


