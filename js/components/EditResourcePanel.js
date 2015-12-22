import RenameResourceMutation from '../mutations/RenameResourceMutation';
import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import TextInput from '../elements/TextInput';
import FlatButton from 'material-ui/lib/flat-button';

class EditResourcePanel extends React.Component {
  state = {
    editMode: false,
  };
  _toggleEditMode = () => {
    this.setState({
      editMode: !this.state.editMode,
    });
  }
  _handleRename = (text) => {
    Relay.Store.update(
      new RenameResourceMutation({
        resource: this.props.resource,
        name: text,
      })
    );
    this.setState({
      editMode: false,
    });
  }
  render () {
    const {resource} = this.props;
    if (this.state.editMode) {
      return <div>
        <TextInput
          initialValue={resource.name}
          onSave={this._handleRename}
        />
        <FlatButton label={'Cancel'} onClick={this._toggleEditMode} />
      </div>;
    }
    return <div>
      <Link to={`/resource/${resource.id}`}>{resource.name}</Link>
      <FlatButton label={'Edit'} onClick={this._toggleEditMode} />
    </div>;
  }
}

export default Relay.createContainer(EditResourcePanel, {
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        ${RenameResourceMutation.getFragment('resource')},
      }
    `,
  },
});

