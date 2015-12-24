/**
 * Created by airrex on 12/23/15.
 */

import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './star-wars';
import initialState from './initial-state';

module.exports = applyMiddleware( thunkMiddleware )( createStore )( reducer, initialState() );
