/**
 * Created by lamtn on 2/8/16.
 */
import ChatThreadActionCreators from '../actions/ChatThreadActionCreators';
import React from 'react';
import { Router, Route, Link } from 'react-router';
import classNames from 'classnames';

const PropTypes = React.PropTypes;

class ThreadListItem extends React.Component {

  constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);
  }

  static propTypes = {
    thread: PropTypes.object,
    currentThreadID: PropTypes.string
  };

  render() {

    // get thread and last message from props
    let thread = this.props.thread;
    let lastMessage = thread.lastMessage;

    // className combination
    let className = classNames({
      'thread-list-item': true,
      'active': thread.id === this.props.currentThreadID
    });

    return (
      //<Link to={`/threads/${thread.id}`}>
        <li className={className} onClick={this._onClick}>
          <h5 className='thread-name'>{thread.name}</h5>
          <div className='thread-time'>{lastMessage.date.toLocaleTimeString()}</div>
          <div className='thread-last-message'>{lastMessage.text}</div>
        </li>
      //</Link>
    )
  };

  _onClick() {
    ChatThreadActionCreators.clickThread(this.props.thread.id);
  }
}

export default ThreadListItem;
