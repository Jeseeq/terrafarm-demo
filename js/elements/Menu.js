import React from 'react';
// import {Link} from 'react-router';
import GSAPLibrary from 'gsap';

import classNames from 'classnames/bind';
import styles from './Menu.css';
let cx = classNames.bind(styles);

TweenMax.globalTimeScale(0.8);

export default class Menu extends React.Component {
  constructor (props) {
    super(props);
    var angle = 120;
    var menuItems = ['login', 'profile', 'browse'];

    this.state = {
      angle: angle,
      menuItems: menuItems,
      distance: 90,
      startingAngle: 180 + (-angle / 2),
      slice: angle / (menuItems.length - 1),
      on: false,
    };
  }
  _handleScaleDown = (event) => {
    event.preventDefault();
    event.stopPropagation();

    var t = new TimelineMax();
    t.to(this['toggle-icon'], 0.1, {scale: 0.65});

    this._handlePress(event);
  }
  _handleIconScaleUp = (event) => {
    var t = new TimelineMax();
    t.to(this['toggle-icon'], 0.1, {scale: 1});

  }
  _handlePress (event) {
    var on = !this.state.on;
    var t = new TimelineMax();

    this.setState({on: on});

    t.to(this['toggle-icon'], 0.4, {
      rotation: on ? 45 : 0,
      ease: Quint.easeInOut,
      force3D: true,
    });

    on ? this._openMenu(event) : this._closeMenu(event);
  }
  _openMenu (event) {
    this.props.onShow(event);
    var menuButtons = this.state.menuItems.map((menuItem, i) => this['menu-item-button-'+i]);
    var menuBounces = this.state.menuItems.map((menuItem, i) => this['menu-item-bounce-'+i]);
    var delay = 0.08;
    var t1 = new TimelineMax();
    var t2 = new TimelineMax();

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
              easeParams:[1.1, 0.12],
            }, delay);
          },
        }, delay);
      },
    }, delay);
  }
  _closeMenu (event) {
    this.props.onHide(event);
    var menuBounces = this.state.menuItems.map((menuItem, i) => this['menu-item-bounce-'+i]);
    var menuButtons = this.state.menuItems.map((menuItem, i) => this['menu-item-button-'+i]);
    var delay = 0.08;
    var t1 = new TimelineMax();
    var t2 = new TimelineMax();

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
    var goo = require('!!raw-loader!../images/goo.svg'); // fixes css filter (All browsers bug)
    var menuItems = this.state.menuItems.map((item, i) => {
      var angle = this.state.startingAngle + (this.state.slice * i);
      return (
        <li
          key={i}
          ref={c => this['menu-item-'+i] = c}
          className={styles['menu-item']}
          style={{transform:'rotate('+(angle)+'deg)'}}
        >
          <button
            ref={c => this['menu-item-button-'+i] = c}
            className={styles['menu-item-button']}>
            <i
              className={cx({'menu-item-icon': true, icon: true })}
              style={{transform:'rotate('+(-angle)+'deg)'}}
            >
              {item}
            </i>
          </button>
          <div
            ref={c => this['menu-item-bounce-'+i] = c}
            className={styles['menu-item-bounce']}
          />
        </li>
      );
    });

    return (
      <div
        className={styles.menu}
        onMouseUp={this._handleIconScaleUp}
        onTouchEnd={this._handleIconScaleUp}
      >
        <div dangerouslySetInnerHTML={{__html: goo}} />
        <div className={styles['menu-wrapper']}>
          <ul className={styles['menu-items']}>
            {menuItems}
          </ul>
          <button
            ref={c => this['toggle-icon'] = c}
            className={styles['menu-toggle-button']}
            onMouseDown={this._handleScaleDown}
            onTouchStart={this._handleScaleDown}
          >
            <i className={cx({
              fa: true,
              'fa-plus': true,
              'menu-toggle-icon': true,
            })}>+</i>
          </button>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  loggedIn: React.PropTypes.bool,
};

