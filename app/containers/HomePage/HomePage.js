import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Search from '../../components/Search';
import FooterMenu from '../../components/FooterMenu';
import Icon from '../../components/Icon';
import * as wordActionCreator from './wordActionCreator';
import CardList from '../../components/CardList';
import Card from '../../components/Card';
import Message from '../../components/Message';

import cogsIcon from '../../images/SVG/149-cog.svg';
import addIcon from '../../images/SVG/267-plus.svg';
import './HomePage.scss';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: ''
    };
    this.menuList = [{
      icon: <Icon path={addIcon} />,
      onClick: this.onClickAddNew
    }, {
      icon: <Icon path={cogsIcon} />,
      onClick: this.onClickSettings
    }];
  }

  componentDidMount() {
    const { wordActions, wordState: { words } } = this.props;
    if (!words || !words.length) {
      wordActions.loadWordAction();
    }
  }

  onChangeSearch = ({ target: { value } }) => {
    const { wordActions } = this.props;

    this.setState({ searchText: value });
    if (value) {
      wordActions.searchWordAction(value);
    } else {
      wordActions.loadWordAction();
    }
  }

  onClickAddNew = () => {

  }

  onClickSettings = () => {

  }

  getWebSearchedResults = () => {
    const { searchText } = this.state;
    const { wordState: { wordsOnWeb } } = this.props;
    const message = `'${searchText}' is not added to your bookmark. ${wordsOnWeb.length ? 'Following words are found on the web. Please bookmark if required.' : 'Nothing found on the web as well.'}`;

    return (
      <div className="web-search-result-container">
        <Message text={message} />
        {
          wordsOnWeb.map((item) => (
            <Card details={item} />
          ))
        }
      </div>
    );
  }

  render() {
    const { searchText } = this.state;
    const { wordState: { words, isError } } = this.props;

    return (
      <div className="home-page">
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Application homepage" />
        </Helmet>
        <div className="search-section-container gradient-background">
          <Search onChange={this.onChangeSearch} value={searchText} />
        </div>
        <div className="list-container">
          { isError ? <Message type="error" text="Something went wrong. Please try again." /> : null}
          {(words && words.length) ? <CardList cards={words} /> : this.getWebSearchedResults()}
        </div>
        <div className="menu-container">
          <FooterMenu menus={this.menuList} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  wordActions: bindActionCreators(wordActionCreator, dispatch)
});

const mapStateToProps = (state) => ({
  wordState: state.words
});

HomePage.propTypes = {
  wordState: PropTypes.object,
  wordActions: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
