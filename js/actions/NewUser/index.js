import NewUserMutation from './mutation';
import React from 'react';
import Relay from 'react-relay';
import RaisedButton from 'material-ui/lib/raised-button';

class NewUser extends React.Component {
  static propTypes = {
    onComplete: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
    attributes: React.PropTypes.shape({
      name: React.PropTypes.string,
    }),
  };
  static defaultProps = {
    label: 'Create',
    disabled: true,
    primary: false,
    secondary: false,
  };
  onComplete = () => {
    if (this.props.onComplete) {
      this.props.onComplete();
    }
  }
  handleSubmit = () => {
    if (this.props.disabled) {
      console.warn('New user is not ready');
      return;
    }

    const {master, attributes} = this.props;
    const {name} = attributes;

    Relay.Store.update(
      new NewUserMutation({
        master,
        name,
      })
    );

    this.onComplete();
  }
  render () {
    return (
      <RaisedButton
        label={this.props.label}
        disabled={this.props.disabled}
        primary={this.props.primary}
        secondary={this.props.secondary}
        onTouchTap={this.handleSubmit}
      />
    );
  }
}

export default Relay.createContainer(NewUser, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        id,
        ${NewUserMutation.getFragment('master')},
      },
    `,
  },
});

