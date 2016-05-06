'use strict';

var React = require('react');
var $ = require('jquery');
var constants = require('../Constants');
var Store = require('../Store');
var dispatcher = require('../Dispatcher');

/**
*
* Main menu.
*
*/
var MainMenu = React.createClass({
  displayName: 'MainMenu',

  requestActivity: function(activityName) {
    return function(e) {
      e.preventDefault();
      dispatcher.dispatch({
        'type' : constants.SET_ACTIVITY,
        'data' : {'name' : activityName}
      });
    }.bind(this);
  },

  activitySwitched: function(data) {
    $('li.active', this.refs.main).removeClass('active');
    $(this.refs[data.name]).parent().addClass('active');
  },

  componentDidMount: function() {
    Store.on(constants.SET_ACTIVITY, this.activitySwitched);
  },

  componentWillUnmount: function() {
    Store.removeListener(constants.SET_ACTIVITY, this.activitySwitched);
  },

  requestLogout: function() {
    dispatcher.dispatch({
      'type' : constants.LOGOUT
    });
  },

  profile: function() {
    dispatcher.dispatch({
      'type': constants.EDIT_USER_REQUEST,
      'data': Store.currentUser().id
    });
  },

  render: function() {
    return (
      <nav className='navbar navbar-inverse container'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
            <a className='navbar-brand' href='javascript:void(0)'><span className='glyphicon glyphicon-grain'></span> Calories Tracker</a>
          </div> {/* .navbar-header*/}

          <div className='collapse navbar-collapse'>
            <ul ref='main' className='nav navbar-nav'>
              <li><a href='javascript:void(0)' ref={constants.ACTIVITY_VIEW_RECORDS} onClick={this.requestActivity(constants.ACTIVITY_VIEW_RECORDS)}>View records</a></li>
              <li><a href='javascript:void(0)' ref={constants.ACTIVITY_CREATE_RECORD} onClick={this.requestActivity(constants.ACTIVITY_CREATE_RECORD)}>Add record</a></li>
              <li className={Store.currentUser().hasRole('CRUD_USER') ? '' : 'app-no-display'}><a href='javascript:void(0)' ref={constants.ACTIVITY_VIEW_USERS} onClick={this.requestActivity(constants.ACTIVITY_VIEW_USERS)}>View users</a></li>
              <li className={Store.currentUser().hasRole('CRUD_USER') ? '' : 'app-no-display'}><a href='javascript:void(0)' ref={constants.ACTIVITY_CREATE_USER} onClick={this.requestActivity(constants.ACTIVITY_CREATE_USER)}>Add user</a></li>
            </ul>

            <ul className='nav navbar-nav navbar-right'>
              <li><a href='javascript:void(0)' onClick={this.profile}>Profile <span className='glyphicon glyphicon-user'></span></a></li>
              <li><a href='javascript:void(0)' onClick={this.requestLogout}>Log out <span className='glyphicon glyphicon-log-out'></span></a></li>
            </ul>
          </div> {/* .navbar-collapse */}
        </div> {/* .container-fluid*/}
      </nav>
    );
  }
});

module.exports = MainMenu;
