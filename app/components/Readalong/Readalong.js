import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import speakerIcon from '../../images/SVG/296-volume-medium.svg';

const Readalong = ({ text, className }) => {
  const synth = window.speechSynthesis;

  if (!synth) {
    return null;
  }

  const { 0: voice } = synth.getVoices();

  const textToSpeech = () => {
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.pitch = 1;
    utterThis.rate = 1;
    utterThis.voice = voice;
    synth.speak(utterThis);
  };

  return <Button className={className} onClick={textToSpeech} icon={speakerIcon} />;
};

Readalong.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string
};

Readalong.defaultProps = {
  className: ''
};

export default Readalong;
