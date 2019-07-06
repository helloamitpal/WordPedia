import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';
import './CardList.scss';

class CardList extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedCard: null
    };
  }

  onSelectCard = (word) => {
    this.setState({ selectedCard: word });
  }

  render() {
    const { list, className } = this.props;
    const { selectedCard } = this.state;

    return (
      <div className={`${className} card-list-container`}>
        {
          list.map((item) => (
            <div key={item.word} className="card-item" onClick={() => this.onSelectCard(item.word)}>
              <Card details={item} className={selectedCard === item.word ? 'selected' : ''} />
            </div>
          ))
        }
      </div>
    );
  }
}

CardList.defaultProps = {
  className: ''
};

CardList.propTypes = {
  list: PropTypes.array.isRequired,
  className: PropTypes.string
};

export default CardList;
