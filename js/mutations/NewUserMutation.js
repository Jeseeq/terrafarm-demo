import Relay from 'react-relay';

export default class NewUserMutation extends Relay.Mutation {
  static fragments = {
    master: () => Relay.QL`
      fragment on Master {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{newUser}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on NewUserPayload {
        userEdge,
        master {
          users,
        },
      }
    `;
  }
  getConfigs () {
    return [{
      type: 'RANGE_ADD',
      parentName: 'master',
      parentID: this.props.master.id,
      connectionName: 'users',
      edgeName: 'userEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }
  getVariables () {
    return {
      userName: this.props.userName,
    };
  }
}
