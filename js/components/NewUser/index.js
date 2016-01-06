import NewUserMutation from '../../mutations/NewUserMutation';
import React from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextInput from '../../elements/TextInput';

class NewUser extends React.Component {
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
    const {master} = this.props;
    const {name} = this.refs;
    Relay.Store.update(
      new NewUserMutation({
        master,
        name: name.state.text,
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

    return <div style={{display: 'inline-block', margin: '10px 0 15px 10px'}}>
      <RaisedButton label={'New User'} onTouchTap={this.handleOpen} />
      <Dialog
        title={'New User'}
        actions={actions}
        onRequestClose={null}
        open={this.state.open}
      >
        <TextInput
          ref={'name'}
          label={'Name'}
        />
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(NewUser, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        ${NewUserMutation.getFragment('master')},
      }
    `,
  },
});

