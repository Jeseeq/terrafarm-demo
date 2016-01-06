import Relay from 'react-relay';

export default class RemoveResourceFromGroupMutation extends Relay.Mutation {
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
    return Relay.QL`mutation{removeResourceFromGroup}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on RemoveResourceFromGroupPayload {
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
        connectionName: 'groups',
        deletedIDFieldName: 'removedGroupID',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'group',
        parentID: this.props.group.id,
        connectionName: 'resources',
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


