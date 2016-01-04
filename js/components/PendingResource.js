// import CancelPendingResourceToGroupMutation from '../mutations/CancelPendingResourceToGroupMutation';
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
/*
    Relay.Store.update(
      new CancelPendingResourceToGroupMutation({
        resource,
        group,
      })
    );
*/
    this.handleClose();
  }
/*
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

      <FlatButton
        label={'Decline'}
        secondary
        onTouchTap={this.handleDecline}
      />,

*/
  render () {
    const {group, resource} = this.props;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
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
          <Link to={`/resource/${resource.id}`}>{resource.name}</Link> has requested
          to join the <strong>{group.name}</strong>.
        </p>
      </Dialog>
    </div>;
  }
}
/*
 * ${CancelPendingResourceToGroupMutation.getFragment('group')},
 * ${CancelPendingResourceToGroupMutation.getFragment('resource')},
 */
export default Relay.createContainer(PendingMember, {
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        ${ConnectResourceToGroupMutation.getFragment('group')},
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        ${ConnectResourceToGroupMutation.getFragment('resource')},
      }
    `,
  },
});

