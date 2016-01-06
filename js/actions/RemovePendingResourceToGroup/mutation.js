import Relay from 'react-relay';

export default class RemovePendingResourceToGroupMutation extends Relay.Mutation {
  static fragments = {
    resource: () => Relay.QL`
      fragment on Resource {
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
    return Relay.QL`mutation{removePendingResourceToGroup}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on RemovePendingResourceToGroupPayload {
        removedGroupID,
        removedResourceID,
        resource,
        group,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'resource',
        parentID: this.props.resource.id,
        connectionName: 'groupsPending',
        deletedIDFieldName: 'removedGroupID',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'group',
        parentID: this.props.group.id,
        connectionName: 'resourcesPending',
        deletedIDFieldName: 'removedResourceID',
      },
    ];
  }
  getVariables () {
    return {
      resourceId: this.props.resource.id,
      groupId: this.props.group.id,
    };
  }
}

