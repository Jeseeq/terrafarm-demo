import React from 'react';
import Relay from 'react-relay';
import UserList from './UserList';
import ResourceList from './ResourceList';
import GroupList from './GroupList';

class MasterList extends React.Component {
  render () {
    var {master, viewer} = this.props;

    return <div>
      <UserList master={master} viewer={viewer} />
      <ResourceList master={master} viewer={viewer} />
      <GroupList master={master} viewer={viewer} />
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
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${UserList.getFragment('viewer')},
        ${ResourceList.getFragment('viewer')},
        ${GroupList.getFragment('viewer')},
      }
    `,
  },
});
