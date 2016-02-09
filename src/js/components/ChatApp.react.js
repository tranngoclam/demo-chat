/**
 * Created by lamtn on 2/8/16.
 */
import React from 'react';
import MessageSection from './MessageSection.react';
import ThreadSection from './ThreadSection.react';

class ChatApp extends React.Component {
  render() {
    return (
      <div className='chat-app'>
        <ThreadSection />
        <MessageSection />
      </div>
    )
  };
}

export default ChatApp;
