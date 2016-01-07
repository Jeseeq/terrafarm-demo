import React from 'react';
import Relay from 'react-relay';
import NewUserDialog from '../NewUserDialog';

class CreateAccountPage extends React.Component {
  static propTypes = {
    masterId: React.PropTypes.number,
  };
  static defaultProps = {
    params: {
      masterId: 1,
    },
  };
  render () {
    const {master} = this.props;

    return <div>
      <NewUserDialog master={master} open />
    </div>;
  }
}

export default Relay.createContainer(CreateAccountPage, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        ${NewUserDialog.getFragment('master')},
      }
    `,
  },
});
