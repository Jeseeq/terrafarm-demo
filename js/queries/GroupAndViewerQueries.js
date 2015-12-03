import Relay from 'react-relay';

export default {
  group: () => Relay.QL`query { group(groupId: $groupId) }`,
  viewer: () => Relay.QL`query { viewer }`,
};



