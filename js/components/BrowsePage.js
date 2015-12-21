import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Colors from 'material-ui/lib/styles/colors';

class BrowsePage extends React.Component {
  render () {
    const {master} = this.props;
    const {users, resources, groups} = master;

    return <div>
      <h2>Browse</h2>
      <Tabs
        inkBarStyle={{backgroundColor: Colors.green200}}
        tabItemContainerStyle={{backgroundColor: Colors.blueGrey300}}
      >
        <Tab label={'Users'}>
          <ul>
            {users.edges.map(edge => <li key={edge.node.id}>
              <Link to={`/user/${edge.node.id}`}>{edge.node.name}</Link>
            </li>)}
          </ul>
        </Tab>
        <Tab label={'Resources'}>
          <ul>
            {resources.edges.map(edge => <li key={edge.node.id}>
              <Link to={`/resource/${edge.node.id}`}>{edge.node.name}</Link>
            </li>)}
          </ul>
        </Tab>
        <Tab label={'Groups'}>
          <ul>
            {groups.edges.map(edge => <li key={edge.node.id}>
              <Link to={`/group/${edge.node.id}`}>{edge.node.name}</Link>
            </li>)}
          </ul>
        </Tab>
      </Tabs>
    </div>;
  }
}

export default Relay.createContainer(BrowsePage, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        users(first: 18) {
          edges {
            node {
              id,
              name,
            }
          }
        },
        resources(first: 18) {
          edges {
            node {
              id,
              name,
            }
          }
        },
        groups(first: 18) {
          edges {
            node {
              id,
              name,
            }
          }
        },
      }
    `,
  },
});
