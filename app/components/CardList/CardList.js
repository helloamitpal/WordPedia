import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';
import LoadingIndicator from '../LoadingIndicator';

import './CardList.scss';

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.pageSize = 20;
    this.state = {
      selectedCard: null,
      offset: 0,
      totalCount: props.cards.length,
      loading: false,
      list: props.cards.slice(0, this.pageSize)
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
      list: newProps.cards.slice(0, this.pageSize)
    });
  }

  componentWillUnmount() {
    this.containerRef.current.removeEventListener('scroll', this.onScrollListener);
  }

  onScrollListener = () => {
    const { totalCount, offset, list, loading } = this.state;

    if (loading) {
      return;
    }

    const { current } = this.containerRef;
    const { onScroll, cards } = this.props;
    const maxOffSet = Math.ceil(totalCount / this.pageSize);

    if (offset < maxOffSet - 1 && (current.scrollTop + current.clientHeight) >= current.scrollHeight - 100) {
      const nextOffset = offset + 1;
      const nextList = cards.slice(nextOffset * this.pageSize, nextOffset * this.pageSize + this.pageSize);

      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({
          offset: nextOffset,
          list: list.concat(nextList),
          loading: false
        });

        if (onScroll) {
          onScroll.call(null);
        }
      }, 200);
    }
  }

  onSelectCard = (word) => {
    this.setState({ selectedCard: word });
  }

  onFocusAction = (word) => {
    this.containerRef.current.querySelector(`#card-${word}`).scrollIntoView({ behavior: 'smooth' });
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
  onScroll: PropTypes.func
};

export default CardList;
