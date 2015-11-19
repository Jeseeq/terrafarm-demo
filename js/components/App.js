import React from 'react';
import Relay from 'react-relay';
import UserDetail from './UserDetail';
import InputDetail from './InputDetail';
import GroupDetail from './GroupDetail';
import ProvisionDetail from './ProvisionDetail';
import NewUser from './NewUser';

class App extends React.Component {
  render () {
    var {viewer} = this.props;
    var {users, inputs, groups, provisions} = viewer;

    return <div>
      <h1>App</h1>

      <h2>Users</h2>
      <ul>
        {users.edges.map(edge => <li key={edge.node.id}>
          <UserDetail user={edge.node} />
        </li>)}
        <li><NewUser viewer={viewer}/></li>
      </ul>

      <h2>Inputs</h2>
      <ul>
        {inputs.edges.map(edge => <li key={edge.node.id}>
          <InputDetail input={edge.node} />
        </li>)}
      </ul>

      <h2>Groups</h2>
      <ul>
        {groups.edges.map(edge => <li key={edge.node.id}>
          <GroupDetail group={edge.node} />
        </li>)}
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
        inputs(first: 5) {
          edges {
            node {
              id,
              ${InputDetail.getFragment('input')},
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
      }
    `,
  },
});

