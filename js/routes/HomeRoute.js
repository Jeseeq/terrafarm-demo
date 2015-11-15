import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    roles: () => Relay.QL`query { roles(names: $roleNames) }`,
    users: () => Relay.QL`query { users(names: $userNames) }`,
  };
  static routeName = 'HomeRoute';
}
