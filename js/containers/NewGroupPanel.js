import NewGroupMutation from '../mutations/NewGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import TextInput from '../components/TextInput';

class NewGroupPanel extends React.Component {
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
      new NewGroupMutation({
        groupName: text,
        user: this.props.user,
        master: this.props.master
      })
    );
  }
  render () {
    return <div>
      <button onClick={this._handleToggle}>
        {this.state.showFields ? 'Cancel' : 'New Group'}
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

export default Relay.createContainer(NewGroupPanel, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        groups(first: 18) {
          edges {
            node {
              id,
            }
          }
        }
        ${NewGroupMutation.getFragment('user')},
      }
    `,
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

