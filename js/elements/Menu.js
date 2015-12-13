import React from 'react';
// import {Link} from 'react-router';
import TweenMax from 'gsap';
import GSAP from 'react-gsap-enhancer';

import classNames from 'classnames/bind';
import styles from './Menu.css';
let cx = classNames.bind(styles);

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
  componentWillMount () {
    /*
    this.addAnimation(({target, options}) => {
      return TweenMax.globalTimeScale(0.8);
    });
    */
  }
  _handleIconScaleDown = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.addAnimation(({target, options}) => {
      return TweenMax.to(options.toggleIcon, 0.1, {scale: 0.65});
    }, {toggleIcon: this['toggle-icon']});
  }
  _handleIconScaleUp = (event) => {
    this.addAnimation(({target, options}) => {
      return TweenMax.to(options.toggleIcon, 0.1, {scale: 1,});
    }, {toggleIcon: this['toggle-icon']});

    this._handlePress(event);
  }
  _handlePress (event) {
    var on = !this.state.on;

    this.setState({on: on});
    this.addAnimation(({target, options}) => {
      return TweenMax.to(options.toggleIcon, 0.4, {
        rotation: on ? 45 : 0,
        ease: Quint.easeInOut,
        force3D: true,
      });
    }, {toggleIcon: this['toggle-icon']});

    on ? this._openMenu(event) : this._closeMenu(event);
  }
  _openMenu (event) {
    this.props.onShow(event);

    var menuItems = this.state.menuItems.map((menuItem, i) => this['menu-item-'+i]);

    menuItems.map((menuItem, i) => {
      var delay = i * 0.08;

      this.addAnimation(({target, options}) => {
        return TweenMax.fromTo(options.bounce, 0.2, {
          transformOrigin: '50% 50%'
        }, {
          delay: options.delay,
          scaleX: 0.8,
          scaleY: 1.2,
          force3D: true,
          ease: Quad.easeInOut,
          onComplete: () => {
            TweenMax.to(options.bounce, 0.15, {
              // scaleX: 1.2,
              scaleY: 0.7,
              force3D: true,
              ease: Quad.easeInOut,
              onComplete: () => {
                TweenMax.to(options.bounce, 3, {
                  // scaleX: 1,
                  scaleY: 0.8,
                  force3D: true,
                  ease: Elastic.easeOut,
                  easeParams: [1.1,0.12],
                })
              },
            })
          },
        });
      }, {bounce: this['menu-item-bounce-'+i], delay: delay});

      this.addAnimation(({target, options}) => {
        return TweenMax.to(options.button, 0.5, {
          delay: options.delay,
          y: options.distance,
          force3D: true,
          ease: Quint.easeInOut,
        });
      }, {button: this['menu-item-button-'+i], delay: delay, distance: this.state.distance});

    });
  }
  // todo
  _closeMenu () {
    console.log('close menu');
    var menuItems = this.state.menuItems.map((menuItem, i) => this['menu-item-'+i]);

    menuItems.map((menuItem, i) => {
      var delay= i * 0.08;

      this.addAnimation(({target, options}) => {
        return TweenMax.fromTo(options.bounce, 0.2, {
          transformOrigin: '50% 50%',
        }, {
          delay: options.delay,
          scaleX: 1,
          scaleY: 0.8,
          force3D: true,
          ease: Quad.easeInOut,
          onComplete: () => {
            TweenMax.to(options.bounce, 0.15, {
              // scaleX: 1.2,
              scaleY: 1.2,
              force3D: true,
              ease: Quad.easeInOut,
              onComplete: () => {
                TweenMax.to(options.bounce, 3, {
                  // scaleX: 1,
                  scaleY: 1,
                  force3D: true,
                  ease: Elastic.easeOut,
                  easeParams: [1.1,0.12],
                })
              },
            })
          },
        });
      }, {bounce: this['menu-item-bounce-'+i], delay: delay});


      this.addAnimation(({target, options}) => {
        return TweenMax.to(options.button, 0.3, {
          delay: options.delay,
          y: 0,
          force3D: true,
          ease: Quint.easeIn,
        });
      }, {button: this['menu-item-button-'+i], delay: delay});
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
            onMouseDown={this._handleIconScaleDown}
            onTouchStart={this._handleIconScaleDown}
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

$(document).ready(function(){
  var menuItemNum=$('.menu-item').length;
  var angle=120;
  var distance=90;
  var startingAngle=180+(-angle/2);
  var slice=angle/(menuItemNum-1);
  TweenMax.globalTimeScale(0.8);
  $('.menu-item').each(function(i){
    var angle=startingAngle+(slice*i);
    $(this).css({
      transform:'rotate('+(angle)+'deg)'
    })
    $(this).find('.menu-item-icon').css({
      transform:'rotate('+(-angle)+'deg)'
    })
  })
  var on=false;

  $('.menu-toggle-button').mousedown(function(){
    TweenMax.to($('.menu-toggle-icon'),0.1,{
      scale:0.65
    })
  })
  $(document).mouseup(function(){
    TweenMax.to($('.menu-toggle-icon'),0.1,{
      scale:1
    })
  });
  $(document).on('touchend',function(){
    $(document).trigger('mouseup')
  })
  $('.menu-toggle-button').on('mousedown',pressHandler);
  $('.menu-toggle-button').on('touchstart',function(event){
    $(this).trigger('mousedown');
    event.preventDefault();
    event.stopPropagation();
  });

  function pressHandler(event){
    on=!on;

    TweenMax.to($(this).children('.menu-toggle-icon'),0.4,{
      rotation:on?45:0,
      ease:Quint.easeInOut,
      force3D:true
    });

    on?openMenu():closeMenu();
    
  }
  function openMenu(){
    $('.menu-item').each(function(i){
      var delay=i*0.08;

      var $bounce=$(this).children('.menu-item-bounce');

      TweenMax.fromTo($bounce,0.2,{
        transformOrigin:'50% 50%'
      },{
        delay:delay,
        scaleX:0.8,
        scaleY:1.2,
        force3D:true,
        ease:Quad.easeInOut,
        onComplete:function(){
          TweenMax.to($bounce,0.15,{
            // scaleX:1.2,
            scaleY:0.7,
            force3D:true,
            ease:Quad.easeInOut,
            onComplete:function(){
              TweenMax.to($bounce,3,{
                // scaleX:1,
                scaleY:0.8,
                force3D:true,
                ease:Elastic.easeOut,
                easeParams:[1.1,0.12]
              })
            }
          })
        }
      });

      TweenMax.to($(this).children('.menu-item-button'),0.5,{
        delay:delay,
        y:distance,
        force3D:true,
        ease:Quint.easeInOut
      });
    })
  }
  function closeMenu(){
    $('.menu-item').each(function(i){
      var delay=i*0.08;

      var $bounce=$(this).children('.menu-item-bounce');

      TweenMax.fromTo($bounce,0.2,{
        transformOrigin:'50% 50%'
      },{
        delay:delay,
        scaleX:1,
        scaleY:0.8,
        force3D:true,
        ease:Quad.easeInOut,
        onComplete:function(){
          TweenMax.to($bounce,0.15,{
            // scaleX:1.2,
            scaleY:1.2,
            force3D:true,
            ease:Quad.easeInOut,
            onComplete:function(){
              TweenMax.to($bounce,3,{
                // scaleX:1,
                scaleY:1,
                force3D:true,
                ease:Elastic.easeOut,
                easeParams:[1.1,0.12]
              })
            }
          })
        }
      });


      TweenMax.to($(this).children('.menu-item-button'),0.3,{
        delay:delay,
        y:0,
        force3D:true,
        ease:Quint.easeIn
      });
    })
  }
})


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
