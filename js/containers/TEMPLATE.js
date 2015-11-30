import React from 'react';
import Relay from 'react-relay';
//import {Link} from 'react-router';
//import COMPONENT from '../components/COMPONENT';

class TEMPLATE extends React.Component {
  render () {
    return <div>TEMPLATE</div>;
  }
}

export default Relay.createContainer(TEMPLATE, {
  fragments: {
    QUERY: () => Relay.QL`
      fragment on QUERY {
        edges {
          node {
            id,
            name,
          },
        },
      },
    `,
  },
});

