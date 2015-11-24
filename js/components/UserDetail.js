import {Link} from 'react-router';
import React from 'react';
import Relay from 'react-relay';

class UserDetail extends React.Component {
  render () {
    var {user, viewer} = this.props;
    var authenticatedUserId = viewer.user && viewer.user.id;
    var isViewer = user.id === authenticatedUserId;

    return <div>
      <Link to={`/user/${user.id}`}>{user.name}</Link>
      <span>{isViewer ? '*' : ''}</span>
    </div>;
  }
}

export default Relay.createContainer(UserDetail, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
      }
    `,
    viewer: () => Relay.QL`
      fragment on Viewer {
        user {
          id,
        },
      }
    `,
  },
});

