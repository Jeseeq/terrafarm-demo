import Relay from 'react-relay';

export default class UpdateGroupMutation extends Relay.Mutation {
  static fragments = {
    group: () => Relay.QL`
      fragment on Group {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{updateGroup}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UpdateGroupPayload {
        group {
          name,
          description,
          category,
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
      description: this.props.description,
      category: this.props.category,
    };
  }
}


