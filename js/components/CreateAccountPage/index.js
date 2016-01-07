import React from 'react';
import Relay from 'react-relay';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
  state = {
    open: true,
  };
  render () {
    const {master} = this.props;

    return <div>
      <ReactCSSTransitionGroup
        transitionName={'login'}
        transitionEnter={false}
        transitionLeave={false}
      >
        <h2 key={'title'}>Create Account</h2>
        <NewUserDialog master={master} open={this.state.open} />
      </ReactCSSTransitionGroup>
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
