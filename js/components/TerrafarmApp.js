import React from 'react';
import Relay from 'react-relay';
import injectTapEventPlugin from 'react-tap-event-plugin';
import classNames from 'classnames/bind';
import {Link, IndexLink} from 'react-router';
import Menu from '../elements/Menu';
import Logo from '../elements/Logo';
import typography from '../shared-styles/typography.css';
import styles from './TerrafarmApp.css';

injectTapEventPlugin();

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
    return window.pageYOffset || window.document.documentElement;
  }
  _handleShowMenu = (event) => {
    event.stopPropagation();
    event.preventDefault();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.setState({
      docScroll: this._scrollY(),
      contentScroll: this._scrollY() * -1,
      modalview: true,
    });
    setTimeout(() => {
      this.setState({
        animate: true,
      });
    }, 25);
  }
  _handleHideMenu = (event) => {
    console.log('hide menu');
    var {transEndEventNames} = this.props;
    var {perspectiveWrapper, contentWrapper} = this.refs;
    this.setState({
      transform: true,
    });
    if (this.state.animate) {
      var onEndTransFn = (event) => {
        if (event.target.className !== 'container'
            || event.propertyName.indexOf('transform') === -1) {
          return;
        }
        for (let i = 0; i < transEndEventNames.length; i += 1) {
          perspectiveWrapper.removeEventListener(transEndEventNames[i], onEndTransFn );
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
      onEndTransFn.call();

      this.setState({
        animate: false,
      });
    }
  }
  _handleFalseTap = () => {
    console.log('false tap');
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
          className={containerClass}
          onClick={this._handleHideMenu}
          onTouchTap={this._handleHideMenu}
        >
          <div
            ref='contentWrapper'
            className={cx({wrapper: true})}
            style={{top: this.state.contentScroll}}
          >
            <div
              onClick={this._handleShowMenu}
              onTouchTap={this._handleShowMenu}
            >
              Show menu
            </div>
            {this.props.children}
          </div>
        </div>
        <nav className={cx({'outer-nav': true})}>
          <Menu loggedIn={loggedIn} />
        </nav>
      </div>
    );
  }
}

TerrafarmApp.defaultProps = {
  transEndEventNames: {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'msTransition': 'MSTransitionEnd',
    'transition': 'transitionend'
  },
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

