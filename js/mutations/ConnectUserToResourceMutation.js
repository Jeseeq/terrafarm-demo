import Relay from 'react-relay';

export default class ConnectUserToResourceMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on Resource {
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
    return Relay.QL`mutation{connectUserToResource}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on ConnectUserToResourcePayload {
        resourceEdge,
        userEdge,
        viewer,
        user,
        resource,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'resources',
        edgeName: 'resourceEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'resource',
        parentID: this.props.resource.id,
        connectionName: 'users',
        edgeName: 'userEdge',
        rangeBehaviors: {
          '': 'append',
        },
      }
    ];
  }
  getVariables () {
    return {
      userId: this.props.user.id,
      resourceId: this.props.resource.id,
    };
  }
}
