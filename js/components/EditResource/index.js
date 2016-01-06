import UpdateResource from '../../actions/UpdateResource';
import React from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextInput from '../../elements/TextInput';

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
  render () {
    const {resource} = this.props;

    let {name, description, category} = this.refs;
    name = name ? name.state.text : resource.name;
    description = description ? description.state.text : resource.description;
    category = category ? category.state.text : resource.category;

    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <UpdateResource
        resource={resource}
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
        ${UpdateResource.getFragment('resource')},
      }
    `,
  },
});

