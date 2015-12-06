import NewGroupMutation from '../mutations/NewGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import TextInput from '../elements/TextInput';

class NewGroupPanel extends React.Component {
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
      new NewGroupMutation({
        groupName: text,
        user: this.props.user,
        master: this.props.master
      })
    );
    this.setState({
      editMode: false,
    });
  }
  render () {
    if (this.state.editMode) {
      return <div>
        <h5>Name</h5>
        <TextInput
          autoFocus={true}
          onSave={this._handleTextInputSave}
          placeholder='Name'
        />
        <button onClick={this._toggleEditMode}>Cancel</button>
      </div>;
    } else {
      return <button onClick={this._toggleEditMode}>New Group</button>;
    }
  }
}

export default Relay.createContainer(NewGroupPanel, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        ${NewGroupMutation.getFragment('user')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        ${NewGroupMutation.getFragment('master')},
      }
    `,
  },
});

