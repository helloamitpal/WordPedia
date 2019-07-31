import React from 'react';
import PropTypes from 'prop-types';

import LoadingIndicator from '../LoadingIndicator';
import Button from '../Button';
import ToggleMenu from '../ToggleMenu';
import ShowMore from '../ShowMore';

import speakerIcon from '../../images/SVG/296-volume-medium.svg';
import arrowDown from '../../images/SVG/324-circle-down.svg';
import arrowUp from '../../images/SVG/322-circle-up.svg';
import verticalDotsIcon from '../../images/SVG/000-dots-vertical-triple.svg';
import './Card.scss';

class Card extends React.Component {
  constructor(props) {
    super();
    this.menuLabels = {
      add: 'Bookmark',
      delete: 'Remove',
      share: 'Share',
      copy: 'Copy'
    };
    this.cardRef = React.createRef();
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
    const { onAction, details } = this.props;
    onAction(details, ['focus']);
  }

  textToSpeech = () => {

  }

  onCardAction = (evt, button, word) => {
    const { onAction, details } = this.props;

    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
    onAction(details, ['focus', button], this.cardRef.current, word);
  }

  getMenuButtonList = (buttons) => {
    return buttons && buttons.sort().map((val) => ({ label: this.menuLabels[val], path: val }));
  }

  render() {
    const { className, button } = this.props;
    const { showAll, details } = this.state;
    const isDetailAvialable = (details.longDefinitions && details.longDefinitions.length) || (details.origins && details.origins.length);
    const menus = this.getMenuButtonList(button);

    return (
      <div className={`card ${className}`} onClick={this.onSelectCard} ref={this.cardRef}>
        <div className="card-header">
          <div className="row">
            <h3 className="title">{details.word}</h3>
            {button && <ToggleMenu icon={verticalDotsIcon} className="card-menu-list-btn" menus={menus} onClick={this.onCardAction} />}
          </div>
          <div className="row sub-title-section">
            {details.phonetic && <div className="sub-title">{details.phonetic}</div>}
            {details.phonetic && <Button className="speaker" onClick={this.textToSpeech} icon={speakerIcon} />}
          </div>
        </div>
        {details.shortDefinitions && !!details.shortDefinitions.length && (
          <ul>
            {
              details.shortDefinitions.map((shortDef, defIndex) => (
                shortDef ? <li key={`short-def-${defIndex.toString()}`}>{shortDef}</li> : null
              ))
            }
          </ul>
        )}
        {details.synonyms && !!details.synonyms.length && (
          <React.Fragment>
            <section>Synonyms</section>
            <div className="synonym-container">
              <ShowMore>
                {
                  details.synonyms.map((synonym, synIndex) => (
                    <a
                      href="javascript:void(0)"
                      onClick={(evt) => this.onCardAction(evt, 'synonym', synonym)}
                      className={`${synonym.includes(' ') ? 'no-anchor' : ''}`}
                      key={`synonym-${synIndex.toString()}`}
                    >
                      {synonym}
                    </a>
                  ))
                }
              </ShowMore>
            </div>
          </React.Fragment>
        )}
        {!showAll && <Button className="show-all-btn" animation={false} onClick={this.toggleExpand} icon={arrowDown} />}
        {(showAll && isDetailAvialable) ? (
          <div className="long-details mt-1">
            {details.origins && !!details.origins.length && (
              <React.Fragment>
                <section>Origin</section>
                <ul>
                  {
                    details.origins.map((originText, index) => (
                      <li key={`origin-${index.toString()}`}>{originText}</li>
                    ))
                  }
                </ul>
              </React.Fragment>
            )}
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
            {showAll && <Button className="show-all-btn" animation={false} onClick={this.toggleExpand} icon={arrowUp} />}
          </div>
        ) : (showAll && <LoadingIndicator />)}
      </div>
    );
  }
}

Card.defaultProps = {
  className: '',
  button: []
};

Card.propTypes = {
  className: PropTypes.string,
  onAction: PropTypes.func,
  details: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  button: PropTypes.arrayOf(PropTypes.oneOf(['add', 'delete', 'share', 'copy']))
};

export default Card;
