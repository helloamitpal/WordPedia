import Events from './events';

class EventTracker {
  static raise(eventName, val) {
    if (eventName === Events.INSTALLED) {
      // install event tracker
    } else if (eventName === Events.INSTALL_REJECTED) {
      // install rejected event tracker
    } else if (eventName === Events.SEARCH_WORD) {
      // search word event tracker
    } else if (eventName === Events.BOOKMARK_WORD) {
      // bookmark event tracker
    } else if (eventName === Events.SETTINGS_PAGE) {
      // setting page tracker
    } else if (eventName === Events.SEARCH_WORD_ON_WEB) {
      // searh word event tracker
    } else if (eventName === Events.REMOVE_BOOKMARKED_WORD) {
      // remove bookmark event tracker
    } else if (eventName === Events.HOME_PAGE) {
      // home page tracker
    } else if (eventName === Events.COPY_WORD) {
      // copy word event tracker
    } else if (eventName === Events.SHARE_WORD) {
      // share word event tracker
    }
  }
}

export default EventTracker;
