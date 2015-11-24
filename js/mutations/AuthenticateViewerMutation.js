import Relay from 'react-relay';

export default class AuthenticateViewerMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
        resources(first: 18) {
          edges {
            node {
              id,
            }
          },
        },
        groups(first: 18) {
          edges {
            node {
              id,
            }
          },
        },
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
        resources(first: 18) {
          edges {
            node {
              id,
            },
          }
        },
        groups(first: 18) {
          edges {
            node {
              id,
            }
          },
        },
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{authenticateViewer}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on AuthenticateViewerPayload {
        viewer {
          id,
          resources(first: 18) {
            edges {
              node {
                id,
              }
            },
          },
          groups(first: 18) {
            edges {
              node {
                id,
              }
            },
          },
        },
        user {
          id,
          resources(first: 18) {
            edges {
              node {
                id,
              }
            },
          },
          groups(first: 18) {
            edges {
              node {
                id,
              }
            },
          },
        }

      }
    `;
  }
  getConfigs () {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        viewer: this.props.viewer.id,
      },
    }];
  }
  getVariables () {
    return {
      userId: this.props.user.id,
    };
  }
}

