
import * as CONSTANTS from './constants';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from 'react-router';
import routes from './routes';
import store from './store';
import actions from './actions';

let rootElement = document.getElementById('app');
var socket = new WebSocket(CONSTANTS.SOCKET_ADDRESS);

function socketMessageHandler(message) {
  store.dispatch(actions.updateWorldEvent(JSON.parse(message.data)));
}

socket.onmessage = function(message) {
  if(!store.getState().is_fetching) {
    socketMessageHandler(message);
  }
};

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} />
  </Provider>,
  rootElement
);
