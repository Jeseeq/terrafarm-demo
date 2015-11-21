import React from 'react';
import Relay from 'react-relay';

class GroupDetail extends React.Component {
  render () {
    var {group} = this.props;

    return <div>{group.name}</div>;
  }
}

export default Relay.createContainer(GroupDetail, {
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        name,
      }
    `,
  },
});

