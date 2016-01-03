import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import EditResource from './EditResource';
import EditGroupPanel from './EditGroupPanel';
import NewResourcePanel from './NewResourcePanel';
import NewGroupPanel from './NewGroupPanel';

import createColorChart from '../shared-styles/create-color-chart';
import styles from './ProfilePage.css';

class ProfilePage extends React.Component {
  state = {
    colorChart: {},
  };
  componentWillMount () {
    this.createColorChart();
  }
  componentWillReceiveProps () {
    this.createColorChart();
  }
  createColorChart () {
    const {viewer} = this.props;
    const {user} = viewer;
    const {groups} = user;
    const groupIds = groups.edges.map(edge => edge.node.id);
    const colorChart = createColorChart(groupIds);
    this.setState({colorChart});
  }
  render () {
    const {viewer, master} = this.props;
    const {user} = viewer;

    return <div>
      <h4>Your profile</h4>
      <h2 className={styles.heading}>{user.name}</h2>
      <h3>Groups</h3>
      <NewGroupPanel user={user} master={master} />
      <ul>
        {user.groups.edges.map(edge => <li key={edge.node.id}>
          <EditGroupPanel user={user} group={edge.node} />
          <div
            style={{
              display: 'inline-block', width: 25, height: 8,
              marginLeft: 10,
              borderRadius: 3,
              backgroundColor: this.state.colorChart[edge.node.id],
            }}
          />
        </li>)}
      </ul>
      <h3>Resources</h3>
      <NewResourcePanel user={user} master={master} />
      <ul>
        {user.resources.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/resource/${edge.node.id}`}>{edge.node.name}</Link>
          {edge.node.groups.edges.map(groupEdge => <div key={groupEdge.node.id}
            style={{
              display: 'inline-block', width: 10, height: 10,
              marginLeft: 10,
              borderRadius: '50%',
              backgroundColor: this.state.colorChart[groupEdge.node.id],
            }}
          />)}
          <EditResource resource={edge.node} />
        </li>)}
      </ul>
      <h3>Pending Groups</h3>
      <ul>
        {user.groupsPending.edges.map(edge => <li key={edge.node.id}>
          <Link to={`/group/${edge.node.id}`}>{edge.node.name}</Link>
        </li>)}
      </ul>
    </div>;
  }
}

export default Relay.createContainer(ProfilePage, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
        user {
          name,
          resources(first: 18) {
            edges {
              node {
                id,
                name,
                groups(first: 18) {
                  edges {
                    node {
                      id,
                    }
                  }
                },
                ${EditResource.getFragment('resource')},
              }
            }
          },
          groups(first: 18) {
            edges {
              node {
                id,
                name,
                ${EditGroupPanel.getFragment('group')},
              }
            }
          },
          groupsPending(first: 18) {
            edges {
              node {
                id,
                name,
              }
            }
          },
          ${EditGroupPanel.getFragment('user')},
          ${NewResourcePanel.getFragment('user')},
          ${NewGroupPanel.getFragment('user')},
        },
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        ${NewResourcePanel.getFragment('master')},
        ${NewGroupPanel.getFragment('master')},
      }
    `,
  },
});

