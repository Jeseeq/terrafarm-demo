import React from 'react';
import {Link} from 'react-router';
import 'gsap'; /* global TweenMax TimelineMax Quint Quad Elastic*/
import TiPlus from 'react-icons/lib/ti/plus';
import TiHome from 'react-icons/lib/ti/home';
import FaUser from 'react-icons/lib/fa/user';
import MdSearch from 'react-icons/lib/md/search';

import styles from './styles.css';

const ENTER_KEY_CODE = 13;
// const ESC_KEY_CODE = 27;

TweenMax.globalTimeScale(0.8);

export default class MainMenu extends React.Component {
  constructor (props) {
    super(props);
    const angle = 120;
    const menuItems = [
      { path: '', icon: <TiHome /> },
      { path: 'profile', icon: <FaUser /> },
      { path: 'browse', icon: <MdSearch /> },
    ];

    this.state = {
      angle: angle,
      menuItems: menuItems,
      distance: 90,
      startingAngle: 180 + (-angle / 2),
      slice: angle / (menuItems.length - 1),
      on: false,
    };
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.shouldClose && this.state.on) {
      this.handlePress();
    }
  }
  handleScaleDown = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const t = new TimelineMax();
    t.to(this['toggle-icon'], 0.1, {scale: 0.65});

    this.handlePress();
  }
  handleIconScaleUp = () => {
    const t = new TimelineMax();
    t.to(this['toggle-icon'], 0.1, {scale: 1});
  }
  handlePress = () => {
    const on = !this.state.on;
    const t = new TimelineMax();

    this.setState({on: on});

    t.to(this['toggle-icon'], 0.4, {
      rotation: on ? 45 : 0,
      ease: Quint.easeInOut,
      force3D: true,
    });

    on ? this.openMenu() : this.closeMenu();
  }
  handleKeyDown = (event) => {
    if (event.keyCode === ENTER_KEY_CODE) {
      this.handlePress();
    }
  }
  openMenu () {
    this.props.onShow();
    const menuButtons = this.state.menuItems.map((menuItem, i) => this['menu-item-button-' + i]);
    const menuBounces = this.state.menuItems.map((menuItem, i) => this['menu-item-bounce-' + i]);
    const delay = 0.08;
    const t1 = new TimelineMax();
    const t2 = new TimelineMax();

    t1.staggerTo(menuButtons, 0.5, {
      y: this.state.distance,
      force3D: true,
      ease: Quint.easeInOut,
    }, delay);

    t2.staggerFromTo(menuBounces, 0.2, {
      transformOrigin: '50% 50%',
    }, {
      scaleX: 0.8,
      scaleY: 1.2,
      force3D: true,
      ease: Quad.easeInOut,
      onComplete: () => {
        TweenMax.staggerTo(menuBounces, 0.15, {
          // scaleX: 1.2,
          scaleY: 0.7,
          force3D: true,
          ease: Quad.easeInOut,
          onComplete: () => {
            TweenMax.staggerTo(menuBounces, 3, {
              // scaleX: 1,
              scaleY: 0.8,
              force3D: true,
              ease: Elastic.easeOut,
              easeParams: [1.1, 0.12],
            }, delay);
          },
        }, delay);
      },
    }, delay);
  }
  closeMenu () {
    this.props.onHide();
    const menuBounces = this.state.menuItems.map((menuItem, i) => this['menu-item-bounce-' + i]);
    const menuButtons = this.state.menuItems.map((menuItem, i) => this['menu-item-button-' + i]);
    const delay = 0.08;
    const t1 = new TimelineMax();
    const t2 = new TimelineMax();

    t1.staggerTo(menuButtons, 0.3, {
      y: 0,
      force3D: true,
      ease: Quint.easeIn,
    }, delay);

    t2.staggerFromTo(menuBounces, 0.2, {
      transformOrigin: '50% 50%',
    }, {
      scaleX: 1,
      scaleY: 0.8,
      force3D: true,
      ease: Quad.easeInOut,
      onComplete: () => {
        TweenMax.staggerTo(menuBounces, 0.15, {
          // scaleX: 1.2,
          scaleY: 1.2,
          force3D: true,
          ease: Quad.easeInOut,
          onComplete: () => {
            TweenMax.staggerTo(menuBounces, 3, {
              // scaleX: 1,
              scaleY: 1,
              force3D: true,
              ease: Elastic.easeOut,
              easeParams: [1.1, 0.12],
            }, delay);
          },
        }, delay);
      },
    }, delay);
  }
  render () {
    const goo = require('!!raw-loader!./goo.svg'); // fixes css filter (All browsers bug)
    const menuItems = this.state.menuItems.map((item, i) => {
      const angle = this.state.startingAngle + (this.state.slice * i);
      return (
        <li
          key={i}
          ref={c => this['menu-item-' + i] = c}
          className={styles['menu-item']}
          style={{transform: 'rotate(' + (angle) + 'deg)'}}
        >
          <Link to={'/' + item.path}>
            <button
              ref={c => this['menu-item-button-' + i] = c}
              className={styles['menu-item-button']}
              onMouseUp={this.handlePress}
              onTouchEnd={this.handlePress}
            >
              <div
                className={styles['menu-item-icon']}
                style={{transform: 'rotate(' + (-angle) + 'deg)'}}
              >
                {item.icon}
              </div>
            </button>
          </Link>
          <div
            ref={c => this['menu-item-bounce-' + i] = c}
            className={styles['menu-item-bounce']}
          />
        </li>
      );
    });

    return (
      <div
        className={styles.menu}
        onMouseUp={this.handleIconScaleUp}
        onTouchEnd={this.handleIconScaleUp}
        onMouseLeave={this.handleIconScaleUp}
      >
        <div dangerouslySetInnerHTML={{__html: goo}} />
        <div className={styles['menu-wrapper']}>
          <ul className={styles['menu-items']}>
            {menuItems}
          </ul>
          <button
            ref={c => this['toggle-icon'] = c}
            className={styles['menu-toggle-button']}
            onMouseDown={this.handleScaleDown}
            onTouchStart={this.handleScaleDown}
            onKeyDown={this.handleKeyDown}
            tabIndex={1}
          >
            <div className={styles['menu-toggle-icon']}><TiPlus /></div>
          </button>
        </div>
      </div>
    );
  }
}

MainMenu.propTypes = {
  forceClose: React.PropTypes.bool,
  onShow: React.PropTypes.func,
  onHide: React.PropTypes.func,
};

