import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../components/Icon';
import ImageInput from './ImageInput';
import VoiceInput from './VoiceInput';

import './RichInput.scss';
import micIcon from '../../images/SVG/031-mic.svg';
import cameraIcon from '../../images/SVG/016-camera.svg';

class RichInput extends React.Component {

  constructor() {
    super();
    this.state = {
      inputType: '',
      messageAnimation: false,
      message: 'Select voice or image input to search the word'
    };
  }

  onMessageReceive = (message, animation = false) => {
    this.setState({ message, messageAnimation: animation });
  }

  onClickInput = (inputType) => {
    this.setState({ inputType });
  }

  onAcceptInput = (word) => {
    const { onAcceptInput } = this.props;
    onAcceptInput(word);
  }

  render() {
    const { inputType, message, messageAnimation } = this.state;

    return (
      <div className="modal-container">
        <div className="modal-header gradient-background" />
        <div className="rich-input-container">
          <div className="input-section">
            <a href="javascript:void(0)" className={`${inputType === 'image' && 'selected'}`} onClick={() => this.onClickInput('image')}>
              <Icon animation={false} path={cameraIcon} />
            </a>
            <a href="javascript:void(0)" className={`${inputType === 'voice' && 'selected'}`} onClick={() => this.onClickInput('voice')}>
              <Icon animation={false} path={micIcon} />
            </a>
          </div>
          {message && <div className={`${messageAnimation ? 'animation' : ''} message-section center-aligned mt-1`}>{message}</div>}
          {inputType === 'voice' && <VoiceInput onFoundWord={this.onAcceptInput} onMessage={this.onMessageReceive} />}
          {inputType === 'image' && <ImageInput onFoundWord={this.onAcceptInput} onMessage={this.onMessageReceive} />}
        </div>
      </div>
    );
  }
}

RichInput.propTypes = {
  onAcceptInput: PropTypes.func.isRequired
};

export default RichInput;
