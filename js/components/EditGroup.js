import UpdateGroupMutation from '../mutations/UpdateGroupMutation';
import DisconnectUserFromGroupMutation from '../mutations/DisconnectUserFromGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextInput from '../elements/TextInput';

class EditGroup extends React.Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({open: true});
  }
  handleClose = () => {
    this.setState({open: false});
  }
  handleSave = () => {
    const {name, description, category} = this.refs;
    Relay.Store.update(
      new UpdateGroupMutation({
        group: this.props.group,
        attributes: {
          name: name.state.text,
          description: description.state.text,
          category: category.state.text,
        },
      })
    );
    this.handleClose();
  }
  handleDisconnectUserFromGroup = () => {
    Relay.Store.update(
      new DisconnectUserFromGroupMutation({
        user: this.props.user,
        group: this.props.group,
      })
    );
  }
  render () {
    const {group} = this.props;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={'Save'}
        primary
        onTouchTap={this.handleSave}
      />,
    ];

    return <div>
      <RaisedButton label={'Edit'} onTouchTap={this.handleOpen} />
      <Dialog
        title={'Edit Group'}
        actions={actions}
        onRequestClose={null}
        open={this.state.open}
      >
        <TextInput
          ref={'name'}
          label={'Name'}
          initialValue={group.name}
        />
        <TextInput
          ref={'description'}
          label={'Description'}
          initialValue={group.description}
        />
        <TextInput
          ref={'category'}
          label={'Category'}
          initialValue={group.category}
        />
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(EditGroup, {
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
        description,
        category,
        ${UpdateGroupMutation.getFragment('group')},
        ${DisconnectUserFromGroupMutation.getFragment('group')},
      }
    `,
  },
});

