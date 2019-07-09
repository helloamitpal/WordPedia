import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debounce } from 'lodash';

import Search from '../../components/Search';
import FooterMenu from '../../components/FooterMenu';
import * as wordActionCreator from './wordActionCreator';
import CardList from '../../components/CardList';
import Message from '../../components/Message';
import config from '../../config';

import cogsIcon from '../../images/SVG/149-cog.svg';
import addIcon from '../../images/SVG/267-plus.svg';
import './HomePage.scss';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: ''
    };
    this.debouncedSearch = debounce(this.searchAPICall, 20);
    this.menuList = [{
      icon: addIcon,
      onClick: this.onClickAddNew
    }, {
      icon: cogsIcon,
      onClick: this.onClickSettings
    }];
  }

  componentDidMount() {
    const { wordActions, wordState: { words } } = this.props;
    if (!words || !words.length) {
      wordActions.loadWordAction();
    }
  }

  searchAPICall = () => {
    const { wordActions } = this.props;
    const { searchText } = this.state;

    if (searchText) {
      wordActions.searchWordAction(searchText, config.SEARCH_TYPE_BOOKMARK);
    } else {
      wordActions.loadWordAction();
    }
  }

  onChangeSearch = ({ target: { value } }) => {
    this.setState({ searchText: value.trim() });
    this.debouncedSearch();
  }

  onClickAddNew = () => {

  }

  onClickSettings = () => {

  }

  onCardAction = (word, actionType) => {
    const { wordActions, wordState: { wordsOnWeb } } = this.props;

    if (actionType.includes('expand') && wordsOnWeb.length && wordsOnWeb.filter((obj) => (obj.word === word)).length) {
      wordActions.searchWordAction(word, config.SEARCH_TYPE_WEB);
    } else if (actionType.includes('add')) {
      wordActions.addWordAction(word);
    } else if (actionType.includes('delete')) {
      wordActions.deleteWordAction(word);
    }
  }

  render() {
    const { searchText } = this.state;
    const { wordState: { words, isError, wordsOnWeb } } = this.props;
    let data = [];
    let subInfo = '';
    let buttonType;

    if (words && words.length) {
      data = words;
      buttonType = 'delete';
    } else if (wordsOnWeb && wordsOnWeb.length) {
      data = wordsOnWeb;
      buttonType = 'add';
      subInfo = 'Following defeinitions are found.';
    } else {
      subInfo = 'No definitions found for this word. Please recheck.';
    }

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
          { words.length === 0 && <Message text={`'${searchText}' is not added to your bookmark.`} subInfo={subInfo} /> }
          <CardList cards={data} onAction={this.onCardAction} button={buttonType} />
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
