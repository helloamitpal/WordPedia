import React from 'react';
import PropTypes from 'prop-types';

import LoadingIndicator from '../../components/LoadingIndicator';
import Button from '../../components/Button';
import Input from '../../components/Input';

import editIcon from '../../images/SVG/006-pencil.svg';

class VoiceInput extends React.Component {
  constructor() {
    super();
    this.SpeechAPI = window.webkitSpeechRecognition || window.SpeechRecognition;
    this.recognition = null;
    this.state = {
      status: '',
      richText: '',
      edited: false
    };
  }

  componentDidMount() {
    this.onClickVoiceInput();
  }

  onVoiceRecognitionError = (event) => {
    const { error } = event;
    const { onMessage } = this.props;
    let message = '';

    if (error === 'no-speech' || error === 'audio-capture' || error === 'not-allowed') {
      switch (error) {
        case 'no-speech':
          message = 'Complete slicence. \n Please speak again.';
          break;
        case 'audio-capture':
          message = 'Getting trouble to hear you. \n Please speak again.';
          break;
        case 'not-allowed':
          message = 'Allow access to microphone from your browser.';
          break;
        default:
          message = 'Something went wrong. \n Please speak again.';
      }
      this.timer = (Date.now() - this.timer);
      this.setState({ status: 'ended' });
      onMessage(message, 'voice');
    }
  }

  onVoiceRecognitionResult = (event) => {
    if (this.recognition) {
      const { results } = event;
      const { onMessage } = this.props;
      if (!results) {
        this.recognition.stop();
        return;
      }

      const text = results[0][0].transcript;
      const richText = text.split(' ')[0];

      this.recognition.stop();
      this.setState({ richText, status: 'ended' });
      onMessage('', 'voice');
    }
  }

  onVoiceStart = () => {
    const { onMessage } = this.props;
    onMessage('Listening', 'voice', true);
  }

  onClickVoiceInput = () => {
    const { onMessage } = this.props;

    this.recognition = new this.SpeechAPI();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onerror = this.onVoiceRecognitionError;
    this.recognition.onresult = this.onVoiceRecognitionResult;
    this.recognition.onstart = this.onVoiceStart;

    this.recognition.start();
    this.timer = Date.now();
    this.setState({ edited: false, status: 'started' });
    onMessage('Search word with your voice. \n Speak clearly.', 'voice');
  }

  onEditRichText = () => {
    this.setState({ edited: true });
  }

  onChangeRichText = ({ target: { value } }) => {
    this.setState({ richText: value.trim() });
  }

  render() {
    const { status, richText, edited } = this.state;
    const { onFoundWord } = this.props;

    return (
      <div className="voice-input-container mt-1">
        {status === 'started' && this.timer > 1000 ? <LoadingIndicator type="wave" /> : null}
        {richText && status === 'ended' ? (
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
              <Button raisedButton label="Try Again" onClick={this.onClickVoiceInput} />
              <Button raisedButton primary disabled={!richText} label="Accept" onClick={() => onFoundWord(richText)} />
            </div>
          </React.Fragment>
        ) : null}
        {!richText && status === 'ended' ? <Button raisedButton className="center-align-self" label="Retry" onClick={this.onClickVoiceInput} /> : null}
      </div>
    );
  }
}

VoiceInput.propTypes = {
  onFoundWord: PropTypes.func.isRequired,
  onMessage: PropTypes.func.isRequired
};

export default VoiceInput;
