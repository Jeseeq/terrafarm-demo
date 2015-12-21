import NewResourceMutation from '../mutations/NewResourceMutation';
import React from 'react';
import Relay from 'react-relay';
import TextInput from '../elements/TextInput';
import FlatButton from 'material-ui/lib/flat-button';

class NewResourcePanel extends React.Component {
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
      new NewResourceMutation({
        resourceName: text,
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
          label={'Resource Name'}
          placeholder={'Something'}
          onSave={this._handleTextInputSave}
        />
        <FlatButton label={'Cancel'} onClick={this._toggleEditMode} />
      </div>;
    }
    return <FlatButton label={'New Resource'} onClick={this._toggleEditMode} />;
  }
}

export default Relay.createContainer(NewResourcePanel, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        ${NewResourceMutation.getFragment('user')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        ${NewResourceMutation.getFragment('master')},
      }
    `,
  },
});

