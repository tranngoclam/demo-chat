/**
 * Created by lamtn on 2/9/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import ChatApp from './components/ChatApp.react';
import ChatExampleData from './ChatExampleData';
import ChatWebAPIUtils from './utils/ChatWebAPIUtils';

ChatExampleData.init();

ChatWebAPIUtils.getAllMessages();

ReactDOM.render(<ChatApp />, document.getElementById('app'));
