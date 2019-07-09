import React from 'react';
import PropTypes from 'prop-types';

import Message from '../../components/Message';

const WebWords = ({ searchText, words, onAction }) => {
  const subInfo = words.length ? 'Following words are found on the web.' : 'Nothing has been found on the web. Please recheck.';

  return (
    <div className="web-word-container">
      <Message text={`'${searchText}' is not added to your bookmark.`} subInfo={subInfo} />
      <div className="web-search-result-container">
        {
          words.map(({ word, definition }) => (
            <div className="web-word" key={`web-${word}`}>
              <a href="javascript:void(0)" onClick={() => onAction(word)}>{word}</a>
              <ul className="sub-title">
                {
                  definition.map((text, index) => (<li key={`web-${word}-def-${index.toString()}`}>{text}</li>))
                }
              </ul>
            </div>
          ))
        }
      </div>
    </div>
  );
};

WebWords.propTypes = {
  searchText: PropTypes.string.isRequired,
  words: PropTypes.array.isRequired,
  onAction: PropTypes.func.isRequired
};

export default WebWords;
