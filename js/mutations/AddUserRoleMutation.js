import Relay from 'react-relay';

export default class AddUserRoleMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
    role: () => Relay.QL`
      fragment on Role {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{addUserRole}`;
  }
  // TODO: getCollisionKey ()
  getFatQuery () {
    return Relay.QL`
      fragment on AddUserRolePayload {
        user {
          roles,
        },
        role {
          users,
        },
      }
    `;
  }
  getConfigs () {
    return [{
      type: 'RANGE_ADD',
      parentName: 'user',
      parentID: this.props.user.id,
      connectionName: 'roles',
      //edgeName: 'newShipEdge',
      rangeBehaviors: {
        '': 'append',
      },
    },
    {
      type: 'RANGE_ADD',
      parentName: 'role',
      parentID: this.props.role.id,
      connectionName: 'users',
      //edgeName: 'newShipEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }
  getVariables () {
    return {
      userId: this.props.user.id,
      roleId: this.props.role.id,
    };
  }
  // TODO: getOptimisticResponse ()
}
