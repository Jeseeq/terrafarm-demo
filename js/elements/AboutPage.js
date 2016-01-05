import React from 'react';
import GoOctoface from 'react-icons/lib/go/octoface';
import FaRedditAlien from 'react-icons/lib/fa/reddit-alien';
import FaTwitter from 'react-icons/lib/fa/twitter';
import MdMailOutline from 'react-icons/lib/md/mail-outline';

import styles from './AboutPage.css';

export default class AboutPage extends React.Component {
  render () {
    const linkUrls = {
      github: 'http://rblakeley.github.io/terrafarm',
      // crowdfunding: '',
      twitter: 'https://twitter.com/terrafarmapp',
      reddit: '',
      email: 'mailto:terrafarmapp@gmail.com',
    };

    return <div className={styles.this}>
      <div className={styles.links}>
        <p style={{lineHeight: '37px'}}>
          <GoOctoface className={styles.icon} />
          <a href={linkUrls.github} className={styles.link}>Open source project</a>
        </p>
        <p style={{lineHeight: '37px'}}>
          <FaRedditAlien className={styles.icon} />
          <a href={linkUrls.reddit} className={styles.link}>Reddit</a>
        </p>
        <p style={{lineHeight: '37px'}}>
          <FaTwitter className={styles.icon} />
          <a href={linkUrls.twitter} className={styles.link}>Twitter</a>
        </p>
        <p style={{lineHeight: '37px'}}>
          <MdMailOutline className={styles.icon} />
          <a href={linkUrls.email} classNames={styles.link}>Email</a>
        </p>
      </div>
      <div className={styles.section}>
        <h4>Improving Food</h4>
        <h3>Problem</h3>
        <p>Intensive factory farming and industrial agriculture produce low-quality food and massive negative externalities. They are the human activities most responsible for greenhouse gas emissions, species extinction, ocean dead zones, water pollution, and habitat destruction [source]. Antimicrobial drug resistance is also largely attributed to intensive animal agriculture [source].</p>
        <h3>Research</h3>
        <p>Pre-industrial farming was small-scale and depended on thoughtful stewardship, manual labor, and natural ecologies. Small-scale biodynamic farming promotes flavorful and nutritious food, improves our connection to the natural world, and has higher efficiencies on space, water-use, nutrient recycling, and calorie conversion [source].</p>
        <h3>Question</h3>
        <p>How would we accelerate a shift from reliance on industrial agriculture to small-scale distributed farming?</p>
        <h3>Hypothesis</h3>
        <p>There are untapped opportunities to connect willing people and latent resources for small-scale farming projects. Increasing contact between resource owners and people interested in farming will create mutual wealth and healthier communities.</p>
      </div>
    </div>;
  }
}


