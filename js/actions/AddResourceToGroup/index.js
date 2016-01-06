import AddResourceToGroupMutation from './mutation';
import RemovePendingResourceToGroupMutation from '../RemovePendingResourceToGroup/mutation';
import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';

class AddResourceToGroup extends React.Component {
  static propTypes = {
    label: React.PropTypes.string,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
  };
  static defaultProps = {
    label: 'Approve',
    primary: false,
    secondary: false,
  };
  onComplete = () => {
    if (this.props.onComplete) {
      this.props.onComplete();
    }
  }
  handleApprove = () => {
    const {resource, group} = this.props;
    Relay.Store.update(
      new AddResourceToGroupMutation({
        resource,
        group,
      })
    );
    Relay.Store.update(
      new RemovePendingResourceToGroupMutation({
        resource,
        group,
      })
    );

    this.onComplete();
  }
  render () {
    return <FlatButton
      label={this.props.label}
      primary={this.props.primary}
      secondary={this.props.secondary}
      disabled={this.props.disabled}
      onTouchTap={this.handleApprove}
    />;
  }
}


export default Relay.createContainer(AddResourceToGroup, {
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        ${AddResourceToGroupMutation.getFragment('group')},
        ${RemovePendingResourceToGroupMutation.getFragment('group')},
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        ${AddResourceToGroupMutation.getFragment('resource')},
        ${RemovePendingResourceToGroupMutation.getFragment('resource')},
      }
    `,
  },
});
