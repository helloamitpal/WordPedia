import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Search from '../../components/Search';
import FooterMenu from '../../components/FooterMenu';
import Icon from '../../components/Icon';
import * as wordActionCreator from './wordActionCreator';

import bookmarksIcon from '../../images/SVG/212-bookmarks.svg';
import cogsIcon from '../../images/SVG/149-cog.svg';
import addIcon from '../../images/SVG/267-plus.svg';
import './HomePage.scss';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      selectedWord: null
    };
    this.menuList = [{
      icon: <Icon path={bookmarksIcon} />,
      onClick: this.onClickBookmarks
    }, {
      icon: <Icon path={addIcon} />,
      onClick: this.onClickAddNew
    }, {
      icon: <Icon path={cogsIcon} />,
      onClick: this.onClickSettings
    }];
  }

  componentDidMount() {
    const { wordActions } = this.props;
    wordActions.searchWordAction('');
  }

  onChangeSearch = ({ target }) => {
    const { value } = target;
    const { wordActions } = this.props;
    this.setState({ searchText: value });
    wordActions.searchWordAction(value);
  }

  onClickAddNew = () => {

  }

  onClickSettings = () => {

  }

  onClickBookmarks = () => {

  }

  onSelectWord = (selectedWord) => {
    this.setState({ selectedWord });
  }

  getListOfWords = (words, selectedWord) => {
    const list = words.map((item) => (
      <div key={item.name} className={`list-item ${selectedWord && selectedWord.name === item.name ? 'selected' : ''}`} onClick={() => this.onSelectWord(item)}>{item.name}</div>
    ));

    return (list.length) ? list : <div className="data-not-found">No records found</div>;
  }

  render() {
    const { searchText, selectedWord } = this.state;
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
          { isError ? <div className="error">Error occurred</div> : this.getListOfWords(words, selectedWord) }
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
