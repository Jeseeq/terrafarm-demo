import Relay from 'react-relay';

export default class RenameResourceMutation extends Relay.Mutation {
  static fragments = {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{renameResource}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on RenameResourcePayload {
        resource {
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
          resource: this.props.resource.id,
        },
      },
    ];
  }
  getVariables () {
    return {
      id: this.props.resource.id,
      name: this.props.name,
    };
  }
}

