import Relay from 'react-relay';

export default {
  viewer: () => Relay.QL`
    query {
      viewer
    }
  `,
  user: () => Relay.QL`
    query {
      user(userId: $userId)
    }
  `,
};

