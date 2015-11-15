import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    roles: () => Relay.QL`query { roles(names: $roleNames) }`,
  };
  static routeName = 'HomeRoute';
}
