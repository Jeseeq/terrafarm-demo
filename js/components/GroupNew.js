import NewGroupMutation from '../mutations/NewGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import TextInput from './TextInput';

class GroupNew extends React.Component {
  _handleTextInputSave = (text) => {
    Relay.Store.update(
      new NewGroupMutation({groupName: text, master: this.props.master})
    );
  }
  render () {
    return (
      <TextInput
        autoFocus={true}
        onSave={this._handleTextInputSave}
        placeholder='Name'
      />
    );
  }
}

export default Relay.createContainer(GroupNew, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        groups(first: 10) {
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

