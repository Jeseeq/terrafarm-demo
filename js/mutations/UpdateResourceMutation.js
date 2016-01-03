import Relay from 'react-relay';

export default class UpdateResourceMutation extends Relay.Mutation {
  static fragments = {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{updateResource}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UpdateResourcePayload {
        resource {
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
          resource: this.props.resource.id,
        },
      },
    ];
  }
  getVariables () {
    return {
      id: this.props.resource.id,
      attributes: this.props.attributes,
    };
  }
}


