import NewResourceMutation from '../mutations/NewResourceMutation';
import React from 'react';
import Relay from 'react-relay';
import TextInput from '../components/TextInput';

class NewResourcePanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showFields: false,
    };
  }
  _handleToggle = () => {
    this.setState({
      showFields: !this.state.showFields,
    });
  }
  _handleTextInputSave = (text) => {
    Relay.Store.update(
      new NewResourceMutation({resourceName: text, master: this.props.master})
    );
  }
  render () {
    return <div>
      <button onClick={this._handleToggle}>
        {this.state.showFields ? 'Cancel' : 'New Resource'}
      </button>
      <div style={{
        display: this.state.showFields ? 'block' : 'none'
      }}>
        <h5>Name</h5>
        <TextInput
          autoFocus={true}
          onSave={this._handleTextInputSave}
          placeholder='Name'
        />
      </div>
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

