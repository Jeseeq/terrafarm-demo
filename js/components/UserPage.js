import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import FaGroup from 'react-icons/lib/fa/group';
import FaTag from 'react-icons/lib/fa/tag';
import createColorChart from '../shared-styles/create-color-chart';

import styles from './UserPage.css';

class UserPage extends React.Component {
  state = {
    colorChart: {},
  };
  componentWillMount () {
    const {user} = this.props;
    const {groups} = user;
    const groupIds = groups.edges.map(edge => edge.node.id);
    const colorChart = createColorChart(groupIds);
    this.setState({colorChart});
  }
  render () {
    const {user} = this.props;

    return <div>
      <h4>User</h4>
      <h2>{user.name}</h2>

      {user.groups.edges.map(edge => <div key={edge.node.id}>
        <Link to={`/group/${edge.node.id}`}>
          <FaGroup className={styles.icon} /> {edge.node.name}
        </Link>
        <div
          style={{
            display: 'inline-block', width: 25, height: 8,
            marginLeft: 10,
            borderRadius: 3,
            backgroundColor: this.state.colorChart[edge.node.id],
          }}
        />
      </div>)}

      {user.resources.edges.map(edge => <div key={edge.node.id} style={{lineHeight: '37px'}}>
        <Link to={`/resource/${edge.node.id}`}>
          <FaTag className={styles.icon} /> {edge.node.name}
        </Link>
        {edge.node.groups.edges.map(groupEdge => <div key={groupEdge.node.id}
          style={{
            display: 'inline-block', width: 10, height: 10,
            marginLeft: 10,
            borderRadius: '50%',
            backgroundColor: this.state.colorChart[groupEdge.node.id],
          }}
        />)}
      </div>)}
    </div>;
  }
}

export default Relay.createContainer(UserPage, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
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


