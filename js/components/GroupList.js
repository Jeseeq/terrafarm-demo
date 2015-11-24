import ConnectGroupMutation from '../mutations/ConnectGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import GroupNew from './GroupNew';

class GroupList extends React.Component {
  _handleConnectGroup (group) {
    Relay.Store.update(
      new ConnectGroupMutation({
        user: this.props.viewer.user,
        group: group,
      })
    );
  }
  render () {
    var {master} = this.props;
    var {groups} = master;

    return <div>
      <h2>Groups</h2>
      <ul>
        {groups.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/group/${edge.node.id}`}>{edge.node.name}</Link>
          <button
            onClick={this._handleConnectGroup.bind(this, edge.node)}>
            connect
          </button>
        </li>)}
        <li><GroupNew master={master}/></li>
      </ul>
    </div>;
  }
}

export default Relay.createContainer(GroupList, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        groups(first: 10) {
          edges {
            node {
              id,
              name,
              ${ConnectGroupMutation.getFragment('group')},
            },
          }
        },
        ${GroupNew.getFragment('master')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on Viewer {
        user {
          id,
          ${ConnectGroupMutation.getFragment('user')},
        },
      }
    `,
  },
});


