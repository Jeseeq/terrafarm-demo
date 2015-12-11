import React from 'react';
import Relay from 'react-relay';
import {Link, IndexLink} from 'react-router';
import Menu from '../elements/Menu';
import Logo from '../elements/Logo';

import classNames from 'classnames/bind';
import typography from '../shared-styles/typography.css';
import styles from './TerrafarmApp.css';

let cx = classNames.bind(styles);

class TerrafarmApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      docScroll: 0,
      contentScroll: 0,
      modalview: false,
      animate: false,
      transform: false,
    };
  }
  _scrollY () {
    return window.pageYOffset || window.document.documentElement.scrollTop;
  }
  _handleShowMenu = (event) => {
    event.stopPropagation();
    event.preventDefault();

    document.body.scrollTop = document.documentElement.scrollTop = 0;
    let scrollY = this._scrollY();

    this.setState({
      docScroll: scrollY,
      contentScroll: scrollY * -1,
      modalview: true,
    });
    setTimeout(() => {
      this.setState({
        animate: true,
      });
    }, 25);
  }
  _handleHideMenu = (event) => {
    let {transEndEventNames} = this.props;
    let {perspectiveWrapper, container, contentWrapper} = this.refs;

    this.setState({transform: true});
    if (this.state.animate) {
      let onEndTransFn = (event) => {
        if (event.target !== container || event.propertyName.indexOf('transform') === -1) return;

        for (let i = 0; i < transEndEventNames.length; i += 1) {
          perspectiveWrapper.removeEventListener(transEndEventNames[i], onEndTransFn);
        }

        this.setState({
          contentScroll: 0,
          modalview: false,
          transform: false,
        });
        // mac chrome issue
        document.body.scrollTop = document.documentElement.scrollTop = this.state.docScroll;
      };

      for (let i = 0; i < transEndEventNames.length; i += 1) {
        perspectiveWrapper.addEventListener(transEndEventNames[i], onEndTransFn);
      }

      this.setState({animate: false});
    }
  }
  _handleFalseTap = () => {
    return false;
  }
  render () {
    var {viewer} = this.props;
    var {user} = viewer;
    var loggedIn = user && user.name !== 'Guest';
    var perspectiveClass = cx({
      perspective: true,
      'effect-movedown': true,
      modalview: this.state.modalview,
      animate: this.state.animate,
    });
    var containerClass = cx({
      container: true,
      transform: this.state.transform,
    });

    return (
      <div
        ref='perspectiveWrapper'
        className={perspectiveClass}
        onClick={this._handleFalseTap}
        onTouchTap={this._handleFalseTap}
      >
        <div
          ref='container'
          className={containerClass}
          onClick={this._handleHideMenu}
          onTouchTap={this._handleHideMenu}
        >
          <div
            ref='contentWrapper'
            className={cx({wrapper: true})}
            style={{top: this.state.contentScroll}}
          >
            <Logo
              onClick={this._handleShowMenu}
              onTouchTap={this._handleShowMenu}
            />
            {this.props.children}
          </div>
        </div>
        <nav
          className={cx({'outer-nav': true})}
          onClick={this._handleHideMenu}
          onTouchTap={this._handleHideMenu}
        >
          <Menu loggedIn={loggedIn} />
        </nav>
      </div>
    );
  }
}

TerrafarmApp.defaultProps = {
  transEndEventNames: [
    'webkitTransitionEnd',
    'transitionend',
    'oTransitionEnd',
    'MSTransitionEnd',
    'transitionend'
  ],
}

export default Relay.createContainer(TerrafarmApp, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
        user {
          id,
          name,
        },
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
      }
    `,
  },
});
