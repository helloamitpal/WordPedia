import React from 'react';
import PropTypes from 'prop-types';

import LoadingIndicator from '../LoadingIndicator';
import Button from '../Button';
import ToggleMenu from '../ToggleMenu';
import ShowMore from '../ShowMore';
import Readalong from '../Readalong';

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
    const { onAction, details, scrollTo } = this.props;
    let { showAll } = this.state;
    const actions = ['focus', (!showAll) ? 'expand' : 'close'];

    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
    showAll = !showAll;
    this.setState({ showAll });

    // focus to card once shrinked the details
    if (!showAll) {
      scrollTo(details.word);
    }

    if (!details.origins.length && !details.longDefinitions.length) {
      onAction(details, actions);
    }
  }

  onSelectCard = () => {
    const { onAction, details } = this.props;
    onAction(details, ['focus']);
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
    const isDetailAvialable = details.expanded || (details.origins.length || details.longDefinitions.length);
    const menus = this.getMenuButtonList(button);

    return (
      <div className={`card ${className}`} onClick={this.onSelectCard} ref={this.cardRef}>
        <div className={`card-header ${(details.shortDefinitions.length || details.synonyms.length) ? '' : 'mb-1'}`}>
          <div className="row">
            <h3 className="title">{details.word}</h3>
            {button && <ToggleMenu hasArrow={false} icon={verticalDotsIcon} className="card-menu-list-btn" menus={menus} onClick={this.onCardAction} />}
          </div>
          <div className="row sub-title-section">
            {details.phonetic && (
              <React.Fragment>
                <div className="sub-title">{details.phonetic}</div>
                <Readalong className="speaker" text={details.word} />
              </React.Fragment>
            )}
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
                    <span
                      onClick={(evt) => this.onCardAction(evt, 'synonym', synonym)}
                      className={`${synonym.includes(' ') ? 'no-anchor' : 'anchor'}`}
                      key={`synonym-${synIndex.toString()}`}
                    >
                      {synonym}
                    </span>
                  ))
                }
              </ShowMore>
            </div>
          </React.Fragment>
        )}
        {!showAll && <Button className="show-all-btn" animation={false} onClick={this.toggleExpand} icon={arrowDown} />}
        {(showAll && isDetailAvialable) ? (
          <div className={`long-details ${(details.origins.length || details.longDefinitions.length) ? 'mt-1' : ''}`}>
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
            {details.longDefinitions && !!details.longDefinitions.length && (
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
  button: PropTypes.arrayOf(PropTypes.oneOf(['add', 'delete', 'share', 'copy'])),
  scrollTo: PropTypes.func
};

export default Card;
