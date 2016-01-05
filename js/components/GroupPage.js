import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import FaUser from 'react-icons/lib/fa/user';
import FaTag from 'react-icons/lib/fa/tag';
import NewMemberRequest from './NewMemberRequest';
import CancelNewMemberRequest from './CancelNewMemberRequest';
import NewResourceOffer from './NewResourceOffer';
import PendingMember from './PendingMember';
import PendingResource from './PendingResource';
import createColorChart from '../shared-styles/create-color-chart';

import styles from './GroupPage.css';

class GroupPage extends React.Component {
  state = {
    colorChart: {},
    isMember: false,
    isPendingMember: false,
  };
  componentWillMount () {
    this.createColorChart();
    this.updateMemberStatus();
  }
  componentWillReceiveProps () {
    this.createColorChart();
    this.updateMemberStatus();
  }
  createColorChart () {
    const {group} = this.props;
    const {users} = group;
    const userIds = users.edges.map(edge => edge.node.id);
    const colorChart = createColorChart(userIds);
    this.setState({colorChart});
  }
  updateMemberStatus () {
    const {group, viewer} = this.props;
    const {users, usersPending} = group;
    const {user} = viewer;

    const isMember = users.edges.find(edge => edge.node.id === user.id);
    const isPendingMember = usersPending.edges.find(edge => edge.node.id === user.id);

    this.setState({isMember, isPendingMember});
  }
  renderMembersPending () {
    const {group} = this.props;

    if (this.state.isMember) {
      return <div>
        {group.usersPending.edges.map(edge => <div key={edge.node.id} style={{lineHeight: '37px'}}>
          <Link to={`/user/${edge.node.id}`}>
            <FaUser className={styles.icon} style={{opacity: 0.15}}/> {edge.node.name}
          </Link>
          <PendingMember user={edge.node} group={group} />
        </div>)}
      </div>;
    }
  }
  renderNewMemberRequest () {
    const {group, viewer} = this.props;
    const {user} = viewer;

    if (this.state.isPendingMember) {
      return <CancelNewMemberRequest group={group} user={user} />;
    } else if (!this.state.isMember) {
      return <NewMemberRequest group={group} user={user} />;
    }
  }
  renderResourcesPending () {
    const {group} = this.props;

    if (this.state.isMember) {
      return <div>
        {group.resourcesPending.edges.map(edge => <div key={edge.node.id} style={{lineHeight: '37px'}}>
          <Link to={`/resource/${edge.node.id}`}>
            <FaTag className={styles.icon} style={{opacity: 0.15}}/> {edge.node.name}
          </Link>
          <PendingResource resource={edge.node} group={group} />
        </div>)}
      </div>;
    }
  }
  renderNewResourceOffer () {
    if (this.state.isMember) {
      const {group, viewer} = this.props;
      const {user} = viewer;
      return <NewResourceOffer group={group} user={user} />;
    }
  }
  render () {
    const {group} = this.props;
    return <div>
      <h4>Group</h4>
      <h2>{group.name}</h2>
      <p className={styles.category}>| {group.category} |</p>

      <div className={styles.users}>
        {group.users.edges.map(edge => <div key={edge.node.id} style={{lineHeight: '37px'}}>
          <Link to={`/user/${edge.node.id}`}>
            <FaUser className={styles.icon} /> {edge.node.name}
          </Link>
          <div
            style={{
              display: 'inline-block',
              width: 25,
              height: 8,
              marginLeft: 10,
              borderRadius: 3,
              backgroundColor: this.state.colorChart[edge.node.id],
            }}
          />
        </div>)}
        {this.renderMembersPending()}
        {this.renderNewMemberRequest()}
      </div>

      <div className={styles.resources}>
        {group.resources.edges.map(edge => <div key={edge.node.id} style={{lineHeight: '37px'}}>
          <Link to={`/resource/${edge.node.id}`}>
            <FaTag className={styles.icon} /> {edge.node.name}
          </Link>
          {edge.node.users.edges.map(userEdge => {
            return <div key={userEdge.node.id}
              style={{
                display: 'inline-block',
                width: 10,
                height: 10,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: '50%',
                backgroundColor: this.state.colorChart[userEdge.node.id],
              }}
            />;
          })}
        </div>)}
        {this.renderResourcesPending()}
        {this.renderNewResourceOffer()}
      </div>

      <p className={styles.description}>{group.description}</p>
    </div>;
  }
}

export default Relay.createContainer(GroupPage, {
  initialVariables: {
    groupId: null,
  },
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        name,
        description,
        category,
        users(first: 18) {
          edges {
            node {
              id,
              name,
            }
          }
        },
        usersPending(first: 18) {
          edges {
            node {
              id,
              name,
              ${PendingMember.getFragment('user')},
            }
          }
        },
        resources(first: 18) {
          edges {
            node {
              id,
              name,
              users(first: 18) {
                edges {
                  node {
                    id,
                  }
                }
              }
            }
          }
        },
        resourcesPending(first: 18) {
          edges {
            node {
              id,
              name,
              ${PendingResource.getFragment('resource')},
            }
          }
        },
        ${NewMemberRequest.getFragment('group')},
        ${CancelNewMemberRequest.getFragment('group')},
        ${NewResourceOffer.getFragment('group')},
        ${PendingMember.getFragment('group')},
        ${PendingResource.getFragment('group')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on Viewer {
        user {
          id,
          ${NewMemberRequest.getFragment('user')},
          ${CancelNewMemberRequest.getFragment('user')},
          ${NewResourceOffer.getFragment('user')},
        },
      }
    `,
  },
});


