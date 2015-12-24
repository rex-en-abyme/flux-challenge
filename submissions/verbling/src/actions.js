/**
 * Created by airrex on 12/23/15.
 */

import * as Constants from './constants';
import fetch from 'isomorphic-fetch'

var actions = {

  updateWorldEvent (message){
    return {
      type: Constants.UPDATE_WORLD_EVENT,
      name: message.name,
      id: message.id
    };
  },

  clickEventUp () {
    return { type: Constants.CLICK_EVENT_UP };
  },

  clickEventDown () {
    return { type: Constants.CLICK_EVENT_DOWN };
  },

  isFetching (bool) {
    return { type: Constants.FETCHING_STATUS_UPDATE, isFetching: bool }
  },

  toggleButtonUp () {
    return { type: Constants.TOGGLE_BUTTON_UP };
  },

  toggleButtonDown () {
    return { type: Constants.TOGGLE_BUTTON_DOWN };
  },

  receiveSithInformation (paramsObj) {
    return {
      type: Constants.SAVE_CURRENT_STATE,
      paramsObj
    };
  },

  getSithInfo (paramsObj, stop) {
    var inheritanceDirectionality = paramsObj.inheritanceDirectionality, relationId = paramsObj.relationId;
    return dispatch => {

      if(relationId === null) {
        if(inheritanceDirectionality === Constants.MASTER) dispatch(actions.toggleButtonUp());
        if(inheritanceDirectionality === Constants.APPRENTICE) dispatch(actions.toggleButtonDown());
        return { type: Constants.NONE };
      }

      dispatch(actions.isFetching(true));

      return fetch(`${Constants.WEB_ADDRESS}${paramsObj.relationId}`)
        .then(response => response.json())
        .then(function(targetSith) {
          var outputObj = {};

          outputObj.sith = targetSith;
          outputObj.targetId = targetSith.id;
          outputObj.targetIndex = paramsObj.targetIndex;
          /* master/ apprentice ID properties of response obj are nested a layer deeper than on siths from dark-jedis list */
          if(inheritanceDirectionality === Constants.MASTER) {
            outputObj.sith.master = targetSith.master.id;
          } else if(inheritanceDirectionality === Constants.APPRENTICE) {
            outputObj.sith.apprentice = targetSith.apprentice.id;
          }
          dispatch(actions.receiveSithInformation(outputObj));
          dispatch(actions.isFetching(false));

          if(!stop) {
            var secondSubstitution = {};
            if(inheritanceDirectionality === Constants.MASTER) {
              secondSubstitution.targetIndex = paramsObj.targetIndex - 1;
              secondSubstitution.relationIndex = paramsObj.relationIndex - 1
            } else if(inheritanceDirectionality === Constants.APPRENTICE) {
              secondSubstitution.targetIndex = paramsObj.targetIndex + 1;
              secondSubstitution.relationIndex = paramsObj.relationIndex + 1
            }
            var dispatchParams = {};
            dispatchParams.inheritanceDirectionality = paramsObj.inheritanceDirectionality;
            dispatchParams.targetIndex = secondSubstitution.targetIndex;
            dispatchParams.relationIndex = secondSubstitution.relationIndex;
            if(inheritanceDirectionality === Constants.MASTER) {
              dispatchParams.relationId = outputObj.sith.master;
            } else if(inheritanceDirectionality === Constants.APPRENTICE) {
              dispatchParams.relationId = outputObj.sith.apprentice;
            }
            dispatch(actions.getSithInfo(dispatchParams, true));
          }

        });
    }
  }

};

module.exports = actions;
