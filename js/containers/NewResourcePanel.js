import NewResourceMutation from '../mutations/NewResourceMutation';
import React from 'react';
import Relay from 'react-relay';
import TextInput from '../components/TextInput';

class NewResourcePanel extends React.Component {
  _handleTextInputSave = (text) => {
    Relay.Store.update(
      new NewResourceMutation({resourceName: text, master: this.props.master})
    );
  }
  render () {
    return <div>
      <h4>New Resource</h4>
      <h5>Name</h5>
      <TextInput
        autoFocus={true}
        onSave={this._handleTextInputSave}
        placeholder='Name'
      />
    </div>;
  }
}

export default Relay.createContainer(NewResourcePanel, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        resources(first: 18) {
          edges {
            node {
              id,
            }
          }
        },
        ${NewResourceMutation.getFragment('master')},
      }
    `,
  },
});

