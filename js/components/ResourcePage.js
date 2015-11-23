import React from 'react';
import Relay from 'react-relay';

class ResourcePage extends React.Component {
  render () {
    var {resource} = this.props;
    return <div>
      <h2>Hello {resource.name}</h2>
    </div>;
  }
}

export default Relay.createContainer(ResourcePage, {
  initialVariables: {
    resourceId: null,
  },
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        name,
      }
    `
  }
});


