/**
 * Created by lamtn on 2/8/16.
 */
import React from 'react';
import ThreadListItem from './ThreadListItem.react';
import ThreadStore from '../stores/ThreadStore';
import UnreadThreadStore from '../stores/UnreadThreadStore';

let getStateFromStores = () => {
  return {
    threads: ThreadStore.getAllChrono(),
    currentThreadID: ThreadStore.getCurrentID(),
    unreadCount: UnreadThreadStore.getCount()
  }
};

let getThreadListItem = (thread) => {
  return (
    <ThreadListItem
      key={thread.id}
      thread={thread}
      currentThreadID={this.state.currentThreadID}
    />
  )
};

class ThreadSection extends React.Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  state = getStateFromStores();

  componentDidMount() {
    ThreadStore.addChangeListener(this._onChange);
    UnreadThreadStore.addChangeListener(this._onChange);
  };

  componentWillUnmount() {
    ThreadStore.removeChangeListener(this._onChange);
    UnreadThreadStore.removeChangeListener(this._onChange);
  };

  render() {
    let threadListItems = this.state.threads.map(thread => {
      return (
        <ThreadListItem
          key={thread.id}
          thread={thread}
          currentThreadID={this.state.currentThreadID}
        />
      );
    }, this);
    let unread = this.state.unreadCount === 0 ?
        null :
        <span>Recent ({this.state.unreadCount})</span>;

    return (
      <div className='thread-section'>
        <div className='thread-count'>
          {unread}
        </div>
        <ul className='thread-list'>
          {threadListItems}
        </ul>
      </div>
    )
  };

  _onChange() {
    this.setState(getStateFromStores());
  }
}

export default ThreadSection;
