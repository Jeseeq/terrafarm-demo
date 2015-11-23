import {Link} from 'react-router';
import React from 'react';
import Relay from 'react-relay';

class GroupDetail extends React.Component {
  render () {
    var {group} = this.props;

    return <div><Link to={`/group/${group.id}`}>{group.name}</Link></div>;
  }
}

export default Relay.createContainer(GroupDetail, {
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        name,
      }
    `,
  },
});

