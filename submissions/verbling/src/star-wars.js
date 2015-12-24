/**
 * Created by airrex on 12/23/15.
 */

import * as CONSTANTS from './constants';
import initialState from './initial-state';
import actions from './actions';
import store from './store';
import _ from 'underscore';

//TODO move helper functions out to another file
function emptySithGenerator(id) {
  return { id: id, name: '', master: '', apprentice: '', homeworld: { id: '', name: '', matches_current_planet: '' } };
}

function updateCurrentPlanetBooleanEachSith(obj) {
  var currentPlanetId = obj.world.id;
  obj.siths.map(function(sith, idx) {
    if(sith.homeworld.id === currentPlanetId) {
      obj.siths[idx].homeworld.matches_current_planet = CONSTANTS.CURRENT_PLANET_TRUE;
      sith.homeworld.matches_current_planet = CONSTANTS.CURRENT_PLANET_TRUE;
    } else {
      obj.siths[idx].homeworld.matches_current_planet = CONSTANTS.CURRENT_PLANET_FALSE;
      sith.homeworld.matches_current_planet = CONSTANTS.CURRENT_PLANET_FALSE;
    }
    return sith;
  });
  return obj;
}

function updateButtonStateFrozenIfMatchOrTerminalNode(obj) {
  var matches = [], noMaster = false, noApprentice = false;
  obj.button_up = CONSTANTS.FROZEN_FALSE;
  obj.button_down = CONSTANTS.FROZEN_FALSE;
  obj.siths.map(function(sith) {
    if(sith.homeworld.matches_current_planet === CONSTANTS.CURRENT_PLANET_TRUE) {
      matches.push(sith.homeworld.matches_current_planet);
    }
    if(sith.apprentice === null) noApprentice = true;
    if(sith.master === null) noMaster = true;
  });
  if(matches.length > 0) {
    obj.button_up = CONSTANTS.FROZEN_TRUE;
    obj.button_down = CONSTANTS.FROZEN_TRUE;
  }
  if(noMaster) obj.button_up = CONSTANTS.FROZEN_TRUE;
  if(noApprentice) obj.button_down = CONSTANTS.FROZEN_TRUE;
  return obj;
}

//TODO Generalize these for moving item list by both 1 or 2
function handleUpClickEvent(param) {
  var obj = _.extend({}, param);
  var newSiths = [];
  var oldSiths = [];
  obj.siths.map(function(sith, idx) {
    if(idx === 0) {
      newSiths.push(emptySithGenerator(idx));
    }
    if(idx === 0 || idx === 1 || idx === 2 || idx === 3) {
      oldSiths.push(sith);
    }
  });
  oldSiths.map(function(sith) {
    newSiths.push(sith);
  });
  obj.siths = newSiths;
  return obj;
}


//TODO Generalize these for moving item list by both 1 or 2
function handleDownClickEvent(param) {
  var obj = _.extend({}, param);
  var newSiths = [];
  obj.siths.map(function(sith, idx) {
    if(idx === 1 || idx === 2 || idx === 3 || idx === 4) {
      newSiths.push(sith);
    }
  });
  //newSiths.push(emptySithGenerator(3));
  newSiths.push(emptySithGenerator(4));
  obj.siths = newSiths;
  return obj;
}
/*These are for moving two items
 function handleUpClickEvent(param) {
 var obj = _.extend({}, param);
 var newSiths = [];
 var oldSiths = [];
 obj.siths.map(function(sith, idx) {
 if(idx === 0 || idx === 1) {
 newSiths.push(emptySithGenerator(idx));
 }
 if(idx === 0 || idx === 1 || idx === 2) {
 oldSiths.push(sith);
 }
 });
 oldSiths.map(function(sith) {
 newSiths.push(sith);
 });
 obj.siths = newSiths;
 return obj;
 }

 function handleDownClickEvent(param) {
 var obj = _.extend({}, param);
 var newSiths = [];
 obj.siths.map(function(sith, idx) {
 if(idx === 2 || idx === 3 || idx === 4) {
 newSiths.push(sith);
 }
 });
 newSiths.push(emptySithGenerator(3));
 newSiths.push(emptySithGenerator(4));
 obj.siths = newSiths;
 return obj;
 }
 */

export default function reducer(state = initialState, action = CONSTANTS.NONE) {
  switch (action.type) {

    case CONSTANTS.UPDATE_WORLD_EVENT:
      state.world.id = action.id;
      state.world.name = action.name;
      var res2 = updateCurrentPlanetBooleanEachSith(state);
      var res3 = updateButtonStateFrozenIfMatchOrTerminalNode(res2);
      var output = _.extend({}, res3);
      return output;

    case CONSTANTS.CLICK_EVENT_UP:
      var res = handleUpClickEvent(state);
      var res2 = updateCurrentPlanetBooleanEachSith(res);
      var res3 = updateButtonStateFrozenIfMatchOrTerminalNode(res2);
      return res3;

    case CONSTANTS.CLICK_EVENT_DOWN:
      var res = handleDownClickEvent(state);
      var res2 = updateCurrentPlanetBooleanEachSith(res);
      var res3 = updateButtonStateFrozenIfMatchOrTerminalNode(res2);
      return res3;

    case CONSTANTS.SAVE_CURRENT_STATE:
      // TODO put action.sith at index 1 of state.siths then return siths
      // TODO but needs to be a new copy of the state object
      var obj = _.extend({}, state);
      obj.siths[action.paramsObj.targetIndex] = action.paramsObj.sith;
      var res2 = updateCurrentPlanetBooleanEachSith(obj);
      var res3 = updateButtonStateFrozenIfMatchOrTerminalNode(res2);
      return res3;

    case CONSTANTS.FETCHING_STATUS_UPDATE:
      var res = _.extend({}, state);
      res.is_fetching = action.isFetching;
      //TODO Maybe add the following if state is not up to date
      //var res2 = updateCurrentPlanetBooleanEachSith(obj);
      //var res3 = updateButtonStateFrozenIfMatchOrTerminalNode(res2);
      return res;

    case CONSTANTS.TOGGLE_BUTTON_DOWN:
      var obj = _.extend({}, state);
      obj.button_down = CONSTANTS.FROZEN_TRUE;
      //TODO Maybe add the following if state is not up to date
      //var res2 = updateCurrentPlanetBooleanEachSith(obj);
      //var res3 = updateButtonStateFrozenIfMatchOrTerminalNode(res2);
      return obj;

    case CONSTANTS.TOGGLE_BUTTON_UP:
      var obj = _.extend({}, state);
      obj.button_up = CONSTANTS.FROZEN_TRUE;
      //TODO Maybe add the following if state is not up to date
      //var res2 = updateCurrentPlanetBooleanEachSith(obj);
      //var res3 = updateButtonStateFrozenIfMatchOrTerminalNode(res2);
      return obj;

    case CONSTANTS.NONE:
      return state;

    default:
      return state;

  }

}
