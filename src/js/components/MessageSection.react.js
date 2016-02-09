/**
 * Created by lamtn on 2/8/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import MessageListItem from './MessageListItem.react';
import MessageComposer from './MessageComposer.react';
import MessageStore from '../stores/MessageStore';
import ThreadStore from '../stores/ThreadStore';

let getStateFromStores = () => {
  return {
    messages: MessageStore.getAllForCurrentThread(),
    thread: ThreadStore.getCurrent()
  }
};

let getMessageListItem = (message) => {
  return (
    <MessageListItem
      key={message.id}
      message={message}
    />
  )
};

class MessageSection extends React.Component {
  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);
    this._scrollToBottom = this._scrollToBottom.bind(this);
  }

  state = getStateFromStores();

  componentDidMount() {
    this._scrollToBottom();
    MessageStore.addChangeListener(this._onChange);
    ThreadStore.addChangeListener(this._onChange);
  };

  componentWillUnmount() {
    MessageStore.removeChangeListener(this._onChange);
    ThreadStore.removeChangeListener(this._onChange);
  };

  render() {
    console.log(this.state.messages);
    let messageListItems = this.state.messages.map(getMessageListItem);

    return (
      <div className='message-section'>
        <h3 className='message-thread-heading'>{this.state.thread.name}</h3>
        <ul className='message-list' ref='messageList'>
          {messageListItems}
        </ul>
        <MessageComposer threadID={this.state.thread.id}/>
      </div>
    )
  };

  componentDidUpdate() {
    this._scrollToBottom();
  };

  _scrollToBottom() {
    let ul = this.refs.messageList;
    ul.scrollTop = ul.scrollHeight;
  };

  _onChange() {
    this.setState(getStateFromStores());
  }
}

export default MessageSection;
