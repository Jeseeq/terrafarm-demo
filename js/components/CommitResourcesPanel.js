import ConnectResourceToGroupMutation from '../mutations/ConnectResourceToGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import FlatButton from 'material-ui/lib/flat-button';

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
    const {viewer} = this.props;
    const {user} = viewer;

    return <div>
      <h3>My Resources</h3>
      <ul>
        {user.resources.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/resource/${edge.node.id}`}>{edge.node.name}</Link>
          <FlatButton label={'Commit'} onClick={this._handleCommitResource.bind(this, edge.node)} />
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


