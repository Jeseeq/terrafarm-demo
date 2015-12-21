import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

const styles = {
  tab: {
    fontSize: 17,
    letterSpacing: 0.3,
  },
};

class BrowsePage extends React.Component {
  render () {
    const {master} = this.props;
    const {users, resources, groups} = master;

    return <div>
      <h2>Browse</h2>
      <Tabs>
        <Tab label={'Users'} style={styles.tab}>
          <ul>
            {users.edges.map(edge => <li key={edge.node.id}>
              <Link to={`/user/${edge.node.id}`}>{edge.node.name}</Link>
            </li>)}
          </ul>
        </Tab>
        <Tab label={'Resources'} style={styles.tab}>
          <ul>
            {resources.edges.map(edge => <li key={edge.node.id}>
              <Link to={`/resource/${edge.node.id}`}>{edge.node.name}</Link>
            </li>)}
          </ul>
        </Tab>
        <Tab label={'Groups'} style={styles.tab}>
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
