import NewGroupMutation from '../mutations/NewGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextInput from '../elements/TextInput';

class NewGroup extends React.Component {
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
    const {user, master} = this.props;
    const {name, description, category} = this.refs;
    Relay.Store.update(
      new NewGroupMutation({
        user,
        master,
        name: name.state.text,
        description: description.state.text,
        category: category.state.text,
      })
    );
    this.handleClose();
  }
  render () {
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
      <RaisedButton label={'New'} onTouchTap={this.handleOpen} />
      <Dialog
        title={'New Group'}
        actions={actions}
        onRequestClost={null}
        open={this.state.open}
      >
        <TextInput
          ref={'name'}
          label={'Name'}
        />
        <TextInput
          ref={'description'}
          label={'Description'}
          placeholder={'Describe the space and project requirements.'}
        />
        <TextInput
          ref={'category'}
          label={'Category'}
          placeholder={'Yard, indoor, rooftop...'}
        />
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(NewGroup, {
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

