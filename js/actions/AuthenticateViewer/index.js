import AuthenticateViewerMutation from './mutation';
import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';

class AuthenticateViewer extends React.Component {
  static defaultProps = {
    label: 'Login',
    primary: false,
    secondary: false,
  };
  handleConfirm = () => {
    const {viewer, user} = this.props;
    Relay.Store.update(
      new AuthenticateViewerMutation({
        viewer: viewer,
        user: user,
      })
    );
  }
  render () {
    return (
      <FlatButton
        label={this.props.label}
        primary={this.props.primary}
        secondary={this.props.secondary}
        onTouchTap={this.handleConfirm}
      />
    );
  }
}

export default Relay.createContainer(AuthenticateViewer, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
        ${AuthenticateViewerMutation.getFragment('viewer')},
      },
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
        ${AuthenticateViewerMutation.getFragment('user')},
      }
    `,
  },
});

