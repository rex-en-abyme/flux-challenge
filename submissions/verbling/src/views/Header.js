/**
 * Created by airrex on 12/23/15.
 */

import React from 'react';

var Header = React.createClass({
  render() {
    return (<h1 className="css-planet-monitor">Obi-Wan currently on {this.props.world.name}</h1>);
  }
});

module.exports = Header;
