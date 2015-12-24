/**
 * Created by airrex on 12/23/15.
 */

import initialState from './initial-state';
import * as Constants from './constants';
import actions from './actions';
import store from './store';
import _ from 'underscore';

export function refreshState(state, param) {
  var clone = param.canMutate ? state : _.extend({}, state);
  var temp = updateCurrentPlanetBooleanEachSith(clone);
  var out = updateButtonStateFrozenIfMatchOrTerminalNode(temp);
  return out;
}

export function generateTemporaryRandomId() {
  return Math.floor(Math.random()*1000);
}

export function adjustListStateUpOnePosition(param) {
  var obj = _.extend({}, param);
  var newSiths = [];
  var oldSiths = [];
  obj.siths.map(function(sith, idx) {
    if(idx === 0) newSiths.push(emptySithGenerator(generateTemporaryRandomId()));
    if(idx === 0 || idx === 1 || idx === 2 || idx === 3) oldSiths.push(sith);
  });
  oldSiths.map(function(sith) {
    newSiths.push(sith);
  });
  obj.siths = newSiths;
  return obj;
}

export function adjustListStateDownOnePosition(param) {
  var obj = _.extend({}, param);
  var newSiths = [];
  obj.siths.map(function(sith, idx) {
    if(idx === 1 || idx === 2 || idx === 3 || idx === 4) newSiths.push(sith);
  });
  newSiths.push(emptySithGenerator(generateTemporaryRandomId()));
  obj.siths = newSiths;
  return obj;
}

export function updateCurrentPlanetBooleanEachSith(obj) {
  var currentPlanetId = obj.world.id;
  obj.siths.map(function(sith, idx) {
    if(sith.homeworld.id === currentPlanetId) {
      obj.siths[idx].homeworld.matches_current_planet = Constants.CURRENT_PLANET_TRUE;
      sith.homeworld.matches_current_planet = Constants.CURRENT_PLANET_TRUE;
    } else {
      obj.siths[idx].homeworld.matches_current_planet = Constants.CURRENT_PLANET_FALSE;
      sith.homeworld.matches_current_planet = Constants.CURRENT_PLANET_FALSE;
    }
    return sith;
  });
  return obj;
}

export function updateButtonStateFrozenIfMatchOrTerminalNode(obj) {
  var matches = [], noMaster = false, noApprentice = false;
  obj.button_up = Constants.FROZEN_FALSE;
  obj.button_down = Constants.FROZEN_FALSE;
  obj.siths.map(function(sith) {
    if(sith.homeworld.matches_current_planet === Constants.CURRENT_PLANET_TRUE) matches.push(sith.homeworld.matches_current_planet);
    if(sith.apprentice === null) noApprentice = true;
    if(sith.master === null) noMaster = true;
  });
  if(matches.length > 0) {
    obj.button_up = Constants.FROZEN_TRUE;
    obj.button_down = Constants.FROZEN_TRUE;
  }
  if(noMaster) obj.button_up = Constants.FROZEN_TRUE;
  if(noApprentice) obj.button_down = Constants.FROZEN_TRUE;
  return obj;
}

export function cloneAndUpdateProperty(state, key, updatedPropValue) {
  var res = _.extend({}, state);
  res[key] = updatedPropValue;
  return res;
}

export function handleUpClickEventTwoSpaces(param) {
  var rotatedOnce = adjustListStateUpOnePosition(param);
  var rotatedTwice = adjustListStateUpOnePosition(rotatedOnce);
  var out = refreshState(rotatedTwice, { canMutate: true });
  return out;
}

export function handleDownClickEventTwoSpaces(param) {
  var rotatedOnce = adjustListStateDownOnePosition(param);
  var rotatedTwice = adjustListStateDownOnePosition(rotatedOnce);
  var out = refreshState(rotatedTwice, { canMutate: true });
  return out;
}

export function emptySithGenerator(id) {
  return {
    id: id,
    name: '',
    master: '',
    apprentice: '',
    homeworld: {
      id: '',
      name: '',
      matches_current_planet: ''
    }
  };
}
