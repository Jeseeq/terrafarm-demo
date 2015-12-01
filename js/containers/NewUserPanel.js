import NewUserMutation from '../mutations/NewUserMutation';
import React from 'react';
import Relay from 'react-relay';
import TextInput from '../components/TextInput';

class NewUserPanel extends React.Component {
  _handleTextInputSave = (text) => {
    Relay.Store.update(
      new NewUserMutation({userName: text, master: this.props.master})
    );
  }
  render () {
    return <div>
      <h2>New User</h2>
      <h4>Name</h4>
      <TextInput
        autoFocus={true}
        onSave={this._handleTextInputSave}
        placeholder='Smith'
      />
    </div>;
  }
}

export default Relay.createContainer(NewUserPanel, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        ${NewUserMutation.getFragment('master')},
      }
    `,
  },
});

