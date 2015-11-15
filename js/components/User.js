import React from 'react';
import Relay from 'react-relay';

class User extends React.Component {
  render () {
    var {user} = this.props;
    return <div>{user.name}</div>;
  }
}

export default Relay.createContainer(User, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name
      }
    `,
  },
});

