import Relay from 'react-relay';

export default class RenameGroupMutation extends Relay.Mutation {
  static fragments = {
    group: () => Relay.QL`
      fragment on Group {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{renameGroup}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on RenameGroupPayload {
        group {
          name,
        },
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          group: this.props.group.id,
        },
      },
    ];
  }
  getVariables () {
    return {
      id: this.props.group.id,
      name: this.props.name,
    };
  }
}


