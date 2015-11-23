import Relay from 'react-relay';

export default class DisconnectResourceMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
      }
    `,
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
    return Relay.QL`mutation{disconnectResource}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DisconnectResourcePayload {
        removedResourceID,
        removedUserID,
        viewer,
        user,
        resource,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'viewer',
        parentID: this.props.viewer.id,
        connectionName: 'resources',
        deletedIDFieldName: 'removedResourceID',
      },
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
      resourceId: this.props.resource.id,
    };
  }
}

