/**
 * Created by airrex on 12/23/15.
 */

import * as CONSTANTS from './constants';

var initialState = function() {
  return {
    is_fetching: false,
    button_up: CONSTANTS.FROZEN_FALSE,
    button_down: CONSTANTS.FROZEN_TRUE,
    world: {id: 57, name: 'Dagobah'},
    siths: [
      {
        id: 5956, name: 'Darth Tenebrous', master: 1121, apprentice: 2350, homeworld: {
        id: 90, name: 'Clak\'dor VII', matches_current_planet: CONSTANTS.CURRENT_PLANET_FALSE }
      },
      {
        id: 2350, name: 'Darth Plagueis', master: 5956, apprentice: 3616, homeworld: {
        id: 83, name: 'Mygeeto', matches_current_planet: CONSTANTS.CURRENT_PLANET_FALSE }
      },
      {
        id: 3616, name: 'Darth Sidious', master: 2350, apprentice: 1489, homeworld: {
        id: 7, name: 'Naboo', matches_current_planet: CONSTANTS.CURRENT_PLANET_FALSE }
      },
      {
        id: 1489, name: 'Darth Vader', master: 3616, apprentice: 1330, homeworld: {
        id: 18, name: 'Tatooine', matches_current_planet: CONSTANTS.CURRENT_PLANET_FALSE }
      },
      {
        id: 1330, name: 'Antinnis Tremayne', master: 1489, apprentice: null, homeworld: {
        id: 58, name: 'Coruscant', matches_current_planet: CONSTANTS.CURRENT_PLANET_FALSE }
      }
    ]
  };
};

module.exports = initialState;
