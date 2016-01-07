import AuthenticateViewer from '../../actions/AuthenticateViewer';
import NewUserDialog from '../NewUserDialog';
import React from 'react';
import Relay from 'react-relay';
import FaUser from 'react-icons/lib/fa/user';

import styles from './styles.css';

class LoginPage extends React.Component {
  static contextTypes = {
    location: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired,
  };
  static defaultProps = {
    params: {
      masterId: 1,
      viewerId: 1,
    },
  };
  renderLogin () {
    const {master, viewer} = this.props;
    const {users} = master;
    const usersList = users.edges.filter(edge => edge.node.name !== 'Guest');

    return <div>
      <h2>Login</h2>
      {usersList.map(edge => <div key={edge.node.id} style={{lineHeight: '37px', cursor: 'pointer'}}>
        <FaUser className={styles.icon} />
        <AuthenticateViewer
          style={{display: 'inline-block'}}
          label={edge.node.name}
          viewer={viewer}
          user={edge.node}
        />
      </div>)}
      <NewUserDialog master={master} />
    </div>;
  }
  renderLogout () {
    const {viewer, master} = this.props;
    const {user} = viewer;
    const {users} = master;
    const guest = users.edges.find(edge => edge.node.name === 'Guest');

    return <div className={styles.this}>
      <h4>Logged in as {user.name}</h4>
      <AuthenticateViewer
        style={{display: 'inline-block'}}
        label={'Logout'}
        viewer={viewer}
        user={guest.node}
      />
    </div>;
  }
  render () {
    const {viewer} = this.props;
    const {user} = viewer;
    const isLoggedIn = user && user.name !== 'Guest';
    const content = isLoggedIn ? this.renderLogout() : this.renderLogin();

    return <div key={this.context.location.pathname}>{content}</div>;
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
        ${AuthenticateViewer.getFragment('viewer')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        users(first: 18) {
          edges {
            node {
              id,
              name,
              ${AuthenticateViewer.getFragment('user')},
            },
          },
        },
        ${NewUserDialog.getFragment('master')},
      }
    `,
  },
});


