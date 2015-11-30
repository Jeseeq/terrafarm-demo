import Relay from 'react-relay';

export default class DisconnectUserFromResourceMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{disconnectUserFromResource}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DisconnectUserFromResourcePayload {
        removedResourceID,
        removedUserID,
        user,
        resource,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'resources',
        deletedIDFieldName: 'removedResourceID',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'resource',
        parentID: this.props.resource.id,
        connectionName: 'users',
        deletedIDFieldName: 'removedUserID',
      },
    ];
  }
  getVariables () {
    return {
      userId: this.props.user.id,
      resourceId: this.props.resource.id,
    };
  }
}
