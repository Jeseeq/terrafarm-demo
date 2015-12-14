import React from 'react';
// import {Link} from 'react-router';
import TweenMax from 'gsap';
import GSAP from 'react-gsap-enhancer';

import classNames from 'classnames/bind';
import styles from './Menu.css';
let cx = classNames.bind(styles);

TweenMax.globalTimeScale(0.8);

function createScaleDown ({target, options}) {
  return TweenMax.to(options.toggleIcon, 0.1, {
    scale: 0.65,
    onComplete: () => {
      console.log('complete - scale down')}
  });
}

function createScaleUp ({target, options}) {
  return TweenMax.to(options.toggleIcon, 0.1, {scale: 1});
}

function createRotateIcon ({target, options}) {
  return TweenMax.to(options.toggleIcon, 0.4, {
    rotation: options.on ? 45 : 0,
    ease: Quint.easeInOut,
    force3D: true,
  });
}

function createOpenBounce ({target, options}) {
  return new TimelineMax().staggerFromTo(options.bounce, 0.2, {
    transformOrigin: '50% 50%',
  }, {
    scaleX: 0.8,
    scaleY: 1.2,
    force3D: true,
    ease: Quad.easeInOut,
    onComplete: () => {
      TweenMax.staggerTo(options.bounce, 0.15, {
        // scaleX: 1.2,
        scaleY: 0.7,
        force3D: true,
        ease: Quad.easeInOut,
        onComplete: () => {
          TweenMax.staggerTo(options.bounce, 3, {
            // scaleX: 1,
            scaleY: 0.8,
            force3D: true,
            ease: Elastic.easeOut,
            easeParams:[1.1, 0.12],
          }, options.delay);
        },
      }, options.delay);
    },
  }, options.delay);
}

function createOpenButton ({target, options}) {
  return new TimelineMax().staggerTo(options.button, 0.5, {
    y: options.distance,
    force3D: true,
    ease: Quint.easeInOut,
  }, options.delay);
}

function createCloseBounce ({target, options}) {
  return new TimelineMax().staggerFromTo(options.bounce, 0.2, {
    transformOrigin: '50% 50%',
  }, {
    scaleX: 1,
    scaleY: 0.8,
    force3D: true,
    ease: Quad.easeInOut,
    onComplete: () => {
      TweenMax.staggerTo(options.bounce, 0.15, {
        // scaleX: 1.2,
        scaleY: 1.2,
        force3D: true,
        ease: Quad.easeInOut,
        onComplete: () => {
          TweenMax.staggerTo(options.bounce, 3, {
            // scaleX: 1,
            scaleY: 1,
            force3D: true,
            ease: Elastic.easeOut,
            easeParams: [1.1,0.12],
          }, options.delay);
        },
      }, options.delay);
    },
  }, options.delay);
}

function createCloseButton ({target, options}) {
  return new TimelineMax().staggerTo(options.button, 0.3, {
    y: 0,
    force3D: true,
    ease: Quint.easeIn,
  }, options.delay);
}

class Menu extends React.Component {
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
    console.log('add - scale down');
    this.addAnimation(createScaleDown, {toggleIcon: this['toggle-icon']});
    this._handlePress(event)
    event.preventDefault();
    event.stopPropagation();
  }
  _handleIconScaleUp = (event) => {
    this.addAnimation(createScaleUp, {toggleIcon: this['toggle-icon']});
  }
  _handlePress (event) {
    var on = !this.state.on;

    this.setState({on: on});
    this.addAnimation(createRotateIcon, {toggleIcon: this['toggle-icon'], on});

    on ? this._openMenu(event) : this._closeMenu(event);
  }
  _openMenu (event) {
    this.props.onShow(event);
    var menuBounce = this.state.menuItems.map((menuItem, i) => this['menu-item-bounce-'+i]);
    var menuButton = this.state.menuItems.map((menuItem, i) => this['menu-item-button-'+i]);
    var delay = 0.08;

    this.addAnimation(createOpenBounce, {
      bounce: menuBounce,
      delay: delay,
    });
    this.addAnimation(createOpenButton, {
      button: menuButton,
      delay: delay,
      distance: this.state.distance,
    });
  }
  _closeMenu (event) {
    this.props.onHide(event);
    var menuBounce = this.state.menuItems.map((menuItem, i) => this['menu-item-bounce-'+i]);
    var menuButton = this.state.menuItems.map((menuItem, i) => this['menu-item-button-'+i]);
    var delay = 0.08;

    this.addAnimation(createCloseBounce, {
      bounce: menuBounce,
      delay: delay,
    });
    this.addAnimation(createCloseButton, {
      button: menuButton,
      delay: delay,
      distance: this.state.distance,
    });
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

export default GSAP()(Menu);

/*

var menuItems = [
  'login',
  'profile',
  'browse',
].map((item, i) => <Link to={'/'+item} key={i}>{item.replace('-', ' ')}</Link>);
{menuItems}
<Logo
  onClick={this.props.onShow}
  onTouchTap={this.props.onShow}
/>

*/
