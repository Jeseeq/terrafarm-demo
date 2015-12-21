import NewUserMutation from '../mutations/NewUserMutation';
import React from 'react';
import Relay from 'react-relay';
import TextInput from '../elements/TextInput';

class NewUserPanel extends React.Component {
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
  _handleTextInputSave = (text) => {
    Relay.Store.update(
      new NewUserMutation({userName: text, master: this.props.master})
    );
    this.setState({
      editMode: false,
    });
  }
  render () {
    if (this.state.editMode) {
      return <div>
        <TextInput
          autoFocus
          label={'User Name'}
          placeholder={'Your Handle'}
          onSave={this._handleTextInputSave}
        />
        <button onClick={this._toggleEditMode}>Cancel</button>
      </div>;
    }
    return <button onClick={this._toggleEditMode}>New User</button>;
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

