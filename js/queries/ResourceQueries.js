import Relay from 'react-relay';

export default {
  resource: () => Relay.QL`query { resource(resourceId: $resourceId) }`,
};

