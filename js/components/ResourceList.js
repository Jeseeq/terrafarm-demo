import ConnectResourceMutation from '../mutations/ConnectResourceMutation';
import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import ResourceNew from './ResourceNew';

class ResourceList extends React.Component {
  _handleConnectResource (resource) {
    Relay.Store.update(
      new ConnectResourceMutation({
        user: this.props.viewer.user,
        resource: resource,
      })
    );
  }
  render () {
    var {master} = this.props;
    var {resources} = master;

    return <div>
      <h2>Resources</h2>
      <ul>
        {resources.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/resource/${edge.node.id}`}>{edge.node.name}</Link>
          <button
            onClick={this._handleConnectResource.bind(this, edge.node)}>
            connect
          </button>
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
              name,
              ${ConnectResourceMutation.getFragment('resource')},
            },
          }
        },
        ${ResourceNew.getFragment('master')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on Viewer {
        user {
          id,
          ${ConnectResourceMutation.getFragment('user')},
        },
      }
    `,
  },
});



