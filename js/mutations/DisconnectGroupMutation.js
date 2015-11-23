import Relay from 'react-relay';

export default class DisconnectGroupMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
      }
    `,
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
    return Relay.QL`mutation{disconnectGroup}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DisconnectGroupPayload {
        removedGroupID,
        removedUserID,
        viewer,
        user,
        group,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'viewer',
        parentID: this.props.viewer.id,
        connectionName: 'groups',
        deletedIDFieldName: 'removedGroupID',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'groups',
        deletedIDFieldName: 'removedGroupID',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'group',
        parentID: this.props.group.id,
        connectionName: 'users',
        deletedIDFieldName: 'removedUserID',
      },
    ];
  }
  getVariables () {
    return {
      groupId: this.props.group.id,
    };
  }
}


