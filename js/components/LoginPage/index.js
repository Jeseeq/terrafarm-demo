import AuthenticateViewerMutation from '../../mutations/AuthenticateViewerMutation';
import React from 'react';
import Relay from 'react-relay';
import NewUser from '../NewUser';
import RaisedButton from 'material-ui/lib/raised-button';
import FaUser from 'react-icons/lib/fa/user';

import styles from './styles.css';

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
      {usersList.map(edge => <div key={edge.node.id} style={{lineHeight: '37px', cursor: 'pointer'}}>
        <span
          className={styles.userName}
          onClick={this._handleLogin.bind(this, edge.node)}
        >
          <FaUser className={styles.icon} /> {edge.node.name}
        </span>
      </div>)}
      <NewUser master={master} />
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
        ${NewUser.getFragment('master')},
      }
    `,
  },
});


