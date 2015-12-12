import React from 'react';
import {Link} from 'react-router';

import classNames from 'classnames/bind';
import styles from './Menu.css';
let cx = classNames.bind(styles);

export default class Menu extends React.Component {
  render () {
    // insert svg for css filter (browser bug)
    var goo = require('!!raw-loader!../images/goo.svg');

    return (
      <div className={styles.menu}>
        <div dangerouslySetInnerHTML={{__html: goo}} />
        <div className={styles['menu-wrapper']}>
          <ul className={styles['menu-items']}>
            <li className={styles['menu-item']}>
              <button className={styles['menu-item-button']}>
                <i className={cx({
                  'menu-item-icon': true,
                  icon: true,
                  'icon-reply': true,
                })}>R</i>
              </button>
              <div className={styles['menu-item-bounce']}></div>
            </li>
            <li className={styles['menu-item']}>
              <button className={styles['menu-item-button']}>
                <i className={cx({
                  'menu-item-icon': true,
                  icon: true,
                  'icon-box': true,
                })}>B</i>
              </button>
              <div className={styles['menu-item-bounce']}></div>
            </li>
            <li className={styles['menu-item']}>
              <button className={styles['menu-item-button']}>
                <i className={cx({
                  'menu-item-icon': true,
                  icon: true,
                  'icon-trash': true,
                })}>T</i>
              </button>
              <div className={styles['menu-item-bounce']}></div>
            </li>
          </ul>
          <button className={styles['menu-toggle-button']} onClick={this.props.onShow} onTouchTap={this.props.onShow}>
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
