import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';

import Search from '../../components/Search';
import FooterMenu from '../../components/FooterMenu';
import * as wordActionCreator from './wordActionCreator';
import CardList from '../../components/CardList';
import Button from '../../components/Button';
import config from '../../config';
import Events from '../../event-tracker/events';
import EventTracker from '../../event-tracker';
import Features from '../../util/features';
import * as helper from '../../util/helper';

import cogsIcon from '../../images/SVG/149-cog.svg';
import addIcon from '../../images/SVG/267-plus.svg';
import './HomePage.scss';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: ''
    };
    this.userFeature = Features.sharable ? 'share' : 'copy';
    this.debouncedSearch = debounce(this.searchAPICall, 20);
    this.menuList = [{
      icon: addIcon,
      onClick: this.gotoAddNewWord
    }, {
      icon: cogsIcon,
      onClick: this.gotoSettings
    }];
  }

  componentDidMount() {
    const { wordActions, wordState: { words } } = this.props;
    EventTracker.raise(Events.HOME_PAGE);
    if (!words || !words.length) {
      wordActions.loadWordAction();
    }
  }

  componentDidUpdate() {
    const { searchText } = this.state;
    const { wordState: { words, isError, wordsOnWeb } } = this.props;

    if (isError && !Features.online && !toast.isActive('error')) {
      toast.error('Something went wrong. Please try again.', { toastId: 'error' });
    } else if (!isError && words.length === 0 && searchText && !toast.isActive('info')) {
      const subInfo = (wordsOnWeb && wordsOnWeb.length) ? 'Following defeinitions are found.' : 'No definitions found for this word. Please recheck.';
      toast.info(`${searchText} is not added to your bookmark. ${subInfo}`, { toastId: 'info' });
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

  gotoSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  gotoAddNewWord = () => {
    const { history } = this.props;
    history.push('/addWord');
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
    const { wordState: { words, isError, wordsOnWeb } } = this.props;
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

    return (
      <div className="home-page">
        <Helmet>
          <title>WordPedia</title>
          <meta name="description" content="WordPedia homepage" />
        </Helmet>
        <div className="search-section-container gradient-background">
          <Search onChange={this.onChangeSearch} value={searchText} />
        </div>
        <div className="list-container">
          { !isError && words.length === 0 && !searchText && <Button label="Add Word" icon={addIcon} onClick={this.onClickAddNew} /> }
          <CardList cards={data} onAction={this.onCardAction} button={buttons} />
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
  wordActions: PropTypes.object,
  history: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
