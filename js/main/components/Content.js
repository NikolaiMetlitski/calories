'use strict';

var React = require('react');
var Records = require('./Records');
var Users = require('./Users');
var FormRecord = require('./FormRecord');
var FormUser = require('./FormUser');
var constants = require('../Constants');
var Store = require('../Store');
var dispatcher = require('../Dispatcher');

var Content = React.createClass({
  displayName: 'Content',

  getInitialState: function() {
    return {'activity' : null, 'data' : null};
  },

  switchActivity: function(data) {
    this.setState({'activity' : data.name, 'data' : data.data});
  },

  componentWillMount: function() {
    Store.on(constants.SET_ACTIVITY, this.switchActivity);
  },

  componentWillUnmount: function() {
    Store.removeListener(constants.SET_ACTIVITY, this.switchActivity);
  },

  componentDidMount: function() {
    dispatcher.dispatch({
      'type' : constants.SET_ACTIVITY,
      'data' : {'name' : constants.ACTIVITY_VIEW_RECORDS}
    });
  },

  createRecord: function(data) {
    dispatcher.dispatch({
      'type': constants.CREATE_RECORD_REQUEST,
      'data': data
    });
  },

  updateRecord: function(data) {
    dispatcher.dispatch({
      'type': constants.UPDATE_RECORD_REQUEST,
      'data': data
    });
  },

  createUser: function(data) {
    dispatcher.dispatch({
      'type': constants.CREATE_USER_REQUEST,
      'data': data
    });
  },

  updateUser: function(data) {
    dispatcher.dispatch({
      'type': constants.UPDATE_USER_REQUEST,
      'data': data
    });
  },

  render: function() {
    switch (this.state.activity) {
      case constants.ACTIVITY_VIEW_RECORDS:
      return <Records />;

      case constants.ACTIVITY_CREATE_RECORD:
      return <FormRecord handler={this.createRecord}/>;

      case constants.ACTIVITY_UPDATE_RECORD:
      return <FormRecord data={this.state.data} handler={this.updateRecord} title='Update record'/>;

      case constants.ACTIVITY_VIEW_USERS:
      return <Users />;

      case constants.ACTIVITY_CREATE_USER:
      return <FormUser handler={this.createUser}/>;

      case constants.ACTIVITY_UPDATE_USER:
      return <FormUser data={this.state.data} handler={this.updateUser} title='Update user'/>;

      default:
      return <div></div>
    }
  }
});

module.exports = Content;
