import React from 'react';
import Relay from 'react-relay';

class ResourceDetail extends React.Component {
  render () {
    var {resource} = this.props;

    return <div>{resource.name}</div>;
  }
}

export default Relay.createContainer(ResourceDetail, {
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        name,
      }
    `,
  },
});

