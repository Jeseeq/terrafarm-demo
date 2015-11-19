import React from 'react';
import Relay from 'react-relay';

class TEMPLATE extends React.Component {
  render () {
    return <div>TEMPLATE</div>;
  }
}

export default Relay.createContainer(TEMPLATE, {
  fragments: {
    QUERY: () => Relay.QL`
      fragment on OBJECT {
        array {
          edges {
            node {
              id,
              name,
            },
          },
        },
      }
    `,
  },
});

