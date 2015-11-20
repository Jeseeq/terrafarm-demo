import Relay from 'react-relay';

export default class NewGroupMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{newGroup}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on NewGroupPayload {
        groupEdge,
        viewer {
          groups,
        },
      }
    `;
  }
  getConfigs () {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'groups',
      edgeName: 'groupEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }
  getVariables () {
    return {
      groupName: this.props.groupName,
    };
  }
}

