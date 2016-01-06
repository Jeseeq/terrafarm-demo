import UpdateResource from '../../actions/UpdateResource';
import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextInput from '../../elements/TextInput';

class EditResource extends React.Component {
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
    const {resource} = this.props;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <UpdateResource
        resource={resource}
        primary
        attributes={this.state.attributes}
        onComplete={this.handleClose}
      />,
    ];

    return <div style={{display: 'inline-block'}}>
      <FlatButton label={'Edit'} onTouchTap={this.handleOpen} />
      <Dialog
        title={'Edit Resource'}
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
            initialValue={resource.name}
          />
          <TextInput
            name={'description'}
            label={'Description'}
            initialValue={resource.description}
          />
          <TextInput
            name={'category'}
            label={'Category'}
            initialValue={resource.category}
          />
        </Formsy.Form>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(EditResource, {
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        description,
        category,
        ${UpdateResource.getFragment('resource')},
      }
    `,
  },
});

