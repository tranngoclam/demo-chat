/**
 * Created by lamtn on 2/8/16.
 */
import React from 'react';
import moment from 'moment';

const PropTypes = React.PropTypes;

class MessageListItem extends React.Component {

  static propTypes = {
    message: PropTypes.object
  };

  render() {
    let message = this.props.message;
    return (
      <li className='message-list-item'>
        <h5 className='message-author-name'>{message.authorName}</h5>
        <div className='message-time'>
          {message.date.toLocaleTimeString()}
        </div>
        <div className='message-text'>{message.text}</div>
      </li>
    )
  }
}

export default MessageListItem;
