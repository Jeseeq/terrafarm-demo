import React from 'react';
// import {Link} from 'react-router';
import Lorem from 'react-lorem-component';

// import classNames from 'classnames/bind';
import styles from './AboutPage.css';
// const cx = classNames.bind(styles);

export default class AboutPage extends React.Component {
  render () {
    return <div className={styles.this}>
      <h1 className={styles.title}>About</h1>
      <div className={styles.description}>
        <p>This is the description</p>
      </div>
    </div>;
  }
}


