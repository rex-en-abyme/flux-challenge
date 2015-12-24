/**
 * Created by airrex on 12/23/15.
 */

import initialState from './initial-state';
import * as Constants from './constants';
import * as Helpers from './helpers';
import actions from './actions';
import store from './store';
import _ from 'underscore';

export default function reducer(state = initialState, action = CONSTANTS.NONE) {

  switch (action.type) {

    case Constants.UPDATE_WORLD_EVENT:
      var copy = _.extend({}, state);
      copy.world.id = action.id;
      copy.world.name = action.name;
      return Helpers.refreshState(state, { canMutate: true });

    case Constants.SAVE_CURRENT_STATE:
      var copy = Helpers.refreshState(state, { canMutate: false });
      copy.siths[action.paramsObj.targetIndex] = action.paramsObj.sith;
      return copy;

    case Constants.FETCHING_STATUS_UPDATE:
      return Helpers.cloneAndUpdateProperty(state,
        Constants.keyForIsFetching, action.isFetching);

    case Constants.TOGGLE_BUTTON_DOWN:
      return Helpers.cloneAndUpdateProperty(state,
        Constants.keyForButtonDown, Constants.FROZEN_TRUE);

    case Constants.TOGGLE_BUTTON_UP:
      return Helpers.cloneAndUpdateProperty(state,
        Constants.keyForButtonUp, Constants.FROZEN_TRUE);

    case Constants.CLICK_EVENT_UP:
      return Helpers.handleUpClickEvent(state);

    case Constants.CLICK_EVENT_DOWN:
      return Helpers.handleDownClickEvent(state);

    case Constants.NONE:
      return state;

    default:
      return state;

  }

}
