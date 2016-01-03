import NewResourceMutation from '../mutations/NewResourceMutation';
import React from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextInput from '../elements/TextInput';

class NewResource extends React.Component {
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
      new NewResourceMutation({
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
        title={'New Resource'}
        actions={actions}
        modal
        open={this.state.open}
      >
        <TextInput
          ref={'name'}
          label={'Name'}
        />
        <TextInput
          ref={'description'}
          label={'Description'}
          placeholder={'One sentence please'}
        />
        <TextInput
          ref={'category'}
          label={'Category'}
          placeholder={'Equipment, labor, materials...'}
        />
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(NewResource, {
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

