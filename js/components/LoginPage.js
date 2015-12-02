import AuthenticateViewerMutation from '../mutations/AuthenticateViewerMutation';
import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import NewUserPanel from './NewUserPanel';

class LoginPage extends React.Component {
  _handleLogin (user) {
    var {viewer} = this.props;
    Relay.Store.update(
      new AuthenticateViewerMutation({
        viewer: viewer,
        user: user,
      })
    );
  }
  render () {
    // if viewer is authenticated show log out button
    var {master} = this.props;
    var {users} = master;

    return <div>
      <h2>Login</h2>
      <h3>Username</h3>
      <ul>
        {users.edges.map(edge => <li key={edge.node.id}>
          <span onClick={this._handleLogin.bind(this, edge.node)}>
            {edge.node.name}
          </span>
        </li>)}
        <li><NewUserPanel master={master} /></li>
      </ul>
    </div>;
  }
}

export default Relay.createContainer(LoginPage, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${AuthenticateViewerMutation.getFragment('viewer')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        users(first: 18) {
          edges {
            node {
              id,
              name,
              ${AuthenticateViewerMutation.getFragment('user')},
            },
          },
        },
        ${NewUserPanel.getFragment('master')},
      }
    `,
  },
});


