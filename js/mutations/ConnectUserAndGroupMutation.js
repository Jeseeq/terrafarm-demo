import Relay from 'react-relay';

export default class ConnectUserAndGroupMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
    group: () => Relay.QL`
      fragment on Group {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{connectUserAndGroup}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on ConnectUserAndGroupPayload {
        groupEdge,
        userEdge,
        user,
        group,
      }
    `;
  }
  getConfigs () {
    return [{
      type: 'RANGE_ADD',
      parentName: 'user',
      parentID: this.props.user.id,
      connectionName: 'groups',
      edgeName: 'groupEdge',
      rangeBehaviors: {
        '': 'append',
      },
    },
    {
      type: 'RANGE_ADD',
      parentName: 'group',
      parentID: this.props.group.id,
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
      groupId: this.props.group.id,
    };
  }
}
