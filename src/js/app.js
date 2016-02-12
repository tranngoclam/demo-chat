/**
 * Created by lamtn on 2/9/16.
 */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';
import { createHistory, useBasename } from 'history'
import ChatApp from './components/ChatApp.react';
import ChatExampleData from './ChatExampleData';
import ChatWebAPIUtils from './utils/ChatWebAPIUtils';

const history = useBasename(createHistory)({
  //basename: '/messages',
  queryKey: false
});

ChatExampleData.init();
ChatWebAPIUtils.getAllMessages();

render((
  <Router history={history}>
    <Route path='/' component={ChatApp}>
      <Route path='threads/:threadID' component={ChatApp}/>
    </Route>
  </Router>
), document.getElementById('app'));
