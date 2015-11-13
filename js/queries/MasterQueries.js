import Relay from 'react-relay';

export default {
  master: () => Relay.QL`query { master }`,
  viewer: () => Relay.QL`query { viewer }`
};

