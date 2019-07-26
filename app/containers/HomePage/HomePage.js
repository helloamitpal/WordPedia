import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debounce } from 'lodash';

import Search from '../../components/Search';
import Header from '../../components/Header';
import * as wordActionCreator from './wordActionCreator';
import CardList from '../../components/CardList';
import Button from '../../components/Button';
import LoadingIndicator from '../../components/LoadingIndicator';
import ToggleMenu from '../../components/ToggleMenu';
import Message from '../../components/Message';
import config from '../../config';
import Events from '../../event-tracker/events';
import EventTracker from '../../event-tracker';
import Features from '../../util/features';
import * as helper from '../../util/helper';

import addIcon from '../../images/SVG/267-plus.svg';
import verticalDotsIcon from '../../images/SVG/000-dots-vertical-triple.svg';
import './HomePage.scss';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: ''
    };
    this.userFeature = Features.sharable ? 'share' : 'copy';
    this.debouncedSearch = debounce(this.searchAPICall, 300);
    this.menus = [{
      label: 'Personalize',
      path: config.SETTINGS_PAGE
    }];
  }

  componentDidMount() {
    const { wordActions, wordState: { words } } = this.props;
    EventTracker.raise(Events.HOME_PAGE);
    if (!words || !words.length) {
      wordActions.loadWordAction();
    }
  }

  searchAPICall = () => {
    const { wordActions } = this.props;
    const { searchText } = this.state;

    if (searchText) {
      EventTracker.raise(Events.SEARCH_WORD, searchText);
      wordActions.searchWordAction(searchText, config.SEARCH_TYPE_BOOKMARK);
    } else {
      wordActions.loadWordAction();
    }
  }

  onChangeSearch = ({ target: { value } }) => {
    this.setState({ searchText: value.trim() });
    this.debouncedSearch();
  }

  onClickAddNew = (word) => {
    const { wordActions } = this.props;

    EventTracker.raise(Events.BOOKMARK_WORD, word);
    wordActions.addWordAction(word);
  }

  gotoAddNewWord = () => {
    const { history } = this.props;
    history.push(config.ADD_WORD_PAGE);
  }

  onClickMenu = (path) => {
    const { history } = this.props;
    history.push(path);
  }

  onCardAction = (word, actionType, cardRef) => {
    const { wordActions, wordState: { wordsOnWeb } } = this.props;

    if (actionType.includes('expand') && wordsOnWeb.length && wordsOnWeb.filter((obj) => (obj.word === word)).length) {
      EventTracker.raise(Events.SEARCH_WORD_ON_WEB, word);
      wordActions.searchWordAction(word, config.SEARCH_TYPE_WEB);
    } else if (actionType.includes('add')) {
      this.onClickAddNew(word);
    } else if (actionType.includes('delete')) {
      EventTracker.raise(Events.REMOVE_BOOKMARKED_WORD, word);
      wordActions.deleteWordAction(word);
    } else if (actionType.includes('share')) {
      EventTracker.raise(Events.SHARE_WORD, word);
    } else if (actionType.includes('copy')) {
      EventTracker.raise(Events.COPY_WORD, word);
      const cardTitle = cardRef.querySelector('.card-header .title');
      helper.copyToClipboard(cardTitle);
    }
  }

  render() {
    const { searchText } = this.state;
    const { wordState: { words, isError, wordsOnWeb, isLoading, isNoInitWords } } = this.props;
    let data = [];
    let buttonType;

    if (words && words.length) {
      data = words;
      buttonType = 'delete';
    } else if (wordsOnWeb && wordsOnWeb.length) {
      data = wordsOnWeb;
      buttonType = 'add';
    }

    const buttons = [buttonType, this.userFeature];
    const subInfo = (wordsOnWeb && wordsOnWeb.length) ? 'Following defeinitions are found.' : 'No definitions found for this word. Please recheck.';

    return (
      <div className="home-page">
        <Helmet>
          <title>WordPedia</title>
          <meta name="description" content="WordPedia homepage" />
        </Helmet>
        <Header>
          <div className="header-section">
            <Search onChange={this.onChangeSearch} value={searchText} />
            <Button icon={addIcon} className="add-word-btn" onClick={this.gotoAddNewWord} />
            <ToggleMenu icon={verticalDotsIcon} className="menu-list-custom" menus={this.menus} onClick={this.onClickMenu} />
          </div>
        </Header>
        <div className="body-container">
          { isLoading && <LoadingIndicator /> }
          { !isError && words.length === 0 && searchText && <Message text={`${searchText} is not added to your bookmark.`} subInfo={subInfo} /> }
          { isNoInitWords && <Button label="Add New Word" raisedButton className="add-word-btn" icon={addIcon} onClick={this.onClickAddNew} /> }
          <CardList cards={data} onAction={this.onCardAction} button={buttons} />
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
  wordActions: PropTypes.object,
  history: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
