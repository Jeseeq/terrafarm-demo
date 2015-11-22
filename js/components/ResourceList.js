import React from 'react';
import Relay from 'react-relay';
import ResourceDetail from './ResourceDetail';
import ResourceNew from './ResourceNew';

class ResourceList extends React.Component {
  render () {
    var {viewer} = this.props;
    var {resources} = viewer;

    return <div>
      <h2>Resources</h2>
      <ul>
        {resources.edges.map(edge => <li key={edge.node.id}>
          <ResourceDetail resource={edge.node} />
        </li>)}
        <li><ResourceNew viewer={viewer}/></li>
      </ul>
    </div>;
  }
}

export default Relay.createContainer(ResourceList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        resources(first: 10) {
          edges {
            node {
              id,
              ${ResourceDetail.getFragment('resource')},
            },
          }
        },
        ${ResourceNew.getFragment('viewer')},
      }
    `,
  },
});



