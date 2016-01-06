import PendingResourceToGroupMutation from './mutation';
import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';

class PendingResourceToGroup extends React.Component {
  static propTypes = {
    label: React.PropTypes.string,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
    onComplete: React.PropTypes.func,
  };
  static defaultProps = {
    label: 'Confirm',
    primary: false,
    secondary: false,
  };
  onComplete = () => {
    if (this.props.onComplete) {
      this.props.onComplete();
    }
  }
  handleConfirm = () => {
    const {resource, group} = this.props;
    Relay.Store.update(
      new PendingResourceToGroupMutation({
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
      onTouchTap={this.handleConfirm}
    />;
  }
}


export default Relay.createContainer(PendingResourceToGroup, {
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        ${PendingResourceToGroupMutation.getFragment('group')},
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        ${PendingResourceToGroupMutation.getFragment('resource')},
      }
    `,
  },
});

