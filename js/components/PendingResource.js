import CancelPendingResourceToGroupMutation from '../mutations/CancelPendingResourceToGroupMutation';
import ConnectResourceToGroupMutation from '../mutations/ConnectResourceToGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

class PendingMember extends React.Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({open: true});
  }
  handleClose = () => {
    this.setState({open: false});
  }
  handleApprove = () => {
    const {resource, group} = this.props;
    Relay.Store.update(
      new ConnectResourceToGroupMutation({
        resource,
        group,
      })
    );
    Relay.Store.update(
      new CancelPendingResourceToGroupMutation({
        resource,
        group,
      })
    );
    this.handleClose();
  }
  handleDecline = () => {
    const {resource, group} = this.props;
    Relay.Store.update(
      new CancelPendingResourceToGroupMutation({
        resource,
        group,
      })
    );
    this.handleClose();
  }
  render () {
    const {group, resource} = this.props;
    const user = resource.users.edges[0].node;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={'Decline'}
        secondary
        onTouchTap={this.handleDecline}
      />,
      <FlatButton
        label={'Approve'}
        primary
        onTouchTap={this.handleApprove}
      />,
    ];

    return <div style={{display: 'inline-block'}}>
      <FlatButton label={'Pending'} onTouchTap={this.handleOpen} />
      <Dialog
        title={'Membership Request'}
        actions={actions}
        onRequestClose={null}
        open={this.state.open}
      >
        <p>
          <Link to={`/user/${user.id}`} style={{textDecoration: 'underline'}}>
          {user.name} </Link> has offered <Link to={`/resource/${resource.id}`}>
          {resource.name}</Link> to the <strong>{group.name}</strong> group.
        </p>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(PendingMember, {
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        ${ConnectResourceToGroupMutation.getFragment('group')},
        ${CancelPendingResourceToGroupMutation.getFragment('group')},
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        users(first: 1) {
          edges {
            node {
              id,
              name,
            }
          }
        }
        ${ConnectResourceToGroupMutation.getFragment('resource')},
        ${CancelPendingResourceToGroupMutation.getFragment('resource')},
      }
    `,
  },
});

