/**
 * Created by lamtn on 2/8/16.
 */
import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import ChatConstants from '../constants/ChatConstants';
import { EventEmitter } from 'events';
import MessageStore from './MessageStore';
import ThreadStore from './ThreadStore';

const ActionTypes = ChatConstants.ActionTypes;
const CHANGE_EVENT = 'CHANGE_EVENT';

let UnreadThreadStore = Object.assign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCount() {
    let threads = ThreadStore.getAll();
    let unreadCount = 0;
    for (let id in threads) {
      if (!threads[id].lastMessage.isRead) {
        unreadCount++;
      }
    }

    return unreadCount;
  }
});

UnreadThreadStore.dispatchToken = ChatAppDispatcher.register(action => {
  ChatAppDispatcher.waitFor([
    ThreadStore.dispatchToken,
    MessageStore.dispatchToken
  ]);

  switch (action.type) {

    case ActionTypes.CLICK_THREAD:
      UnreadThreadStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_MESSAGES:
      UnreadThreadStore.emitChange();
      break;
  }
});

export default UnreadThreadStore;
