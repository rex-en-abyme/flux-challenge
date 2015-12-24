/**
 * Created by airrex on 12/23/15.
 */

import * as CONSTANTS from './constants';
import fetch from 'isomorphic-fetch'

var actions = {

  updateWorldEvent (worldMessage){
    return {
      type: CONSTANTS.UPDATE_WORLD_EVENT,
      name: worldMessage.name,
      id: worldMessage.id
    };
  },

  clickEventUp () {
    return { type: CONSTANTS.CLICK_EVENT_UP };
  },

  clickEventDown () {
    return { type: CONSTANTS.CLICK_EVENT_DOWN };
  },

  isFetching (bool) {
    return { type: CONSTANTS.FETCHING_STATUS_UPDATE, isFetching: bool }
  },

  toggleButtonUp () {
    return { type: CONSTANTS.TOGGLE_BUTTON_UP };
  },

  toggleButtonDown () {
    return { type: CONSTANTS.TOGGLE_BUTTON_DOWN };
  },

  receiveSithInformation (paramsObj) {
    return {
      type: CONSTANTS.SAVE_CURRENT_STATE,
      paramsObj
    };
  },

  getSithInfo (paramsObj) {
    var inheritanceDirectionality = paramsObj.inheritanceDirectionality, relationId = paramsObj.relationId;
    return dispatch => {

      if(paramsObj.relationId === null) {
        // If Jedi is first-most or last in list;
        if(inheritanceDirectionality === CONSTANTS.MASTER) dispatch(actions.toggleButtonUp());
        if(inheritanceDirectionality === CONSTANTS.APPRENTICE) dispatch(actions.toggleButtonDown());
        return { type: CONSTANTS.NONE };
      }

      dispatch(actions.isFetching(true));

      return fetch(`${CONSTANTS.WEB_ADDRESS}${paramsObj.relationId}`)
        .then(response => response.json())
        .then(function(targetSith) {
          paramsObj.sith = targetSith;
          paramsObj.targetId = targetSith.id;
          /* master/ apprentice ID properties of response obj are nested a layer deeper than on siths from dark-jedis list */
          if(inheritanceDirectionality === CONSTANTS.MASTER) {
            paramsObj.sith.master = targetSith.master.id;
          } else if(inheritanceDirectionality === CONSTANTS.APPRENTICE) {
            paramsObj.sith.apprentice = targetSith.apprentice.id;
          }
          dispatch(actions.receiveSithInformation(paramsObj));
          dispatch(actions.isFetching(false));
        });
    }
  }

};

module.exports = actions;
