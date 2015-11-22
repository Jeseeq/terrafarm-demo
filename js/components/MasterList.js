import React from 'react';
import Relay from 'react-relay';
import UserList from './UserList';
import ResourceList from './ResourceList';
import GroupList from './GroupList';

class MasterList extends React.Component {
  render () {
    var {viewer} = this.props;

    return <div>
      <h1>App</h1>
      <UserList viewer={viewer} />
      <ResourceList viewer={viewer} />
      <GroupList viewer={viewer} />
    </div>;
  }
}

export default Relay.createContainer(MasterList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${UserList.getFragment('viewer')},
        ${ResourceList.getFragment('viewer')},
        ${GroupList.getFragment('viewer')},
      }
    `,
  },
});
