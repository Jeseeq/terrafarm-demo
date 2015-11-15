import Relay from 'react-relay';

export default {
  roles: () => Relay.QL`query { roles(names: $roleNames }`
};
