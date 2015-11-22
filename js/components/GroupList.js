import React from 'react';
import Relay from 'react-relay';
import GroupDetail from './GroupDetail';
import GroupNew from './GroupNew';

class GroupList extends React.Component {
  render () {
    var {viewer} = this.props;
    var {groups} = viewer;

    return <div>
      <h2>Groups</h2>
      <ul>
        {groups.edges.map(edge => <li key={edge.node.id}>
          <GroupDetail group={edge.node} />
        </li>)}
        <li><GroupNew viewer={viewer}/></li>
      </ul>
    </div>;
  }
}

export default Relay.createContainer(GroupList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        groups(first: 10) {
          edges {
            node {
              id,
              ${GroupDetail.getFragment('group')},
            },
          }
        },
        ${GroupNew.getFragment('viewer')},
      }
    `,
  },
});


