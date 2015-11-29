import Relay from 'react-relay';

export default {
  viewer: () => Relay.QL`query { viewer }`,
  master: () => Relay.QL`query { master }`,
};

