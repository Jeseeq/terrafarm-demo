import PendingResourceToGroup from '../../actions/PendingResourceToGroup';
import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import FormsySelect from 'formsy-material-ui/lib/FormsySelect';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import MenuItem from 'material-ui/lib/menus/menu-item';

class NewResourceOffer extends React.Component {
  state = {
    open: false,
    attributes: {
      resourceIndex: -1,
    },
    canSubmit: false,
  };
  handleOpen = () => {
    this.setState({open: true});
  }
  handleClose = () => {
    this.setState({open: false});
  }
  handleValid = () => {
    this.setState({
      canSubmit: true,
    });
  }
  handleInvalid = () => {
    this.setState({canSubmit: false});
  }
  handleChange = (currentValues, isChanged) => {
    if (isChanged) {
      this.setState({
        attributes: {
          resourceIndex: currentValues.resourceIndex,
        },
      });
    }
  }
  render () {
    const {group, user} = this.props;

    let resource = null;
    if (this.state.attributes.resourceIndex >= 0) {
      resource = user.resources.edges[this.state.attributes.resourceIndex].node;
    }

    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <PendingResourceToGroup
        group={group}
        resource={resource}
        primary
        onComplete={this.handleClose}
        disabled={!this.state.canSubmit}
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
        <Formsy.Form
          ref={'form'}
          onChange={this.handleChange}
          onValid={this.handleValid}
          onInvalid={this.handleInvalid}
        >
          <FormsySelect
            name={'resourceIndex'}
            required
          >
            {menuItems}
          </FormsySelect>
        </Formsy.Form>
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
        ${PendingResourceToGroup.getFragment('group')},
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
              ${PendingResourceToGroup.getFragment('resource')},
            }
          }
        },
      }
    `,
  },
});
