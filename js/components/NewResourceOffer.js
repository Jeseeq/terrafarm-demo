import PendingResourceToGroupMutation from '../mutations/PendingResourceToGroupMutation';
import React from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import DropDownMenu from 'material-ui/lib/drop-down-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

class NewResourceOffer extends React.Component {
  state = {
    open: false,
    resourceIndex: 0,
  };
  handleOpen = () => {
    this.setState({open: true});
  }
  handleClose = () => {
    this.setState({open: false});
  }
  handleChange = (e, index, value) => this.setState({resourceIndex: value});
  handleSave = () => {
    const {user, group} = this.props;
    const resource = user.resources.edges[this.state.resourceIndex].node;
    console.log('resource -', resource);
    Relay.Store.update(
      new PendingResourceToGroupMutation({
        group,
        resource,
      })
    );
    this.handleClose();
  }
  render () {
    const {user} = this.props;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={'Offer'}
        primary
        onTouchTap={this.handleSave}
      />,
    ];
    const menuItems = user.resources.edges.map((edge, index) => {
      return <MenuItem key={edge.node.id} value={index} primaryText={edge.node.name} />;
    });

    return <div style={{display: 'inline-block', margin: '10px 0 15px 10px'}}>
      <RaisedButton label={'Offer Resource'} onTouchTap={this.handleOpen} />
      <Dialog
        title={'New Resource Offer'}
        actions={actions}
        onRequestClose={null}
        open={this.state.open}
      >
        <DropDownMenu
          ref={'resource'}
          value={this.state.resourceIndex}
          onChange={this.handleChange}
        >
          {menuItems}
        </DropDownMenu>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(NewResourceOffer, {
  initialVariables: {
    groupId: null,
  },
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        ${PendingResourceToGroupMutation.getFragment('group')},
      },
    `,
    user: () => Relay.QL`
      fragment on User {
        name,
        resources(first: 18) {
          edges {
            node {
              id,
              name,
              ${PendingResourceToGroupMutation.getFragment('resource')},
            }
          }
        },
      }
    `,
  },
});
