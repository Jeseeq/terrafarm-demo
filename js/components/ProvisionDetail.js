import React from 'react';
import Relay from 'react-relay';

class ProvisionDetail extends React.Component {
  render () {
    var {provision} = this.props;

    return <div>{provision.name}</div>;
  }
}

export default Relay.createContainer(ProvisionDetail, {
  fragments: {
    provision: () => Relay.QL`
      fragment on Provision {
        id,
        name,
      }
    `,
  },
});

