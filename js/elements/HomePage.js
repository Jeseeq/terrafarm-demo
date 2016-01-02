import React from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';
import Colors from 'material-ui/lib/styles/colors';

// import classNames from 'classnames/bind';
import styles from './HomePage.css';
// const cx = classNames.bind(styles);

export default class HomePage extends React.Component {
  render () {
    return <div className={styles.this} >
      <h1 className={styles.title}>Terrafarm</h1>
      <div className={styles.tagline} >
        <span>Cultivate good food close to home.</span>
      </div>
      <Link to={'login'} className={styles.link} >
        <RaisedButton secondary label={'Login'} />
      </Link>
      <Link to={'about'} className={styles.link} >
        <RaisedButton label={'About'} />
      </Link>
      <p className={styles.warning} style={{color: Colors.deepOrange300}}>Pre-release</p>
    </div>;
  }
}

