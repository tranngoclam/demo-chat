/**
 * Created by lamtn on 2/8/16.
 */
import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import ChatConstants from '../constants/ChatConstants';
import ThreadStore from '../stores/ThreadStore';
import ChatMessageUtils from '../utils/ChatMessageUtils';
import { EventEmitter } from 'events';

const ActionTypes = ChatConstants.ActionTypes;
const CHANGE_EVENT = 'CHANGE_EVENT';

let _messages = [];

let _addMessages = (rawMessages) => {
  rawMessages
    .filter(message => !_messages[message.id])
    .map(message => {
      _messages[message.id] = ChatMessageUtils.convertRawMessage(
        message,
        ThreadStore.getCurrentID());
    });
};

let _markAllInThreadRead = (threadID) => {
  _messages
    .filter(message => message.threadID === threadID)
    .map(message => message.isRead = true);
};

let MessageStore = Object.assign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get(id) {
    return _messages[id];
  },

  getAll() {
    return _messages;
  },

  getAllForThread(threadID) {
    let threadMessages = [];
    for (let id in _messages) {
      if (_messages[id].threadID === threadID) {
        threadMessages.push(_messages[id]);
      }
    }
    threadMessages.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      }
      return 0;
    });
    return threadMessages;
  },

  getAllForCurrentThread() {
    return this.getAllForThread(ThreadStore.getCurrentID());
  }
});

MessageStore.dispatchToken = ChatAppDispatcher.register(action => {

  switch (action.type) {

    case ActionTypes.CLICK_THREAD:
      ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
      _markAllInThreadRead(ThreadStore.getCurrentID());
      break;

    case ActionTypes.CREATE_MESSAGE:
      let message = ChatMessageUtils.getCreatedMessageData(
        action.text,
        action.currentThreadID
      );
      _messages[message.id] = message;
      break;

    case ActionTypes.RECEIVE_RAW_MESSAGES:
      _addMessages(action.rawMessages);
      ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
      _markAllInThreadRead(ThreadStore.getCurrentID());
      break;
  }

  MessageStore.emitChange();
});

export default MessageStore;
