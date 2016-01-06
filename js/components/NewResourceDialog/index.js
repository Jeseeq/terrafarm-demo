import NewResource from '../../actions/NewResource';
import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextInput from '../../elements/TextInput';

class NewResourceDialog extends React.Component {
  state = {
    open: false,
    canSubmit: false,
    attributes: {
      name: '',
      description: '',
      category: '',
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
    const {master, user} = this.props;

    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <NewResource
        master={master}
        user={user}
        primary
        onComplete={this.handleClose}
        attributes={this.state.attributes}
        disabled={!this.state.canSubmit}
      />,
    ];

    return <div style={{display: 'inline-block', margin: '10px 0 15px 10px'}}>
      <RaisedButton label={'New Resource'} onTouchTap={this.handleOpen} />
      <Dialog
        title={'New Resource'}
        actions={actions}
        onRequestClost={null}
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
          <TextInput
            name={'description'}
            label={'Description'}
            placeholder={'Describe the space and project requirements.'}
            required
          />
          <TextInput
            name={'category'}
            label={'Category'}
            placeholder={'Yard, indoor, rooftop...'}
            required
          />
        </Formsy.Form>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(NewResourceDialog, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        ${NewResource.getFragment('user')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        ${NewResource.getFragment('master')},
      }
    `,
  },
});
