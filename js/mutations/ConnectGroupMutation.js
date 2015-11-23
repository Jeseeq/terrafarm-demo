import Relay from 'react-relay';

export default class ConnectGroupMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Group {
        id,
      }
    `,
    user: () => Relay.QL`
      fragment on Group {
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
    return Relay.QL`mutation{connectGroup}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on ConnectGroupPayload {
        groupEdge,
        userEdge,
        viewer,
        user,
        group,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'viewer',
        parentID: this.props.viewer.id,
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
      {
        type: 'RANGE_ADD',
        parentName: 'group',
        parentID: this.props.group.id,
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
      groupId: this.props.group.id,
    };
  }
}

