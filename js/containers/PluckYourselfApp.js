import React from 'react';
import Relay from 'react-relay';
import {Link, IndexLink} from 'react-router';
import Logo from '../components/Logo';
import Menu from '../components/Menu';
import typography from '../shared-styles/typography.css';
import styles from './PluckYourselfApp.css';

class PluckYourselfApp extends React.Component {
  render () {
    var {viewer} = this.props;
    var {user} = viewer;
    var loggedIn = user && user.name !== 'Guest';

    return <div>
      <div className={styles.main}>
        {this.props.children}
      </div>
      <div className={styles.appBar}>
        <Menu loggedIn={loggedIn} />
        <Logo />
      </div>
    </div>;
  }
}

export default Relay.createContainer(PluckYourselfApp, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
        user {
          id,
          name,
        },
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
      }
    `,
  },
});

