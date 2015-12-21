import NewGroupMutation from '../mutations/NewGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import TextInput from '../elements/TextInput';
import FlatButton from 'material-ui/lib/flat-button';

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
        master: this.props.master,
      })
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
          commitOnBlur={false}
          label={'Group Name'}
          placeholder={'Cool People'}
          onSave={this._handleTextInputSave}
        />
        <FlatButton label={'Cancel'} onClick={this._toggleEditMode} />
      </div>;
    }
    return <FlatButton label={'New Group'} onClick={this._toggleEditMode} />;
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

