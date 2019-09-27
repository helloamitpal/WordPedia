import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import Modal from 'react-responsive-modal';

import Input from '../../components/Input';
import Header from '../../components/Header';
import * as userActionCreator from './userActionCreator';
import CardList from '../../components/CardList';
import LoadingIndicator from '../../components/LoadingIndicator';
import ProfilePic from '../../components/ProfilePic';
import Message from '../../components/Message';
import config from '../../config';
import Events from '../../event-tracker/events';
import EventTracker from '../../event-tracker';
import Features from '../../util/features';
import * as helper from '../../util/helper';
import { askConfirmation } from '../../components/Confirm';
import RichInput from './RichInput';

import './HomePage.scss';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      openModal: false
    };
    this.userFeature = Features.sharable ? 'share' : 'copy';
    this.debouncedSearch = debounce(this.searchAPICall, 300);
  }

  componentDidMount() {
    const { userActions, userState: { words, user: { userId } } } = this.props;

    EventTracker.raise(Events.HOME_PAGE);
    if (!words || !words.length) {
      userActions.loadWordAction(userId);
    }
  }

  componentWillReceiveProps(newProps) {
    const { userActions, userState: { deleted, word, user: { userId } } } = newProps;

    if (deleted) {
      const toastId = `toast-${word}ID`;
      askConfirmation({
        confirmText: `${word} deleted`,
        buttonLabel: 'Undo',
        toastId,
        autoClose: config.TOAST_AUTO_CLOSE_DURATION
      })
        .then(() => {
          userActions.addWordAction({ word }, userId, `${word} is added back to bookmark`);
        })
        .catch(() => {
          toast.success(`${word} has been removed from bookmark`);
        });
    }
  }

  searchAPICall = () => {
    const { userActions, userState: { user: { userId } } } = this.props;
    const { searchText } = this.state;

    if (searchText) {
      EventTracker.raise(Events.SEARCH_WORD, searchText);
      userActions.searchWordAction(searchText, config.SEARCH_TYPE_BOOKMARK, null, userId);
    } else {
      userActions.loadWordAction(userId);
    }
  }

  onChangeSearch = ({ target: { value } }) => {
    const text = value.trim();
    this.setState({ searchText: text });

    if (text.length > 1 || text.length === 0) {
      this.debouncedSearch();
    }
  }

  onClickAddNew = (userActions, wordObj, userId) => {
    const { word } = wordObj;

    if (userId) {
      EventTracker.raise(Events.BOOKMARK_WORD, word);
      userActions.addWordAction(wordObj, userId);
    } else {
      toast.info('Please register yourself to add this word');
    }
  }

  navigateTo = (path) => {
    const { history } = this.props;
    history.push(path);
  }

  onClearInput = () => {
    this.setState({ searchText: '' });
    this.debouncedSearch();
  }

  onCardAction = (wordObj, actionType, cardRef, synonymWord) => {
    const { userActions, userState: { user: { userId } } } = this.props;
    const { word } = wordObj;

    if (actionType.includes('expand')) {
      EventTracker.raise(Events.SEARCH_WORD_ON_WEB, word);
      userActions.searchWordAction(word, config.SEARCH_TYPE_WEB);
    } else if (actionType.includes('add')) {
      this.onClickAddNew(userActions, wordObj, userId);
    } else if (actionType.includes('delete')) {
      EventTracker.raise(Events.REMOVE_BOOKMARKED_WORD, word);
      userActions.deleteWordAction(word, userId);
    } else if (actionType.includes('share')) {
      EventTracker.raise(Events.SHARE_WORD, word);
    } else if (actionType.includes('copy')) {
      EventTracker.raise(Events.COPY_WORD, word);
      const cardTitle = cardRef.querySelector('.card-header .title');
      helper.copyToClipboard(cardTitle);
    } else if (actionType.includes('synonym')) {
      EventTracker.raise(Events.FIND_SYNONYM, synonymWord);
      this.setState({ searchText: synonymWord });
      userActions.searchWordAction(synonymWord, config.SEARCH_TYPE_WEB, 'synonym');
    }
  }

  onOpenRichInputModal = () => {
    this.setState({ openModal: true });
  }

  onAcceptRichInput = (searchText) => {
    this.setState({ searchText, openModal: false });
    this.debouncedSearch();
  }

  onCloseModal = () => {
    this.setState({ openModal: false });
  }

  render() {
    const { searchText, openModal } = this.state;
    const { userState: { words, isError, wordsOnWeb, isLoading, isNoInitWords, user: { userId, profilePicture } } } = this.props;
    let data = [];
    let buttonType;

    if (words && words.length) {
      data = words;
      buttonType = ((userId) ? 'delete' : null); // delete button would appear only if user is registered
    } else if (wordsOnWeb && wordsOnWeb.length) {
      data = wordsOnWeb;
      buttonType = 'add';
    }

    const buttons = buttonType ? [buttonType, this.userFeature] : [this.userFeature];
    const subInfo = (wordsOnWeb && wordsOnWeb.length) ? 'Following defeinitions are found.' : 'No definitions found for this word. Please recheck.';

    return (
      <div className="home-page container">
        <Helmet>
          <title>WordPedia</title>
          <meta name="description" content="WordPedia homepage" />
        </Helmet>
        <Header>
          <div className="header-section">
            <ProfilePic path={profilePicture} onClick={() => this.navigateTo(config.SETTINGS_PAGE)} />
            <Input type="search" onSecondaryInput={this.onOpenRichInputModal} onClearInput={this.onClearInput} onChange={this.onChangeSearch} placeholder="At least 2 characters" value={searchText} />
            <Modal open={openModal} onClose={this.onCloseModal} center>
              <RichInput onAcceptInput={this.onAcceptRichInput} />
            </Modal>
          </div>
        </Header>
        <div className="body-container">
          { isLoading && <LoadingIndicator /> }
          { !isError && words && words.length === 0 && searchText && <Message className="home-message" text={`${searchText} is not added to your bookmark.`} subInfo={subInfo} /> }
          { (isNoInitWords && wordsOnWeb.length === 0 && words.length === 0)
            && (
              <div className="no-word-found">Register yourself to bookmark your first word and more to improve your vocabulary. </div>
            )
          }
          <CardList cards={data} onAction={this.onCardAction} button={buttons} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(userActionCreator, dispatch)
});

const mapStateToProps = (state) => ({
  userState: state.user
});

HomePage.propTypes = {
  userState: PropTypes.object,
  userActions: PropTypes.object,
  history: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
