import React from 'react';
import Relay from 'react-relay';
import User from './User';

class App extends React.Component {
  render () {
    var {roles} = this.props;
    return <ol>
      {roles.map((role, i) => <li key={i}>
        <h2>{role.name}</h2>
        <ol>
          {role.users.edges.map((edge, ii) => <li key={ii}>
            <User user={edge.node} key={'11'}/>
          </li>)}
        </ol>
      </li>)}
    </ol>;
  }
}

export default Relay.createContainer(App, {
  fragments: {
    roles: () => Relay.QL`
      fragment on Role @relay(plural: true) {
        name,
        users(first: 10) {
          edges {
            node {
              ${User.getFragment('user')}
            }
          }
        }
      }
    `,
  },
});

