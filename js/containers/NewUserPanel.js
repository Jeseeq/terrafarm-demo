import NewUserMutation from '../mutations/NewUserMutation';
import React from 'react';
import Relay from 'react-relay';
import TextInput from '../components/TextInput';

class NewUserPanel extends React.Component {
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
      new NewUserMutation({userName: text, master: this.props.master})
    );
  }
  render () {
    return <div>
      <button onClick={this._handleToggle}>
        {this.state.showFields ? 'Cancel' : 'New User'}
      </button>
      <div style={{
        display: this.state.showFields ? 'block' : 'none'
      }}>
        <h5>Name</h5>
        <TextInput
          autoFocus={true}
          onSave={this._handleTextInputSave}
          placeholder='Smith'
        />
      </div>
    </div>;
  }
}

export default Relay.createContainer(NewUserPanel, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        ${NewUserMutation.getFragment('master')},
      }
    `,
  },
});

