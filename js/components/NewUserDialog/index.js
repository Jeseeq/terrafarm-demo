import NewUser from '../../actions/NewUser';
import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextInput from '../../elements/TextInput';

class NewUserDialog extends React.Component {
  state = {
    open: false,
    canSubmit: false,
    attributes: {
      name: '',
    },
  };
  handleOpen = () => {
    this.setState({open: true});
  }
  handleClose = () => {
    this.setState({open: false});
  }
  handleValid = () => {
    this.setState({
      attributes: this.refs.form.getCurrentValues(),
      canSubmit: true,
    });
  }
  handleInvalid = () => {
    this.setState({canSubmit: false});
  }
  render () {
    const {master} = this.props;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <NewUser
        master={master}
        primary
        onComplete={this.handleClose}
        attributes={this.state.attributes}
        disabled={!this.state.canSubmit}
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
        <Formsy.Form
          ref={'form'}
          onValid={this.handleValid}
          onInvalid={this.handleInvalid}
        >
          <TextInput
            name={'name'}
            label={'Name'}
            required
          />
        </Formsy.Form>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(NewUserDialog, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        ${NewUser.getFragment('master')},
      }
    `,
  },
});
