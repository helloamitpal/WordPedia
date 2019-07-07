import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import speakerIcon from '../../images/SVG/296-volume-medium.svg';
import arrowDown from '../../images/SVG/324-circle-down.svg';
import arrowUp from '../../images/SVG/322-circle-up.svg';
import './Card.scss';

class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      showAll: false
    };
  }

  toggleExpand = () => {
    const { onAction, details } = this.props;
    const { showAll } = this.state;
    this.setState({ showAll: !showAll });
    onAction(details.word);
  }

  render() {
    const { className, details } = this.props;
    const { showAll } = this.state;

    return (
      <div className={`card ${className}`}>
        <div className="card-header">
          <div className="row">
            <Icon className="speaker" path={speakerIcon} />
            <h3 className="title">{details.word}</h3>
          </div>
          <span className="sub-title">{details.phonetic}</span>
        </div>
        <ul>
          {
            details.shortDefinitions.map((shortDefinitionsObj, defIndex) => (
              <li key={`short-def-${defIndex.toString()}`}>{shortDefinitionsObj}</li>
            ))
          }
        </ul>
        {!showAll && (
          <button type="button" className="show-all-btn" onClick={this.toggleExpand}>
            <Icon className="arrowDown" path={arrowDown} />
          </button>
        )}
        { showAll ? (
          <div className="long-details mt-1">
            {details.origin.length ? <section>Origin</section> : null}
            <ul>
              {
                details.origin.map((originText, index) => (
                  <li key={`origin-${index.toString()}`}>{originText}</li>
                ))
              }
            </ul>
            <div className="examples-section">
              {
                details.longDefinitions.map((longDefinitionsObj, index) => (
                  <div className="example" key={`example-${longDefinitionsObj.type}-${index.toString()}`}>
                    <section>{longDefinitionsObj.type}</section>
                    {
                      longDefinitionsObj.examples.map((meaningObj, index1) => (
                        <ul className="meaning-section" key={`meaning-section-${index1.toString()}`}>
                          <li>{`Definition: ${meaningObj.definition}`}</li>
                          <li>{`Example: ${meaningObj.example}`}</li>
                          <li>{`Synonyms: ${meaningObj.synonyms}`}</li>
                        </ul>
                      ))
                    }
                  </div>
                ))
              }
            </div>
            {showAll && (
              <button type="button" className="show-all-btn" onClick={this.toggleExpand}>
                <Icon className="arrowUp" path={arrowUp} />
              </button>
            )}
          </div>) : null
        }
      </div>
    );
  }
}

Card.defaultProps = {
  className: ''
};

Card.propTypes = {
  className: PropTypes.string,
  onAction: PropTypes.func,
  details: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};

export default Card;
