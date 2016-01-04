import CancelPendingUserToGroupMutation from '../mutations/CancelPendingUserToGroupMutation';
import PendingUserToGroupMutation from '../mutations/PendingUserToGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';
import FaUser from 'react-icons/lib/fa/user';
import FaTag from 'react-icons/lib/fa/tag';
import NewResourceOffer from './NewResourceOffer';
// import MembershipRequests from './MembershipRequests';
import createColorChart from '../shared-styles/create-color-chart';

import styles from './GroupPage.css';

class GroupPage extends React.Component {
  state = {
    colorChart: {},
    isMember: false,
    isPendingMember: false,
  };
  componentWillMount () {
    const {group, viewer} = this.props;
    const {users, usersPending} = group;
    const {user} = viewer;
    const userIds = users.edges.map(edge => edge.node.id);
    const isMember = users.edges.find(edge => edge.node.id === user.id);
    const isPendingMember = usersPending.edges.find(edge => edge.node.id === user.id);
    const colorChart = createColorChart(userIds);
    this.setState({colorChart, isMember, isPendingMember});
  }
  handleRequestMembership = () => {
    Relay.Store.update(
      new PendingUserToGroupMutation({
        user: this.props.viewer.user,
        group: this.props.group,
      })
    );
  }
  handleCancelMembershipRequest = () => {
    Relay.Store.update(
      new CancelPendingUserToGroupMutation({
        user: this.props.viewer.user,
        group: this.props.group,
      })
    );
  }
  renderMembersPending () {
    const {group} = this.props;
    // add controls to accept/decline membership request
    return this.state.isMember && <div className={styles.users}>
      {group.usersPending.edges.map(edge => <div key={edge.node.id} style={{lineHeight: '37px'}}>
        <Link to={`/user/${edge.node.id}`}>
          <FaUser className={styles.icon} style={{opacity: 0.15}}/> {edge.node.name}
        </Link>
      </div>)}
    </div>;
  }
  renderNewMembershipRequest () {
    if (this.state.isPendingMember) {
      return <RaisedButton
        label={'Cancel Membership Request'}
        onClick={this.handleCancelMembershipRequest}
        style={{margin: '10px 0 15px 10px'}}
      />;
    }
    return <RaisedButton
      label={'Request Membership'}
      onClick={this.handleRequestMembership}
      style={{margin: '10px 0 15px 10px'}}
    />;
  }
  renderResourcesPending () {
    const {group} = this.props;
    // add controls to accept/decline resource offer
    return this.state.isMember && <div className={styles.resources}>
      {group.resourcesPending.edges.map(edge => <div key={edge.node.id} style={{lineHeight: '37px'}}>
        <Link to={`/resource/${edge.node.id}`}>
          <FaTag className={styles.icon} style={{opacity: 0.15}}/> {edge.node.name}
        </Link>
      </div>)}
    </div>;
  }
  renderNewResourceOffer () {
    const {group, viewer} = this.props;
    return this.state.isMember
      && <NewResourceOffer group={group} viewer={viewer} />;
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
              display: 'inline-block', width: 25, height: 8,
              marginLeft: 10,
              borderRadius: 3,
              backgroundColor: this.state.colorChart[edge.node.id],
            }}
          />
        </div>)}
        {this.renderMembersPending()}
        {this.renderNewMembershipRequest()}
      </div>
      <div className={styles.resources}>
        {group.resources.edges.map(edge => <div key={edge.node.id} style={{lineHeight: '37px'}}>
          <Link to={`/resource/${edge.node.id}`}>
            <FaTag className={styles.icon} /> {edge.node.name}
          </Link>
          {edge.node.users.edges.map(userEdge => <div key={userEdge.node.id}
            style={{
              display: 'inline-block', width: 10, height: 10,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: '50%',
              backgroundColor: this.state.colorChart[userEdge.node.id],
            }}
          />)}
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
            }
          }
        },
        ${PendingUserToGroupMutation.getFragment('group')},
        ${CancelPendingUserToGroupMutation.getFragment('group')},
        ${NewResourceOffer.getFragment('group')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on Viewer {
        user {
          id,
          ${CancelPendingUserToGroupMutation.getFragment('user')},
          ${PendingUserToGroupMutation.getFragment('user')},
        },
        ${NewResourceOffer.getFragment('viewer')},
      }
    `,
  },
});


