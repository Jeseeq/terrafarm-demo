import Relay from 'react-relay';

export default class ConnectUserAndResourceMutation extends Relay.Mutation {
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
    return Relay.QL`mutation{connectUserAndResource}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on ConnectUserAndResourcePayload {
        resourceEdge,
        userEdge,
        user,
        resource,
      }
    `;
  }
  getConfigs () {
    return [{
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
    }];
  }
  getVariables () {
    return {
      userId: this.props.user.id,
      resourceId: this.props.resource.id,
    };
  }
}
