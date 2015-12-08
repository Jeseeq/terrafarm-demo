import ConnectResourceToGroupMutation from '../mutations/ConnectResourceToGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

class CommitResourcesPanel extends React.Component {
  _handleCommitResource = (resource) => {
    Relay.Store.update(
      new ConnectResourceToGroupMutation({
        group: this.props.group,
        resource: resource,
      })
    );
  }
  render () {
    var {viewer} = this.props;
    var {user} = viewer;

    return <div>
      <h3>My Resources</h3>
      <ul>
        {user.resources.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/resource/${edge.node.id}`}>{edge.node.name}</Link>
          <button onClick={this._handleCommitResource.bind(this, edge.node)}>
            Commit
          </button>
        </li>)}
      </ul>
    </div>;
  }
}

export default Relay.createContainer(CommitResourcesPanel, {
  initialVariables: {
    groupId: null,
  },
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        ${ConnectResourceToGroupMutation.getFragment('group')},
      },
    `,
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
        user {
          name,
          resources(first: 18) {
            edges {
              node {
                id,
                name,
                ${ConnectResourceToGroupMutation.getFragment('resource')},
              }
            }
          },
        },
      }
    `,
  },
});


