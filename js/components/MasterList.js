import React from 'react';
import Relay from 'react-relay';
import UserList from './UserList';
import ResourceList from './ResourceList';
import GroupList from './GroupList';

class MasterList extends React.Component {
  render () {
    var {master} = this.props;

    return <div>
      <UserList master={master} />
      <ResourceList master={master} />
      <GroupList master={master} />
    </div>;
  }
}

export default Relay.createContainer(MasterList, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        ${UserList.getFragment('master')},
        ${ResourceList.getFragment('master')},
        ${GroupList.getFragment('master')},
      }
    `,
  },
});
