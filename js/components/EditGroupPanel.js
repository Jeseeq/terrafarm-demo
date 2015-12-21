import RenameGroupMutation from '../mutations/RenameGroupMutation';
import DisconnectUserFromGroupMutation from '../mutations/DisconnectUserFromGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import TextInput from '../elements/TextInput';
import FlatButton from 'material-ui/lib/flat-button';

class EditGroupPanel extends React.Component {
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
  _handleRename = (text) => {
    Relay.Store.update(
      new RenameGroupMutation({
        group: this.props.group,
        name: text,
      })
    );
    this.setState({
      editMode: false,
    });
  }
  _handleDisconnectUserFromGroup = () => {
    Relay.Store.update(
      new DisconnectUserFromGroupMutation({
        user: this.props.user,
        group: this.props.group,
      })
    );
  }
  render () {
    const {group} = this.props;
    if (this.state.editMode) {
      return <div>
        <TextInput
          initialValue={group.name}
          onSave={this._handleRename}
        />
        <FlatButton
          label={'Disconnect'}
          onClick={this._handleDisconnectUserFromGroup}
        />
        <FlatButton
          label={'Cancel'}
          onClick={this._toggleEditMode} />
      </div>;
    }
    return <div>
      <Link to={`/group/${group.id}`}>{group.name}</Link>
      <button style={{marginLeft: 10}} onClick={this._toggleEditMode}>Edit</button>
    </div>;
  }
}

export default Relay.createContainer(EditGroupPanel, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
        ${DisconnectUserFromGroupMutation.getFragment('user')},
      }
    `,
    group: () => Relay.QL`
      fragment on Group {
        id,
        name,
        ${RenameGroupMutation.getFragment('group')},
        ${DisconnectUserFromGroupMutation.getFragment('group')},
      }
    `,
  },
});

