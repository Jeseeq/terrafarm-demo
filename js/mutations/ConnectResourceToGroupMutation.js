import Relay from 'react-relay';

export default class ConnectResourceToGroup extends Relay.Mutation {
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
    return Relay.QL`mutation{connectResourceToGroup}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on ConnectResourceToGroupPayload {
        groupEdge,
        resourceEdge,
        resource,
        group,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'resource',
        parentID: this.props.resource.id,
        connectionName: 'groups',
        edgeName: 'groupEdge',
        rangeBehaviors: {
          '': 'append',
      },
      {
        type: 'RANGE_ADD',
        parentName: 'group',
        parentID: this.props.group.id,
        connectionName: 'resources',
        edgeName: 'resourceEdge',
        rangeBehaviors: {
          '': 'append',
        },
      }
    ];
  }
  getVariables () {
    return {
      resourceId: this.props.resource.id,
      groupId: this.props.group.id,
    };
  }
}

