import NewUserMutation from '../mutations/NewUserMutation';
import React from 'react';
import Relay from 'react-relay';
import TextInput from './TextInput';

class UserNew extends React.Component {
  _handleTextInputSave = (text) => {
    Relay.Store.update(
      new NewUserMutation({userName: text, master: this.props.master})
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
    master: () => Relay.QL`
      fragment on Master {
        users(first: 10) {
          edges {
            node {
              id,
            }
          }
        },
        ${NewUserMutation.getFragment('master')},
      }
    `,
  },
});

