import Relay from 'react-relay';

export default class NewResourceMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{newResource}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on NewResourcePayload {
        resourceEdge,
        master {
          resources,
        },
        user {
          resources,
        },
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'master',
        parentID: this.props.master.id,
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
    ];
  }
  getVariables () {
    return {
      userId: this.props.user.id,
      resourceName: this.props.resourceName,
    };
  }
}
