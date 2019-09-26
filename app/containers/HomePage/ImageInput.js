import React from 'react';
import PropTypes from 'prop-types';
import { TesseractWorker } from 'tesseract.js';

import LoadingIndicator from '../../components/LoadingIndicator';
import Button from '../../components/Button';
import Input from '../../components/Input';

import uploadIcon from '../../images/SVG/199-upload2.svg';

class ImageInput extends React.Component {
  constructor() {
    super();
    this.state = {
      imgURL: '',
      richText: '',
      status: '',
      imageUploadType: 'upload'
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
      imageUploadType: 'upload'
    });
    onMessage('Search word with an image containing text(s).');
  }

  onGetImgURL = ({ target: { value } }) => {
    const imgURL = value.trim();
    this.setState({ imgURL });
  }

  onCompleteImageProcessing = (richText) => {
    const { onMessage } = this.props;
    this.setState({ status: 'ended', richText });
    onMessage('');
  }

  onErrorImageProcessing = () => {
    const { onMessage } = this.props;
    this.setState({ status: 'ended' });
    onMessage('Something went wrong. \n Please try again.');
  }

  onProcessImg = () => {
    const { imgURL } = this.state;
    const { onMessage } = this.props;
    const worker = new TesseractWorker();
    const image = imgURL || (this.fileUpload && this.fileUpload.files[0]);

    worker.recognize(image)
      .then(({ text }) => {
        worker.terminate();
        this.onCompleteImageProcessing(text);
      })
      .catch(this.onErrorImageProcessing);

    onMessage('Processing', true);
    this.setState({ status: 'started' });
  }

  onChangeImageInputType = (imageUploadType) => {
    this.setState({ imageUploadType, imgURL: '' });
  }

  render() {
    const { status, richText, imgURL, imageUploadType } = this.state;
    const isImgLinkSelected = (imageUploadType === 'link');
    const { onFoundWord } = this.props;

    return (
      <div className="image-input-container mt-1">
        {status === 'started' ? <LoadingIndicator type="scan" /> : null}
        {status === '' && (
          <React.Fragment>
            <div className="menu-links">
              <a href="javascript:void(0)" className={!isImgLinkSelected ? 'selected' : ''} onClick={() => this.onChangeImageInputType('upload')}>Upload an image</a>
              <i className="divider" />
              <a href="javascript:void(0)" className={isImgLinkSelected ? 'selected' : ''} onClick={() => this.onChangeImageInputType('link')}>Paste image URL</a>
            </div>
            {isImgLinkSelected
              ? <Input type="text" value={imgURL} className="url-text" placeholder="http(s)://" onChange={this.onGetImgURL} />
              : (
                <div className="upload-btn-section">
                  <Button animation={false} className="upload-btn" icon={uploadIcon} />
                  <input ref={(ref) => { this.fileUpload = ref; }} className="file-upload" id="fileInput" type="file" accept="image/*;" capture="camera" onChange={this.onProcessImg} />
                </div>
              )
            }
            <Button raisedButton primary className="process-btn mt-1" label="Process Image" onClick={this.onProcessImg} />
          </React.Fragment>
        )}
        {status === 'ended' && richText && (
          <React.Fragment>
            <div className="center-aligned camel-case rich-content">{richText}</div>
            <div className="button-section">
              <Button raisedButton label="Start New" onClick={this.onClickImageInput} />
              <Button raisedButton primary label="Accept" onClick={() => onFoundWord(richText)} />
            </div>
          </React.Fragment>
        )}
        {!richText && status === 'ended' ? <Button raisedButton label="Retry" className="center-align-self" onClick={this.onClickImageInput} /> : null}
      </div>
    );
  }
}

ImageInput.propTypes = {
  onFoundWord: PropTypes.func.isRequired,
  onMessage: PropTypes.func.isRequired
};

export default ImageInput;
