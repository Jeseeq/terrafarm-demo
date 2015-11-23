import React from 'react';
import Relay from 'react-relay';
import ResourceDetail from './ResourceDetail';
import ResourceNew from './ResourceNew';

class ResourceList extends React.Component {
  render () {
    var {master} = this.props;
    var {resources} = master;

    return <div>
      <h2>Resources</h2>
      <ul>
        {resources.edges.map(edge => <li key={edge.node.id}>
          <ResourceDetail resource={edge.node} />
        </li>)}
        <li><ResourceNew master={master}/></li>
      </ul>
    </div>;
  }
}

export default Relay.createContainer(ResourceList, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        resources(first: 10) {
          edges {
            node {
              id,
              ${ResourceDetail.getFragment('resource')},
            },
          }
        },
        ${ResourceNew.getFragment('master')},
      }
    `,
  },
});



