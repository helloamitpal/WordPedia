import React from 'react';
import PropTypes from 'prop-types';

import './ShowMore.scss';

class ShowMore extends React.Component {
  constructor() {
    super();
    this.state = {
      showAll: false
    };
  }

  toggleShow = () => {
    const { showAll } = this.state;
    this.setState({ showAll: !showAll });
  }

  render() {
    const { className, children } = this.props;
    const { showAll } = this.state;
    const childrenSet = React.Children.toArray(children);
    const maxChildren = 5;

    return (
      <div className={`show-more-container ${className} ${showAll ? 'show-all' : ''}`}>
        {children}
        {(childrenSet.length > maxChildren)
          ? (
            <React.Fragment>
              ...
              <a href="javascript:void(0)" className="show-more-link" onClick={this.toggleShow}>{showAll ? 'Show less' : `Show ${childrenSet.length - maxChildren} more` }</a>
            </React.Fragment>
          )
          : null
        }
      </div>
    );
  }
}

ShowMore.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

ShowMore.defaultProps = {
  className: ''
};

export default ShowMore;
