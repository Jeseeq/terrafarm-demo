import React from 'react';

// import classNames from 'classnames/bind';
import styles from './AboutPage.css';
// const cx = classNames.bind(styles);

export default class AboutPage extends React.Component {
  render () {
    const linkUrls = {
      github: 'http://rblakeley.github.io/terrafarm',
      crowdfunding: '',
      twitter: 'https://twitter.com/terrafarmapp',
      reddit: '',
      email: 'mailto:terrafarmapp@gmail.com',
    };

    return <div className={styles.this}>
      <h2>About</h2>
      <h4>Improving Food</h4>
      <h3>Problem</h3>
      <p>Intensive factory farming and industrial agriculture produce low-quality food and massive negative externalities. They are the human activities most responsible for greenhouse gas emissions, species extinction, ocean dead zones, water pollution, and habitat destruction [source]. Antimicrobial drug resistance is also largely attributed to intensive animal agriculture [source].</p>
      <h3>Research</h3>
      <p>Pre-industrial farming was small-scale and depended on thoughtful stewardship, manual labor, and natural ecologies. Small-scale biodynamic farming promotes flavorful and nutritious food, improves our connection to the natural world, and has higher efficiencies on space, water-use, nutrient recycling, and calorie conversion [source].</p>
      <h3>Question</h3>
      <p>How would we accelerate a shift from reliance on industrial agriculture to small-scale distributed farming?</p>
      <h3>Hypothesis</h3>
      <p>There are untapped opportunities to connect willing people and latent resources for small-scale farming projects. Increasing contact between resource owners and people interested in farming will create mutual wealth and healthier communities.</p>
      <h3>Links</h3>
      <p><a href={linkUrls.github} className={styles.link}>Open source project</a></p>
      <p><a href={linkUrls.crowdfunding}>Crowdfunding</a></p>
      <p><a href={linkUrls.reddit} className={styles.link}>Reddit</a></p>
      <p><a href={linkUrls.twitter} className={styles.link}>Twitter</a></p>
      <p><a href={linkUrls.email} classNames={styles.link}>Email</a></p>
    </div>;
  }
}


