import Relay from 'react-relay';

export default class NewResourceMutation extends Relay.Mutation {
  static fragments = {
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
      }
    `;
  }
  getConfigs () {
    return [{
      type: 'RANGE_ADD',
      parentName: 'master',
      parentID: this.props.master.id,
      connectionName: 'resources',
      edgeName: 'resourceEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }
  getVariables () {
    return {
      resourceName: this.props.resourceName,
    };
  }
}
