import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import LoadingIndicator from '../LoadingIndicator';
import speakerIcon from '../../images/SVG/296-volume-medium.svg';
import arrowDown from '../../images/SVG/324-circle-down.svg';
import arrowUp from '../../images/SVG/322-circle-up.svg';
import './Card.scss';

class Card extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showAll: false,
      details: { ...props.details }
    };
  }

  componentWillReceiveProps(newProps) {
    const { details } = this.state;
    Object.assign(details, newProps.details);
    this.setState({ details });
  }

  toggleExpand = () => {
    const { onAction, details } = this.props;
    const { showAll } = this.state;
    const actions = ['focus', (!showAll) ? 'expand' : 'close'];

    this.setState({ showAll: !showAll });
    onAction(details.word, actions);
  }

  render() {
    const { className } = this.props;
    const { showAll, details } = this.state;
    const isDetailAvialable = (details.longDefinitions && details.longDefinitions.length) || (details.origins && details.origins.length);

    return (
      <div className={`card ${className}`}>
        <div className="card-header">
          <div className="row">
            <Icon className="speaker" path={speakerIcon} />
            <h3 className="title">{details.word}</h3>
          </div>
          {details.phonetic && <span className="sub-title">{details.phonetic}</span>}
        </div>
        {details.shortDefinitions && details.shortDefinitions.length && (
          <ul>
            {
              details.shortDefinitions.map((shortDef, defIndex) => (
                <li key={`short-def-${defIndex.toString()}`}>{shortDef}</li>
              ))
            }
          </ul>
        )}
        {!showAll && (
          <button type="button" className="show-all-btn" onClick={this.toggleExpand}>
            <Icon className="arrowDown" path={arrowDown} />
          </button>
        )}
        {(showAll && isDetailAvialable) ? (
          <div className="long-details mt-1">
            {details.origins && details.origins.length ? <section>Origin</section> : null}
            <ul>
              {
                details.origins.map((originText, index) => (
                  <li key={`origin-${index.toString()}`}>{originText}</li>
                ))
              }
            </ul>
            {details.longDefinitions && (
              <div className="examples-section">
                {
                  details.longDefinitions.map((longDefinitionsObj, index) => (
                    <div className="example" key={`example-${longDefinitionsObj.type}-${index.toString()}`}>
                      <section>{longDefinitionsObj.type}</section>
                      {
                        longDefinitionsObj.examples.map((meaningObj, index1) => (
                          <ul className="meaning-section" key={`meaning-section-${index1.toString()}`}>
                            {meaningObj.definition && <li>{`Definition: ${meaningObj.definition}`}</li>}
                            {meaningObj.example && <li>{`Example: ${meaningObj.example}`}</li>}
                            {meaningObj.synonyms && <li>{`Synonyms: ${meaningObj.synonyms}`}</li>}
                          </ul>
                        ))
                      }
                    </div>
                  ))
                }
              </div>
            )}
            {showAll && (
              <button type="button" className="show-all-btn" onClick={this.toggleExpand}>
                <Icon className="arrowUp" path={arrowUp} />
              </button>
            )}
          </div>
        ) : (showAll && <LoadingIndicator />)}
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
