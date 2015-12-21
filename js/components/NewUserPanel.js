import NewUserMutation from '../mutations/NewUserMutation';
import React from 'react';
import Relay from 'react-relay';
import TextInput from '../elements/TextInput';
import FlatButton from 'material-ui/lib/flat-button';

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
          commitOnBlur={false}
          label={'User Name'}
          placeholder={'Your Handle'}
          onSave={this._handleTextInputSave}
        />
        <FlatButton label={'Cancel'} onClick={this._toggleEditMode} />
      </div>;
    }
    return <FlatButton label={'New User'} onClick={this._toggleEditMode} />;
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

