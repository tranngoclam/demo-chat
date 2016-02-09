/**
 * Created by lamtn on 2/9/16.
 */
import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import ChatConstants from '../constants/ChatConstants';

const ActionTypes = ChatConstants.ActionTypes;

export default {
  clickThread(threadID) {
    ChatAppDispatcher.dispatch({
      type: ActionTypes.CLICK_THREAD,
      threadID: threadID
    });
  }
}
