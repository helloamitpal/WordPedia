import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import Search from '../../components/Search';
import FooterMenu from '../../components/FooterMenu';
import Icon from '../../components/Icon';
import { selectWordAction, searchWordAction } from '../../actions/wordActions';

import bookmarksIcon from '../../images/SVG/212-bookmarks.svg';
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
    const { dispatch } = this.props;
    dispatch(searchWordAction());
  }

  onChangeSearch = ({ target }) => {
    const { value } = target;
    const { dispatch } = this.props;
    this.setState({ searchText: value });
    dispatch(searchWordAction(value));
  }

  onClickAddNew = () => {

  }

  onClickSettings = () => {

  }

  onClickBookmarks = () => {

  }

  onSelectWord = (selectedWord) => {
    const { dispatch } = this.props;
    dispatch(selectWordAction(selectedWord));
  }

  render() {
    const { searchText } = this.state;
    const { words, selectedWord } = this.props;

    return (
      <div className="home-page">
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Application homepage" />
        </Helmet>
        <div className="search-section-container">
          <Search onChange={this.onChangeSearch} value={searchText} />
        </div>
        <div className="list-container">
          {
            words && words.map((item) => (
              <h1 key={item.name} className={`${selectedWord && selectedWord.name === item.name ? 'selected' : ''}`} onClick={() => this.onSelectWord(item)}>{item.name}</h1>
            ))
          }
        </div>
        <div className="menu-container">
          <FooterMenu menus={this.menuList} />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  words: PropTypes.array,
  selectedWord: PropTypes.object
};

const mapStateToProps = ({ words }) => ({
  words,
  selectedWord: words.selectedWord
});

export default connect(mapStateToProps)(HomePage);
