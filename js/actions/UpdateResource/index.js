import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';
import UpdateResourceMutation from './mutation';

class UpdateResource extends React.Component {
  static propTypes = {
    label: React.PropTypes.string,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
    onComplete: React.PropTypes.func,
  };
  static defaultProps = {
    label: 'Save',
    primary: false,
    secondary: false,
  };
  handleSave = () => {
    const {resource, name, description, category} = this.props;
    Relay.Store.update(
      new UpdateResourceMutation({
        resource,
        attributes: {
          name,
          description,
          category,
        },
      })
    );
    this.handleComplete();
  }
  handleComplete = () => {
    if (this.props.onComplete) {
      this.props.onComplete();
    }
  }
  render () {
    return (
      <FlatButton
        label={this.props.label}
        primary={this.props.primary}
        secondary={this.props.secondary}
        onTouchTap={this.handleSave}
      />
    );
  }
}

export default Relay.createContainer(UpdateResource, {
  fragments: {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        ${UpdateResourceMutation.getFragment('resource')},
      }
    `,
  },
});
