import NewGroupMutation from '../mutations/NewGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import TextInput from '../components/TextInput';

class NewGroupPanel extends React.Component {
  _handleTextInputSave = (text) => {
    Relay.Store.update(
      new NewGroupMutation({groupName: text, master: this.props.master})
    );
  }
  render () {
    return <div>
      <h4>New Group</h4>
      <h5>Name</h5>
      <TextInput
        autoFocus={true}
        onSave={this._handleTextInputSave}
        placeholder='Name'
      />
    </div>;
  }
}

export default Relay.createContainer(NewGroupPanel, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        groups(first: 18) {
          edges {
            node {
              id,
            }
          }
        },
        ${NewGroupMutation.getFragment('master')},
      }
    `,
  },
});

