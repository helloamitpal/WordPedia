import React from 'react';
import PropTypes from 'prop-types';
import { TesseractWorker } from 'tesseract.js';

import LoadingIndicator from '../../components/LoadingIndicator';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { getCleanedWords } from '../../util/helper';

import uploadIcon from '../../images/SVG/199-upload2.svg';

class ImageInput extends React.Component {
  constructor() {
    super();
    this.state = {
      imgURL: '',
      richText: '',
      status: '',
      imageUploadType: 'upload',
      words: null
    };
  }

  componentDidMount() {
    this.onClickImageInput();
  }

  onClickImageInput = () => {
    const { onMessage } = this.props;
    this.setState({
      imgURL: '',
      richText: '',
      status: '',
      imageUploadType: 'upload',
      words: null
    });
    onMessage('Search word with an image containing text(s).', 'image');
  }

  onGetImgURL = ({ target: { value } }) => {
    const imgURL = value.trim();
    this.setState({ imgURL });
  }

  onCompleteImageProcessing = (text) => {
    const { onMessage } = this.props;
    const words = getCleanedWords(text);
    let message = '';

    if (words.length === 1) {
      this.setState({ status: 'ended', richText: words[0], words: false });
      message = '';
    } else if (words.length > 1 && words.length < 10) {
      this.setState({ status: 'ended', richText: '', words });
      message = 'Multiple words found. \n Please pick your word.';
    } else if (words.length >= 10) {
      this.setState({ status: 'ended', richText: '', words: words.slice(0, 10) });
      message = `Too many words (${words.length}) found. \n Showing maximum 10 words only.`;
    } else {
      this.setState({ status: 'ended', richText: '', words: false });
      message = 'No meaningful word found. \n Please try again.';
    }

    onMessage(message, 'image');
  }

  onErrorImageProcessing = () => {
    const { onMessage } = this.props;
    this.setState({ status: 'ended', richText: '', words: false });
    onMessage('Something went wrong. \n Please try again.', 'image');
  }

  onProcessImg = () => {
    const { imgURL } = this.state;
    const { onMessage } = this.props;
    const worker = new TesseractWorker();
    const image = imgURL || (this.fileUpload && this.fileUpload.files[0]);

    try {
      worker.recognize(image)
        .catch(this.onErrorImageProcessing)
        .progress(() => {
          onMessage('Processing', 'image', true);
        })
        .then(({ text }) => {
          worker.terminate();
          this.onCompleteImageProcessing(text);
        });
    } catch (err) {
      this.onErrorImageProcessing();
    }

    onMessage('Uploading', 'image', true);
    this.setState({ status: 'started' });
  }

  onChangeImageInputType = (imageUploadType) => {
    this.setState({ imageUploadType, imgURL: '' });
  }

  selectWord = (word) => {
    this.setState({ richText: word });
  }

  getWordList = (list) => {
    const { richText } = this.state;

    return list.map((word, index) => (
      <span key={`word-${index.toString()}`} className={`word ${richText === word ? 'selected-word' : ''}`} onClick={() => this.selectWord(word)}>{word}</span>
    ));
  }

  render() {
    const { status, richText, imgURL, imageUploadType, words } = this.state;
    const isImgLinkSelected = (imageUploadType === 'link');
    const { onFoundWord } = this.props;

    return (
      <div className="image-input-container mt-1">
        {status === 'started' ? <LoadingIndicator type="scan" /> : null}
        {status === '' && (
          <React.Fragment>
            <div className="menu-links">
              <span className={!isImgLinkSelected ? 'selected' : ''} onClick={() => this.onChangeImageInputType('upload')}>Upload an image</span>
              <i className="divider" />
              <span className={isImgLinkSelected ? 'selected' : ''} onClick={() => this.onChangeImageInputType('link')}>Paste image URL</span>
            </div>
            {isImgLinkSelected
              ? <Input autoFocus type="text" value={imgURL} className="url-text" placeholder="http(s)://" onChange={this.onGetImgURL} />
              : (
                <div className="upload-btn-section">
                  <Button animation={false} className="upload-btn" icon={uploadIcon} />
                  <input ref={(ref) => { this.fileUpload = ref; }} className="file-upload" id="fileInput" type="file" accept="image/*;" capture="camera" onChange={this.onProcessImg} />
                </div>
              )
            }
            {imageUploadType === 'link' && <Button raisedButton primary className="process-btn mt-1" label="Process Image" onClick={this.onProcessImg} />}
          </React.Fragment>
        )}
        {status === 'ended' && (richText || words) && (
          <React.Fragment>
            {(words.length === 1 || richText) ? <div className="center-aligned camel-case rich-content">{richText}</div> : null}
            {status === 'ended' && words ? <div className="word-container">{this.getWordList(words)}</div> : null}
            <div className="button-section">
              <Button raisedButton label="Try Another" onClick={this.onClickImageInput} />
              <Button raisedButton primary disabled={!richText} label="Accept" onClick={() => onFoundWord(richText)} />
            </div>
          </React.Fragment>
        )}
        {!richText && status === 'ended' && !words ? <Button raisedButton label="Retry" className="center-align-self" onClick={this.onClickImageInput} /> : null}
      </div>
    );
  }
}

ImageInput.propTypes = {
  onFoundWord: PropTypes.func.isRequired,
  onMessage: PropTypes.func.isRequired
};

export default ImageInput;
