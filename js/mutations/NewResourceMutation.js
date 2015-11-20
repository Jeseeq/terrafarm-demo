import Relay from 'react-relay';

export default class NewResourceMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
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
        viewer {
          resources,
        },
      }
    `;
  }
  getConfigs () {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
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
