import Relay from 'react-relay';

export default class NewGroupMutation extends Relay.Mutation {
  static fragments = {
    master: () => Relay.QL`
      fragment on Master {
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
        master {
          groups,
        },
      }
    `;
  }
  getConfigs () {
    return [{
      type: 'RANGE_ADD',
      parentName: 'master',
      parentID: this.props.master.id,
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

