import React from 'react';
import Relay from 'react-relay';

class Role extends React.Component {
  render () {
    var {role} = this.props;
    return <div>{role.name}</div>;
  }
}

export default Relay.createContainer(Role, {
  fragments: {
    role: () => Relay.QL`
      fragment on Role {
        name
      }
    `,
  },
});

