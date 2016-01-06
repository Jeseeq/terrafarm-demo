import UpdateGroupMutation from './mutation';
import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';

class UpdateGroup extends React.Component {
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
    const {group, name, description, category} = this.props;

    Relay.Store.update(
      new UpdateGroupMutation({
        group,
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
        label={'Save'}
        primary={this.props.primary}
        secondary={this.props.secondary}
        onTouchTap={this.handleSave}
      />
    );
  }
}

export default Relay.createContainer(UpdateGroup, {
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        ${UpdateGroupMutation.getFragment('group')},
      }
    `,
  },
});


