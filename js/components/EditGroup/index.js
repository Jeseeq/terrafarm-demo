import UpdateGroup from '../UpdateGroup';
import DisconnectUserFromGroupMutation from '../../mutations/DisconnectUserFromGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextInput from '../../elements/TextInput';

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
    let {name, description, category} = this.refs;
    name = name ? name.state.text : group.name;
    description = description ? description.state.text : group.description;
    category = category ? category.state.text : group.category;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <UpdateGroup
        group={group}
        attributes={{
          name,
          description,
          category,
        }}
      />,
    ];

    return <div style={{display: 'inline-block'}}>
      <FlatButton label={'Edit'} onTouchTap={this.handleOpen} />
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
        ${UpdateGroup.getFragment('group')},
        ${DisconnectUserFromGroupMutation.getFragment('group')},
      }
    `,
  },
});

