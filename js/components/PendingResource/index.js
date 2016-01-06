import RemovePendingResourceToGroup from '../../actions/RemovePendingResourceToGroup';
import AddResourceToGroup from '../../actions/AddResourceToGroup';
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
  render () {
    const {group, resource} = this.props;
    const user = resource.users.edges[0].node;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <RemovePendingResourceToGroup label={'Decline'} secondary onComplete={this.handleClose} />,
      <AddResourceToGroup primary onComplete={this.handleClose} />,
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
        ${RemovePendingResourceToGroup.getFragment('group')},
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
        ${RemovePendingResourceToGroup.getFragment('resource')},
      }
    `,
  },
});

