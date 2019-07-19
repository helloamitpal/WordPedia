import Events from './events';

class EventTracker {
  static raise(eventName, val) {
    if (eventName === Events.INSTALLED) {
      // install event tracker
    } else if (eventName === Events.INSTALL_REJECTED) {
      // install rejected event tracker
    } else if (eventName === Events.SEARCH_WORD) {
      // search word event tracker
    }
  }
}

export default EventTracker;
