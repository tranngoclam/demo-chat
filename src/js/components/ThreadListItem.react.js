/**
 * Created by lamtn on 2/8/16.
 */
import ChatThreadActionCreators from '../actions/ChatThreadActionCreators';
import React from 'react';
import classNames from 'classnames';

const PropTypes = React.PropTypes;

class ThreadListItem extends React.Component {
  static propTypes = {
    thread: PropTypes.object,
    currentThreadID: PropTypes.string
  };

  render() {
    console.log(this.props);

    // get thread and last message from props
    let thread = this.props.thread;
    let lastMessage = thread.lastMessage;

    // className combination
    let className = classNames({
      'thread-list-item': true,
      'active': thread.id === this.props.currentThreadID
    });

    console.log(thread.name);
    return (
      <li className={className} onClick={this._onClick.bind(this)}>
        <h5 className='thread-name'>{thread.name}</h5>
        <div className='thread-time'>{lastMessage.date.toLocaleTimeString()}</div>
        <div className='thread-last-message'>{lastMessage.text}</div>
      </li>
    )
  };

  _onClick() {
    console.log(this.props);
    ChatThreadActionCreators.clickThread(this.props.thread.id);
  }
}

export default ThreadListItem;
