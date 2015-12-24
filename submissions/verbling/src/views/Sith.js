/**
 * Created by airrex on 12/23/15.
 */

import React from 'react';

var Sith = React.createClass({
  render() {
    var listItemClasses = `css-slot ${this.props.matches_current_planet}`;
    return (
      <li className={listItemClasses} >
        <h3>{ this.props.name }</h3>
        <h6>{ this.props.planet_name }</h6>
      </li>
    );
  }
});

module.exports = Sith;
