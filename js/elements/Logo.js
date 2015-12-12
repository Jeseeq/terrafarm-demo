import React from 'react';

import styles from './Logo.css';

export default class Logo extends React.Component {
  render () {
    var {onClick, onTouchTap} = this.props;

    return <div className={styles.this} onClick={onClick} onTouchTap={onTouchTap}>
      <h1>Show menu</h1>
    </div>;
  }
}

Logo.propTypes = {
  onClick: React.PropTypes.func,
  onTouchTap: React.PropTypes.func,
};

