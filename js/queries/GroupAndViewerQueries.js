import Relay from 'react-relay';

export default {
  viewer: () => Relay.QL`query { viewer }`,
  group: () => Relay.QL`query { group(groupId: $groupId) }`,
};



