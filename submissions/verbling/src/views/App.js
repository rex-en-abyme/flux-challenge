import React from 'react';
import Header from './Header'
import ScrollableList from './ScrollableList'
var ReactRedux = require("react-redux");

var App = React.createClass({

  render() {
    if(!this.props.value) {
      return (<div>loading</div>);
    }
    return (
      <div className="app-container">
        <div className="css-root">
          <Header world={this.props.value.world} />
          <ScrollableList siths={this.props.value.siths}
                          btnUpState={this.props.value.button_up}
                          btnDownState={this.props.value.button_down} />
        </div>/
      </div>
    );
  }

});

var mapStateToProps = function(state){
  return { value: state };
};

module.exports = ReactRedux.connect(mapStateToProps)(App);
