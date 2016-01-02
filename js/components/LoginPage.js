import AuthenticateViewerMutation from '../mutations/AuthenticateViewerMutation';
import React from 'react';
import Relay from 'react-relay';
import NewUserPanel from './NewUserPanel';
import RaisedButton from 'material-ui/lib/raised-button';

import styles from './LoginPage.css';

class LoginPage extends React.Component {
  static defaultProps = {
    params: {
      masterId: 1,
      viewerId: 1,
    },
  };
  _handleLogin (user) {
    const {viewer} = this.props;
    Relay.Store.update(
      new AuthenticateViewerMutation({
        viewer: viewer,
        user: user,
      })
    );
  }
  renderLogin () {
    const {master} = this.props;
    const {users} = master;
    const usersList = users.edges.filter(edge => edge.node.name !== 'Guest');

    return <div>
      <h2>Login</h2>
      <h3>Username</h3>
      <NewUserPanel master={master} />
      <ul>
        {usersList.map(edge => <li key={edge.node.id}>
          <span
            className={styles.userName}
            onClick={this._handleLogin.bind(this, edge.node)}
          >
            {edge.node.name}
          </span>
        </li>)}
      </ul>
    </div>;
  }
  renderLogout () {
    const {viewer, master} = this.props;
    const {user} = viewer;
    const {users} = master;
    const guest = users.edges.find(edge => edge.node.name === 'Guest');

    return <div className={styles.this}>
      <h4>Logged in as {user.name}</h4>
      <RaisedButton
        onClick={this._handleLogin.bind(this, guest.node)}
        label={'Logout'}
      />
    </div>;
  }
  render () {
    const {viewer} = this.props;
    const {user} = viewer;
    const isLoggedIn = user && user.name !== 'Guest';
    const content = isLoggedIn ? this.renderLogout() : this.renderLogin();

    return <div>{content}</div>;
  }
}

export default Relay.createContainer(LoginPage, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
        user {
          id,
          name,
        },
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


