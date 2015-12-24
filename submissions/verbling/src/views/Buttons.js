/**
 * Created by airrex on 12/23/15.
 */

import * as CONSTANTS from '../constants';
import store from '../store';
import actions from '../actions';
import React from 'react';

var Buttons = React.createClass({

  render() {
    var btnUpClasses = 'css-button-up ', btnDownClasses = 'css-button-down ';
    if(this.props.upState === CONSTANTS.FROZEN_TRUE) btnUpClasses += 'css-button-disabled';
    if(this.props.downState === CONSTANTS.FROZEN_TRUE) btnDownClasses += 'css-button-disabled';
    return (
      <div className="css-scroll-buttons">
        <button className={btnUpClasses} onClick={this.handleUpClick} ></button>
        <button className={btnDownClasses} onClick={this.handleDownClick} ></button>
      </div>
    );
  },

  // TODO Should these just invoke a callback passed in through index.js in order
  // that the components aren't directly accessing the store?
  handleUpClick() {
    if(this.props.upState === CONSTANTS.FROZEN_FALSE && !store.getState().is_fetching) {
      store.dispatch(actions.clickEventUp());
      var secondSubstitution = { targetIndex: 0, relationIndex: 1 };
      store.dispatch(actions.getSithInfo({
        inheritanceDirectionality: CONSTANTS.MASTER,
        targetIndex: secondSubstitution.targetIndex,
        relationIndex: secondSubstitution.relationIndex,
        relationId: store.getState().siths[secondSubstitution.relationIndex].master
      }));
    }
  },

  handleDownClick() {
    if(this.props.downState === CONSTANTS.FROZEN_FALSE && !store.getState().is_fetching) {
      store.dispatch(actions.clickEventDown());
      var secondSubstitution = { targetIndex: 4, relationIndex: 3 };
      store.dispatch(actions.getSithInfo({
        inheritanceDirectionality: CONSTANTS.APPRENTICE,
        targetIndex: secondSubstitution.targetIndex,
        relationIndex: secondSubstitution.relationIndex,
        relationId: store.getState().siths[secondSubstitution.relationIndex].apprentice
      }));
    }
  }

});

module.exports = Buttons;
