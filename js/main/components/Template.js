'use strict';

var React = require('react');
var Header = require('./Header');
var MainMenu = require('./MainMenu');
var Footer = require('./Footer');

var Template = React.createClass({
  displayName: 'Template',

  statics: {},

  mixins: [],

  propTypes: {},

  getDefaultProps: function() {
    return {};
  },

  getInitialState: function() {
    return {};
  },

  componentWillMount: function() {
  },

  componentDidMount: function() {
  },

  componentWillReceiveProps: function(nextProps) {
  },
/*
  shouldComponentUpdate: function(nextProps, nextState) {
  },
*/
  componentWillUpdate: function(nextProps, nextState) {
  },

  componentDidUpdate: function(nextProps, nextState) {
  },

  componentWillUnmount: function() {
  },

  render: function() {
    return (
      <div>
        <Header />
        <MainMenu />
        {this.props.children}
        <Footer />
      </div>
    );
  }
});

module.exports = Template;
