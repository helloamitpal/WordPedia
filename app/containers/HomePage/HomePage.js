import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debounce } from 'lodash';

import Input from '../../components/Input';
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
    const text = value.trim();
    this.setState({ searchText: text });

    if (text.length > 1 || text.length === 0) {
      this.debouncedSearch();
    }
  }

  onClickAddNew = (wordObj) => {
    const { wordActions } = this.props;
    const { word } = wordObj;

    EventTracker.raise(Events.BOOKMARK_WORD, word);
    wordActions.addWordAction(wordObj);
  }

  gotoAddNewWord = () => {
    const { history } = this.props;
    history.push(config.ADD_WORD_PAGE);
  }

  onClickMenu = (evt, path) => {
    evt.stopPropagation();

    const { history } = this.props;
    history.push(path);
  }

  onClearInput = () => {
    this.setState({ searchText: '' });
    this.debouncedSearch();
  }

  onCardAction = (wordObj, actionType, cardRef, synonymWord) => {
    const { wordActions } = this.props;
    const { word } = wordObj;

    if (actionType.includes('expand')) {
      EventTracker.raise(Events.SEARCH_WORD_ON_WEB, word);
      wordActions.searchWordAction(word, config.SEARCH_TYPE_WEB);
    } else if (actionType.includes('add')) {
      this.onClickAddNew(wordObj);
    } else if (actionType.includes('delete')) {
      EventTracker.raise(Events.REMOVE_BOOKMARKED_WORD, word);
      wordActions.deleteWordAction(word);
    } else if (actionType.includes('share')) {
      EventTracker.raise(Events.SHARE_WORD, word);
    } else if (actionType.includes('copy')) {
      EventTracker.raise(Events.COPY_WORD, word);
      const cardTitle = cardRef.querySelector('.card-header .title');
      helper.copyToClipboard(cardTitle);
    } else if (actionType.includes('synonym')) {
      EventTracker.raise(Events.FIND_SYNONYM, synonymWord);
      this.setState({ searchText: synonymWord });
      wordActions.searchWordAction(synonymWord, config.SEARCH_TYPE_WEB, 'synonym');
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
      <div className="home-page container">
        <Helmet>
          <title>WordPedia</title>
          <meta name="description" content="WordPedia homepage" />
        </Helmet>
        <Header>
          <div className="header-section">
            <Input type="search" onClearInput={this.onClearInput} onChange={this.onChangeSearch} placeholder="At least 2 characters" value={searchText} />
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
