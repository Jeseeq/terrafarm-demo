import React from 'react';
import Relay from 'react-relay';
import {IndexLink} from 'react-router';

export default class Logo extends React.Component {
  render () {
    var {onClick, onTouchTap} = this.props;
    return <div onClick={onClick} onTouchTap={onTouchTap}>
      <h1>Show menu</h1>
    </div>;
  }
}

Logo.propTypes = {
  onClick: React.PropTypes.func,
  onTouchTap: React.PropTypes.func,
};

