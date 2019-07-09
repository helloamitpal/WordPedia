import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Card from '../Card';
import LoadingIndicator from '../LoadingIndicator';
import config from '../../config';

import './CardList.scss';

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.deboucedScroll = _.debounce(this.updateScrollState, 200);
    this.state = {
      selectedCard: null,
      offset: 0,
      totalCount: props.cards.length,
      loading: false,
      list: props.cards.slice(0, config.PAGE_SIZE)
    };
  }

  componentDidMount() {
    this.containerRef.current.addEventListener('scroll', this.onScrollListener);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      offset: 0,
      totalCount: newProps.cards.length,
      loading: false,
      list: newProps.cards.slice(0, config.PAGE_SIZE)
    });
  }

  componentWillUnmount() {
    this.containerRef.current.removeEventListener('scroll', this.onScrollListener);
  }

  onScrollListener = () => {
    const { totalCount, offset, loading } = this.state;

    if (loading) {
      return;
    }

    const { current } = this.containerRef;
    const maxOffSet = Math.ceil(totalCount / config.PAGE_SIZE);

    if (offset < maxOffSet - 1 && (current.scrollTop + current.clientHeight) >= current.scrollHeight - 100) {
      const nextOffset = offset + 1;
      this.setState({ loading: true, offset: nextOffset });
      this.deboucedScroll();
    }
  }

  updateScrollState = () => {
    const { onScroll, cards } = this.props;
    const { offset, loading, list } = this.state;

    if (loading) {
      const nextList = cards.slice(offset * config.PAGE_SIZE, offset * config.PAGE_SIZE + config.PAGE_SIZE);
      this.setState({
        list: list.concat(nextList),
        loading: false
      });

      if (onScroll) {
        onScroll.call(null);
      }
    }
  }

  onSelectCard = (word) => {
    this.setState({ selectedCard: word });
  }

  onFocusAction = (word, actionType) => {
    const { onAction } = this.props;

    this.containerRef.current.querySelector(`#card-${word}`).scrollIntoView({ behavior: 'smooth' });
    if (onAction) {
      onAction.call(null, word, actionType);
    }
  }

  render() {
    const { className } = this.props;
    const { selectedCard, list, loading } = this.state;

    return (
      <div ref={this.containerRef} className={`${className} card-list-container`}>
        {
          list.map((item) => (
            <div id={`card-${item.word}`} key={item.word} className="card-item" onClick={() => this.onSelectCard(item.word)}>
              <Card onAction={this.onFocusAction} details={item} className={selectedCard === item.word ? 'selected' : ''} />
            </div>
          ))
        }
        { loading && <LoadingIndicator /> }
      </div>
    );
  }
}

CardList.defaultProps = {
  className: ''
};

CardList.propTypes = {
  cards: PropTypes.array.isRequired,
  className: PropTypes.string,
  onScroll: PropTypes.func,
  onAction: PropTypes.func
};

export default CardList;
