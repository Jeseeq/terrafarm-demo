import Relay from 'react-relay';

export default class NewProvisionMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
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
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{newProvision}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on NewProvisionPayload {
        provisionEdge,
        userEdge,
        resourceEdge,
        groupEdge,
        user,
        resource,
        group,
        viewer {
          provisions,
        },
      }
    `;
  }
  getConfigs () {
    return [{
      type: 'RANGE_ADD',
      parentName: 'user',
      parentID: this.props.user.id,
      connectionName: 'provisions',
      edgeName: 'provisionEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }, {
      type: 'RANGE_ADD',
      parentName: 'resource',
      parentID: this.props.resource.id,
      connectionName: 'provisions',
      edgeName: 'provisionEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }, {
      type: 'RANGE_ADD',
      parentName: 'group',
      parentID: this.props.group.id,
      connectionName: 'provisions',
      edgeName: 'provisionEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }, {
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'provisions',
      edgeName: 'provisionEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }
  getVariables () {
    return {
      provisionName: this.props.provisionName,
      userId: this.props.user.id,
      resourceId: this.props.resource.id,
      groupId: this.props.group.id,
    };
  }
}

