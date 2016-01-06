import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';
import RemoveResourceFromGroupMutation from './mutation';

class RemoveResourceFromGroup extends React.Component {
  static defaultProps = {
    label: 'Remove',
    primary: false,
    secondary: false,
  };
  handleRemove = () => {
    const {resource, group} = this.props;
    Relay.Store.update(
      new RemoveResourceFromGroupMutation({
        resource,
        group,
      })
    );
  }
  render () {
    return (
      <FlatButton
        resource={this.props.resource}
        group={this.props.group}
        label={this.props.label}
        primary={this.props.primary}
        secondary={this.props.secondary}
        onTouchTap={this.handleRemove}
      />
    );
  }
}

export default Relay.createContainer(RemoveResourceFromGroup, {
  initialVariables: {
    groupId: null,
  },
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        name,
        ${RemoveResourceFromGroupMutation.getFragment('group')},
      },
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        ${RemoveResourceFromGroupMutation.getFragment('resource')},
      }
    `,
  },
});


