import React from 'react';
import PropTypes from 'prop-types';

import LoadingIndicator from '../LoadingIndicator';
import Button from '../Button';

import speakerIcon from '../../images/SVG/296-volume-medium.svg';
import arrowDown from '../../images/SVG/324-circle-down.svg';
import arrowUp from '../../images/SVG/322-circle-up.svg';
import addIcon from '../../images/SVG/267-plus.svg';
import minusIcon from '../../images/SVG/268-minus.svg';
import './Card.scss';

class Card extends React.Component {
  constructor(props) {
    super();
    this.icons = {
      add: addIcon,
      delete: minusIcon
    };
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

  toggleExpand = (evt) => {
    const { onAction, details: { word } } = this.props;
    const { showAll } = this.state;
    const actions = ['focus', (!showAll) ? 'expand' : 'close'];

    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
    this.setState({ showAll: !showAll });
    onAction(word, actions);
  }

  onSelectCard = () => {
    const { onAction, details: { word } } = this.props;
    onAction(word, ['focus']);
  }

  textToSpeech = () => {

  }

  onCardAction = (evt) => {
    const { button, onAction, details: { word } } = this.props;

    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
    onAction(word, ['focus', button]);
  }

  render() {
    const { className, button } = this.props;
    const { showAll, details } = this.state;
    const isDetailAvialable = (details.longDefinitions && details.longDefinitions.length) || (details.origins && details.origins.length);

    return (
      <div className={`card ${className}`} onClick={this.onSelectCard}>
        <div className="card-header">
          <div className="row">
            <div className="row">
              <Button className="speaker card-button" onClick={this.textToSpeech} icon={speakerIcon} />
              <h3 className="title">{details.word}</h3>
            </div>
            {button && <Button className="card-button" onClick={this.onCardAction} icon={this.icons[button]} />}
          </div>
          {details.phonetic && <div className="sub-title">{details.phonetic}</div>}
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
        {!showAll && <Button className="show-all-btn" onClick={this.toggleExpand} icon={arrowDown} />}
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
            {showAll && <Button className="show-all-btn" onClick={this.toggleExpand} icon={arrowUp} />}
          </div>
        ) : (showAll && <LoadingIndicator />)}
      </div>
    );
  }
}

Card.defaultProps = {
  className: '',
  button: ''
};

Card.propTypes = {
  className: PropTypes.string,
  onAction: PropTypes.func,
  details: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  button: PropTypes.oneOf(['add', 'delete', ''])
};

export default Card;
