import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';

const {PropTypes} = React;

const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;

export default class TextInput extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    commitOnBlur: PropTypes.bool.isRequired,
    initialValue: PropTypes.string,
    onCancel: PropTypes.func,
    onDelete: PropTypes.func,
    onSave: PropTypes.func.isRequired,
  };
  static defaultProps = {
    commitOnBlur: false,
    style: {
      fontFamily: 'Simonetta, serif',
    },
  };
  state = {
    isEditing: false,
    text: this.props.initialValue || '',
  };
  componentDidMount () {
    ReactDOM.findDOMNode(this).focus();
  }
  _commitChanges = () => {
    const newText = this.state.text.trim();
    if (this.props.onDelete && newText === '') {
      this.props.onDelete();
    } else if (this.props.onCancel && newText === this.props.initialValue) {
      this.props.onCancel();
    } else if (newText !== '') {
      this.props.onSave(newText);
      this.setState({text: ''});
    }
  }
  _handleBlur = () => {
    if (this.props.commitOnBlur) {
      this._commitChanges();
    }
  }
  _handleChange = (e) => {
    this.setState({text: e.target.value});
  }
  _handleKeyDown = (e) => {
    if (this.props.onCancel && e.keyCode === ESC_KEY_CODE) {
      this.props.onCancel();
    } else if (e.keyCode === ENTER_KEY_CODE) {
      this._commitChanges();
    }
  }
  _handleEnterKeyDown = () => {
    this._commitChanges();
  }
  render () {
    return (
      <TextField
        style={this.props.style}
        floatingLabelStyle={{color: Colors.blueGrey900}}
        underlineFocusStyle={{borderColor: Colors.blueGrey900}}
        hintText={this.props.placeholder}
        floatingLabelText={this.props.label}
        onBlur={this._handleBlur}
        onChange={this._handleChange}
        onEnterKeyDown={this._handleEnterKeyDown}
        value={this.state.text}
      />
    );
  }
}
