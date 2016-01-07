import React from 'react';
import {Link} from 'react-router';
import GoOctoface from 'react-icons/lib/go/octoface';
import MdMailOutline from 'react-icons/lib/md/mail-outline';

import styles from './styles.css';

export default class AboutPage extends React.Component {
  render () {
    const linkUrls = {
      github: 'https://github.com/rblakeley/terrafarm#readme',
      email: 'mailto:terrafarmapp@gmail.com',
      sources: {
        workforce: 'https://www.agclassroom.org/gan/timeline/farmers_land.htm',
      },
    };

    return <div className={styles.this}>
      <div className={styles.links}>
        <p style={{lineHeight: '37px'}}>
          <GoOctoface className={styles.icon} />
          <a href={linkUrls.github} className={styles.link}>Open source project</a>
        </p>
        <p style={{lineHeight: '37px'}}>
          <MdMailOutline className={styles.icon} />
          <a href={linkUrls.email} classNames={styles.link}>Email</a>
        </p>
      </div>
      <div className={styles.section}>
        <h4>Improving Food</h4>
        <h3>Problem</h3>
        <p>Intensive factory farming produces low-quality food and massive negative externalities. It is the human acitivty most responsible for:</p>
        <ul style={{fontSize: 14, margin: '15px 0', listStyle: 'initial'}}>
          <li>greenhouse gas emissions</li>
          <li>species extinction</li>
          <li>ocean dead zones</li>
          <li>water pollution</li>
          <li>habitat destruction</li>
          <li>antimicrobial drug-resistance</li>
          <li style={{listStyle: 'none', fontSize: 13}}><em>Source: ...</em></li>
        </ul>
        <p>Farming is a deeply human tradition that has been abstracted from every-day life over the past 225 years.</p>
        <ul style={{fontSize: 14, margin: '15px 0', listStyle: 'initial'}}>
          <li>1790 &mdash; 90% of the U.S. workforce were farmers.</li>
          <li>1890 &mdash; 43%</li>
          <li>1990 &mdash; 2<strong style={{margin: '0 0.08em'}}>.</strong>5%</li>
          <li style={{listStyle: 'none', fontSize: 13}}><em>Source: ...</em></li>
        </ul>
        <p>Farming is hard work. Up-front resource requirements are prohibitive for many people who are otherwise interested.</p>
        <h3>Opportunity</h3>
        <p>Increase contact between owners of latent resources and people interested in farming. Cultivate small-scale biodynamic farms close to home with thoughtful stewardship, manual labor, and natural ecologies.</p>
        <p>The benefits are:</p>
        <ul style={{fontSize: 14, margin: '15px 0', listStyle: 'initial'}}>
          <li>food that tastes better and is more nutritious</li>
          <li>connection with the natural world</li>
          <li>efficienct use of space, water, and waste</li>
        </ul>
        <h3>Get started</h3>
        <p><Link to={'create-account'}>Create an account</Link> and post resources: equipment, labor, materials, seeds, and compost. Post a location for a Group: yard, lot, indoor, and rooftop.</p>
      </div>
    </div>;
  }
}

/*
import FaTwitter from 'react-icons/lib/fa/twitter';
import FaRedditAlien from 'react-icons/lib/fa/reddit-alien';
import CROWDFUNDING_ICON from 'react-icons/lib/...'

twitter: 'https://twitter.com/terrafarmapp',
crowdfunding: '',
reddit: '',

<p style={{lineHeight: '37px'}}>
  <FaTwitter className={styles.icon} />
  <a href={linkUrls.twitter} className={styles.link}>Twitter</a>
</p>
<p style={{lineHeight: '37px'}}>
  <CROWDFUNDING_ICON className={styles.icon} />
  <a href={linkUrls.crowdfunding} className={styles.link}>Crowdfunding</a>
</p>
<p style={{lineHeight: '37px'}}>
  <FaRedditAlien className={styles.icon} />
  <a href={linkUrls.reddit} className={styles.link}>Reddit</a>
</p>
*/

