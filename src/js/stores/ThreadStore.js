/**
 * Created by lamtn on 2/8/16.
 */
import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import ChatConstants from '../constants/ChatConstants';
import ChatMessageUtils from '../utils/ChatMessageUtils';
import { EventEmitter } from 'events';

const ActionTypes = ChatConstants.ActionTypes;
const CHANGE_EVENT = 'CHANGE_EVENT';

let _currentID = null;
let _threads = {};

let ThreadStore = Object.assign({}, EventEmitter.prototype, {

  init(rawMessages) {
    rawMessages.forEach(message => {
      let threadID = message.threadID;
      let thread = _threads[threadID];
      if (thread && thread.lastMessage.timestamp > message.timestamp) {
        return;
      }
      _threads[threadID] = {
        id: threadID,
        name: message.threadName,
        lastMessage: ChatMessageUtils.convertRawMessage(message, _currentID)
      }
    }, this);

    if (!_currentID) {
      let allChrono = this.getAllChrono();
      _currentID = allChrono[allChrono.length - 1].id;
    }

    _threads[_currentID].lastMessage.isRead = true;
  },

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
    return _threads[id];
  },

  getAll() {
    return _threads;
  },

  getAllChrono() {
    let orderedThreads = [];
    for (let id in _threads) {
      let thread = _threads[id];
      orderedThreads.push(thread);
    }
    return orderedThreads.sort((t1, t2) => {
      return t2.lastMessage.date - t1.lastMessage.date;
    });
  },

  getCurrentID() {
    return _currentID;
  },

  getCurrent() {
    return this.get(this.getCurrentID());
  }
});

ThreadStore.dispatchToken = ChatAppDispatcher.register(action => {
  switch (action.type) {

    case ActionTypes.CLICK_THREAD:
      _currentID = action.threadID;
      _threads[_currentID].lastMessage.isRead = true;
      ThreadStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_MESSAGES:
      ThreadStore.init(action.rawMessages);
      ThreadStore.emitChange();
      break;

    // update lastMessage for ThreadListItem component when a message is created
    case ActionTypes.CREATE_MESSAGE:
      _threads[_currentID].lastMessage =
        ChatMessageUtils.getCreatedMessageData(action.text, action.currentThreadID);
      ThreadStore.emitChange();
      break;
  }
});

export default ThreadStore;
