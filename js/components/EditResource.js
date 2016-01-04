import UpdateResourceMutation from '../mutations/UpdateResourceMutation';
import React from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextInput from '../elements/TextInput';

class EditResource extends React.Component {
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
      new UpdateResourceMutation({
        resource: this.props.resource,
        attributes: {
          name: name.state.text,
          description: description.state.text,
          category: category.state.text,
        },
      })
    );
    this.handleClose();
  }
  render () {
    const {resource} = this.props;
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

    return <div style={{display: 'inline-block'}}>
      <FlatButton label={'Edit'} onTouchTap={this.handleOpen} />
      <Dialog
        title={'Edit Resource'}
        actions={actions}
        onRequestClose={null}
        open={this.state.open}
      >
        <TextInput
          ref={'name'}
          label={'Name'}
          initialValue={resource.name}
        />
        <TextInput
          ref={'description'}
          label={'Description'}
          initialValue={resource.description}
        />
        <TextInput
          ref={'category'}
          label={'Category'}
          initialValue={resource.category}
        />
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
        ${UpdateResourceMutation.getFragment('resource')},
      }
    `,
  },
});

