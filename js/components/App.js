import React from 'react';
import Relay from 'react-relay';
import UserDetail from './UserDetail';
import ResourceDetail from './ResourceDetail';
import GroupDetail from './GroupDetail';
import ProvisionDetail from './ProvisionDetail';
import NewUser from './NewUser';
import NewResource from './NewResource';
import NewGroup from './NewGroup';

class App extends React.Component {
  render () {
    var {viewer} = this.props;
    var {users, resources, groups, provisions} = viewer;

    return <div>
      <h1>App</h1>

      <h2>Users</h2>
      <ul>
        {users.edges.map(edge => <li key={edge.node.id}>
          <UserDetail user={edge.node} />
        </li>)}
        <li><NewUser viewer={viewer}/></li>
      </ul>

      <h2>Resources</h2>
      <ul>
        {resources.edges.map(edge => <li key={edge.node.id}>
          <ResourceDetail resource={edge.node} />
        </li>)}
        <li><NewResource viewer={viewer}/></li>
      </ul>

      <h2>Groups</h2>
      <ul>
        {groups.edges.map(edge => <li key={edge.node.id}>
          <GroupDetail group={edge.node} />
        </li>)}
        <li><NewGroup viewer={viewer}/></li>
      </ul>

      <h2>Provisions</h2>
      <ul>
        {provisions.edges.map(edge => <li key={edge.node.id}>
          <ProvisionDetail provision={edge.node} />
        </li>)}
      </ul>
    </div>;
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        users(first: 5) {
          edges {
            node {
              id,
              ${UserDetail.getFragment('user')},
            },
          }
        },
        resources(first: 5) {
          edges {
            node {
              id,
              ${ResourceDetail.getFragment('resource')},
            },
          }
        },
        groups(first: 5) {
          edges {
            node {
              id,
              ${GroupDetail.getFragment('group')},
            },
          }
        },
        provisions(first: 5) {
          edges {
            node {
              id,
              ${ProvisionDetail.getFragment('provision')},
            },
          }
        },
        ${NewUser.getFragment('viewer')},
        ${NewResource.getFragment('viewer')},
        ${NewGroup.getFragment('viewer')},
      }
    `,
  },
});

