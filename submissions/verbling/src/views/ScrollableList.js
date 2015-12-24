/**
 * Created by airrex on 12/23/15.
 */

import React from 'react';
import Buttons from './Buttons';
import Sith from './Sith';

var ScrollableList = React.createClass({
  render() {
    return (
      <section className="css-scrollable-list">
        <ul className="css-slots">
          {this.props.siths.map(function(item){
            return (
              <Sith name={ item.name } key={ item.id }
                    planet_name={ item.homeworld.name }
                    matches_current_planet={ item.homeworld.matches_current_planet } />
            );
          })}
        </ul>
        <Buttons upState={this.props.btnUpState}
                 downState={this.props.btnDownState} />
      </section>
    );
  }
});

module.exports = ScrollableList;
