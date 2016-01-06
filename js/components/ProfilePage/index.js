import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import EditResource from '../EditResource';
import EditGroup from '../EditGroup';
import NewResource from '../NewResource';
import NewGroupDialog from '../NewGroupDialog';
import FaGroup from 'react-icons/lib/fa/group';
import FaTag from 'react-icons/lib/fa/tag';

import createColorChart from '../../shared-styles/create-color-chart';
import styles from './styles.css';

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
      <div className={styles.groups}>
        {user.groups.edges.map(edge => <div key={edge.node.id}>
          <Link to={`/group/${edge.node.id}`}>
            <FaGroup className={styles.icon} /> {edge.node.name}
          </Link>
          <div
            style={{
              display: 'inline-block', width: 25, height: 8,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 3,
              backgroundColor: this.state.colorChart[edge.node.id],
            }}
          />
          <EditGroup user={user} group={edge.node} />
        </div>)}
        {user.groupsPending.edges.map(edge => <div key={edge.node.id} style={{lineHeight: '37px'}}>
          <Link to={`/group/${edge.node.id}`}>
            <FaGroup className={styles.icon} style={{opacity: 0.15}}/> {edge.node.name}
          </Link>
        </div>)}
        <NewGroupDialog user={user} master={master} />
      </div>
      <div className={styles.resources}>
        {user.resources.edges.map(edge => <div key={edge.node.id}>
          <Link to={`/resource/${edge.node.id}`}>
            <FaTag className={styles.icon} /> {edge.node.name}
          </Link>
          {edge.node.groups.edges.map(groupEdge => <div key={groupEdge.node.id}
            style={{
              display: 'inline-block', width: 10, height: 10,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: '50%',
              backgroundColor: this.state.colorChart[groupEdge.node.id],
            }}
          />)}
          <EditResource user={user} resource={edge.node} />
        </div>)}
        <NewResource user={user} master={master} />
      </div>
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
                ${EditGroup.getFragment('group')},
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
          ${EditGroup.getFragment('user')},
          ${NewResource.getFragment('user')},
          ${NewGroupDialog.getFragment('user')},
        },
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        ${NewResource.getFragment('master')},
        ${NewGroupDialog.getFragment('master')},
      }
    `,
  },
});

