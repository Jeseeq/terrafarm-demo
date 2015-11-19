import React from 'react';
import Relay from 'react-relay';

class UserDetail extends React.Component {
  render () {
    var {user} = this.props;

    return <div>
      <div>user: {user.name}</div>
    </div>;
  }
}

export default Relay.createContainer(UserDetail, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
      }
    `,
  },
});

