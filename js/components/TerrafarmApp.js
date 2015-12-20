import React from 'react';
import Relay from 'react-relay';
import MainMenu from '../elements/MainMenu';
// import Lorem from 'react-lorem-component';

import classNames from 'classnames/bind';
import styles from './TerrafarmApp.css';
const cx = classNames.bind(styles);

class TerrafarmApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      docScroll: 0,
      contentScroll: 0,
      modalview: false,
      animate: false,
      transform: false,
      menuShouldClose: true,
    };
  }
  _scrollY () {
    return window.pageYOffset || window.document.documentElement.scrollTop;
  }
  _handleShowMainMenu = () => {
    const scrollY = this._scrollY();
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    this.setState({
      docScroll: scrollY,
      contentScroll: scrollY * -1,
      modalview: true,
      menuShouldClose: false,
    });
    setTimeout(() => {
      this.setState({
        animate: true,
      });
    }, 25);
  }
  _handleHideMainMenu = () => {
    const {transEndEventNames} = this.props;
    const {perspectiveWrapper, container} = this.refs;

    this.setState({transform: true, menuShouldClose: true});
    if (this.state.animate) {
      const onEndTransFn = (event) => {
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
  _handleNullTap = () => {
    return false;
  }
  render () {
    return (
      <div
        ref={'perspectiveWrapper'}
        className={cx({
          perspective: true,
          'effect-movedown': true,
          modalview: this.state.modalview,
          animate: this.state.animate,
        })}
        onTouchTap={this._handleNullTap}
      >
        <div
          ref={'container'}
          className={cx({
            container: true,
            transform: this.state.transform,
          })}
          onTouchTap={this._handleHideMainMenu}
        >
          <div
            ref={'contentWrapper'}
            className={cx({wrapper: true})}
            style={{top: this.state.contentScroll}}
          >
            {this.props.children}
          </div>
        </div>
        <nav
          className={cx({
            'outer-nav': true,
            transform: this.state.transform,
          })}
        >
          <MainMenu
            shouldClose={this.state.menuShouldClose}
            onShow={this._handleShowMainMenu}
            onHide={this._handleHideMainMenu}
          />
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
    'transitionend',
  ],
};

export default Relay.createContainer(TerrafarmApp, {
  fragments: {
    master: () => Relay.QL`
      fragment on Master {
        id,
      }
    `,
  },
});

