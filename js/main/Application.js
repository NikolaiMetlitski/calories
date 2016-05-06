'use strict';

var React = require('react');
var Template = require('./components/Template');
var Content = require('./components/Content');
var Login = require('./components/Login');
var FormUser = require('./components/FormUser');
var Store = require('./Store');
var constants = require('./Constants');
var dispatcher = require('./Dispatcher');

/**
*
* Application.
*
*/
var Application = React.createClass({
  displayName: 'Application',

  componentWillMount: function() {
    Store.on(constants.LOGIN, function(pl) {
      this.setState({
        'authenticated' : true,
        'signup' : false
      });
    }.bind(this));
    Store.on(constants.SIGN_UP_REQUEST, function(pl) {
      this.setState({
        'authenticated' : false,
        'signup' : true
      });
    }.bind(this));
    Store.on(constants.SIGN_UP_SUCCESS, function(pl) {
      this.setState(this.getInitialState());
    }.bind(this));
    Store.on(constants.LOGOUT, function(pl) {
      this.setState(this.getInitialState());
    }.bind(this));
  },

  getInitialState: function() {
    return {
      'authenticated' : false,
      'signup' : false
    }
  },

  signUp: function(data) {
    console.log('Attempt to sign up user: ' + JSON.stringify(data));
    dispatcher.dispatch({
      'type': constants.SIGN_UP_ATTEMPT,
      'data': data
    });
  },

  render: function() {
    if (this.state.authenticated) {
      return (
        <Template>
          <Content />
        </Template>
      );
    } else if (this.state.signup) {
      return <FormUser handler={this.signUp} title='Sign up'/>;
    } else {
      return <Login />;
    }
  }
});

module.exports = Application;
