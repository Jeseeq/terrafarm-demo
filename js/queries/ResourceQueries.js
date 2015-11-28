import Relay from 'react-relay';

export default {
  viewer: () => Relay.QL`query { viewer }`,
  resource: () => Relay.QL`query { resource(resourceId: $resourceId) }`,
};

