import React from 'react';
import Relay from 'react-relay';

class InputDetail extends React.Component {
  render () {
    var {input} = this.props;

    return <div>{input.name}</div>;
  }
}

export default Relay.createContainer(InputDetail, {
  fragments: {
    input: () => Relay.QL`
      fragment on Input {
        id,
        name,
      }
    `,
  },
});

