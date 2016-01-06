import PendingUserToGroupMutation from './mutation';
import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';

class PendingUserToGroup extends React.Component {
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
  onComplete () {
    if (this.props.onComplete) {
      this.props.onComplete();
    }
  }
  handleConfirm = () => {
    const {user, group} = this.props;
    Relay.Store.update(
      new PendingUserToGroupMutation({
        user,
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


export default Relay.createContainer(PendingUserToGroup, {
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        users(first: 18) { edges { node { id } } },
        ${PendingUserToGroupMutation.getFragment('group')},
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
        groups(first: 18) { edges { node { id } } },
        ${PendingUserToGroupMutation.getFragment('user')},
      }
    `,
  },
});
