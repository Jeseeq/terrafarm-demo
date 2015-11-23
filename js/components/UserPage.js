import React from 'react';
import Relay from 'react-relay';

class UserPage extends React.Component {
  render () {
    var {user} = this.props;
    return <div>
      <h2>Hello {user.name}</h2>
    </div>;
  }
}

export default Relay.createContainer(UserPage, {
  initialVariables: {
    userId: null,
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name,
      }
    `
  }
});


