import {Link} from 'react-router';
import React from 'react';
import Relay from 'react-relay';

class ResourceDetail extends React.Component {
  render () {
    var {resource} = this.props;

    return <div><Link to={`/resource/${resource.id}`}>{resource.name}</Link></div>;
  }
}

export default Relay.createContainer(ResourceDetail, {
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
      }
    `,
  },
});

