import Relay from 'react-relay';

export default class ConnectResourceMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Resource {
        id,
      }
    `,
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
    return Relay.QL`mutation{connectResource}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on ConnectResourcePayload {
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
        parentName: 'viewer',
        parentID: this.props.viewer.id,
        connectionName: 'resources',
        edgeName: 'resourceEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
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
      resourceId: this.props.resource.id,
    };
  }
}
