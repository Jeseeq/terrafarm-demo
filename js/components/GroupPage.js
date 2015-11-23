import React from 'react';
import Relay from 'react-relay';

class GroupPage extends React.Component {
  render () {
    var {group} = this.props;
    return <div>
      <h2>Hello {group.name}</h2>
    </div>;
  }
}

export default Relay.createContainer(GroupPage, {
  initialVariables: {
    groupId: null,
  },
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        name,
      }
    `
  }
});


