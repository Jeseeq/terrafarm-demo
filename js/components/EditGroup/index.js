import UpdateGroup from '../../actions/UpdateGroup';
import RemoveUserFromGroup from '../../actions/RemoveUserFromGroup';
import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextInput from '../../elements/TextInput';

class EditGroup extends React.Component {
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
    const {group, user} = this.props;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <RemoveUserFromGroup
        group={group}
        user={user}
      />,
      <UpdateGroup
        group={group}
        primary
        attributes={this.state.attributes}
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
        <Formsy.Form
          ref={'form'}
          onValid={this.handleValid}
          onInvalid={this.handleInvalid}
        >
          <TextInput
            name={'name'}
            label={'Name'}
            initialValue={group.name}
          />
          <TextInput
            name={'description'}
            label={'Description'}
            initialValue={group.description}
          />
          <TextInput
            name={'category'}
            label={'Category'}
            initialValue={group.category}
          />
        </Formsy.Form>
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
        ${RemoveUserFromGroup.getFragment('user')},
      }
    `,
    group: () => Relay.QL`
      fragment on Group {
        id,
        name,
        description,
        category,
        ${UpdateGroup.getFragment('group')},
        ${RemoveUserFromGroup.getFragment('group')},
      }
    `,
  },
});

