import Relay from 'react-relay';

export default class NewGroupMutation extends Relay.Mutation {
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
    return Relay.QL`mutation{newGroup}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on NewGroupPayload {
        groupEdge,
        master {
          groups,
        },
        user {
          groups,
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
        connectionName: 'groups',
        edgeName: 'groupEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'groups',
        edgeName: 'groupEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
    ];
  }
  getVariables () {
    return {
      userId: this.props.user.id,
      groupName: this.props.groupName,
    };
  }
}

