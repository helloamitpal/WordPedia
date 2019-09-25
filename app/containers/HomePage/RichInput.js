import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../components/Icon';
import LoadingIndicator from '../../components/LoadingIndicator';
import Button from '../../components/Button';
import Input from '../../components/Input';

import './RichInput.scss';
import micIcon from '../../images/SVG/031-mic.svg';
import cameraIcon from '../../images/SVG/016-camera.svg';
import editIcon from '../../images/SVG/006-pencil.svg';

class RichInput extends React.Component {

  constructor() {
    super();
    this.SpeechAPI = window.webkitSpeechRecognition || window.SpeechRecognition;
    this.recognition = null;
    this.state = {
      inputType: '',
      status: '',
      startTime: 0,
      endTime: 0,
      richText: '',
      edited: false,
      audioMessage: 'Please click to give input'
    };
  }

  onClickImageInput = () => {
    this.setState({ inputType: 'image', edited: false, startTime: 0, endTime: 0, richText: '', status: 'started' });
  }

  onVoiceRecognitionError = (event) => {
    const { error } = event;
    const { startTime } = this.state;
    const endTime = Date.now();
    const notSpoken = (endTime - startTime) > 10000;
    let message = '';

    if (error === 'no-speech' || error === 'audio-capture' || error === 'not-allowed' || notSpoken) {
      switch (error) {
        case 'no-speech':
        case notSpoken:
          message = 'It was slicence. Please speak.';
          break;
        case 'audio-capture':
          message = 'Not able to hear you. Please speak again.';
          break;
        case 'not-allowed':
          message = 'Please allow microphone from your browser.';
          break;
        default:
          message = 'Something wrong. Please speak again.';
      }
      this.setState({ status: 'ended', audioMessage: message, endTime });
    }
  }

  onVoiceRecognitionResult = (event) => {
    if (this.recognition) {
      const { results } = event;
      if (!results) {
        this.recognition.stop();
        return;
      }

      const text = results[0][0].transcript;
      const richText = text.split(' ')[0];

      this.recognition.stop();
      this.setState({ richText, status: 'ended' });
    }
  }

  onClickVoiceInput = () => {
    this.recognition = new this.SpeechAPI();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onerror = this.onVoiceRecognitionError;
    this.recognition.onresult = this.onVoiceRecognitionResult;

    this.recognition.start();
    const startTime = Date.now();
    this.setState({ inputType: 'voice', edited: false, status: 'started', startTime, endTime: 0, audioMessage: '' });
  }

  onAcceptInput = (input) => {
    const { onAcceptInput } = this.props;
    onAcceptInput(input);
  }

  onEditRichText = () => {
    this.setState({ edited: true });
  }

  onChangeRichText = ({ target: { value } }) => {
    this.setState({ richText: value.trim() });
  }

  render() {
    const { inputType, status, richText, audioMessage, startTime, endTime, edited } = this.state;
    const isSpeechStarted = endTime ? endTime - startTime > 100 : true;

    return (
      <div className="rich-input-container">
        <div className="input-section">
          <a href="javascript:void(0)" className={`${inputType === 'image' && 'selected'}`} onClick={this.onClickImageInput}>
            <Icon path={cameraIcon} />
          </a>
          <a href="javascript:void(0)" className={`${inputType === 'voice' && 'selected'}`} onClick={this.onClickVoiceInput}>
            <Icon path={micIcon} />
          </a>
        </div>
        {audioMessage && <div className="center-aligned">{audioMessage}</div>}
        {status === 'started' && isSpeechStarted ? <LoadingIndicator type="wave" /> : null}
        {inputType === 'voice' && richText && status === 'ended' ? (
          <React.Fragment>
            <div className="center-aligned camel-case rich-content">
              {!edited && (
                <React.Fragment>
                  <span>{richText}</span>
                  <Button className="edit-icon" icon={editIcon} onClick={this.onEditRichText} />
                </React.Fragment>
              )}
              {edited && <Input autoFocus type="text" value={richText} onChange={this.onChangeRichText} />}
            </div>
            <div className="button-section">
              <Button raisedButton label="Retry" onClick={this.onClickVoiceInput} />
              <Button raisedButton primary disabled={!richText} label="Accept" onClick={() => this.onAcceptInput(richText)} />
            </div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

RichInput.propTypes = {
  onAcceptInput: PropTypes.func.isRequired
};

export default RichInput;
