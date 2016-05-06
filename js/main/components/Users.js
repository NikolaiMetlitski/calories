'use strict';

var React = require('react');
var Store = require('../Store');
var constants = require('../Constants');
var dispatcher = require('../Dispatcher');
var tableMixin = require('../utils/tableMixin.js');
var Pager = require('./Pager');

var Users = React.createClass({
  displayName: 'Users',

  mixins: [tableMixin],

  getDefaultProps: function() {
    return {};
  },

  getInitialState: function() {
    return {'data' : []};
  },

  dataArrived: function(data) {
    this.setState({'data' : data.data});
  },

  onDelete: function() {
    this.refresh();
  },

  componentWillMount: function() {
    Store.reset();
    Store.on(constants.LOAD_USERS_SUCCESS, this.dataArrived);
    Store.on(constants.DELETE_USER_SUCCESS, this.onDelete);
  },

  componentWillUnmount: function() {
    Store.removeListener(constants.LOAD_USERS_SUCCESS, this.dataArrived);
    Store.removeListener(constants.DELETE_USER_SUCCESS, this.onDelete);
  },

  componentDidMount: function() {
    this.refresh();
  },

  refresh: function() {
    var filter = {};
    dispatcher.dispatch({
      'type': constants.LOAD_USERS_REQUEST,
      'data': {'filter' : {}}
    });
  },

  edit: function(id) {
    return function() {
      dispatcher.dispatch({
        'type': constants.EDIT_USER_REQUEST,
        'data': id
      });
    }
  },

  doDelete: function(e) {
    dispatcher.dispatch({
      'type': constants.DELETE_USER_REQUEST,
      'data': this.getChecked()
    });
  },

  render: function() {
    return (
    <div className='container'>
      <table className='table' ref='table'>
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Name</th>
            <th>Password</th>
            <th>Calories limit</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(function(rec) {
            return (
            <tr key={rec['id']}>
              <td><a href='javascript:void(0)' onClick={this.edit(rec['id'])}>Edit</a></td>
              <th scope='row'>{rec['id']}</th>
              <td>{rec['name']}</td>
              <td>{rec['password']}</td>
              <td>{rec['limit']}</td>
              <td><input type='checkbox' name={rec['id']} /></td>
            </tr>);
          }.bind(this))}
        </tbody>
      </table>
      <div className='app-grid-foot'>
        <Pager request={constants.LOAD_USERS_REQUEST} success={constants.LOAD_USERS_SUCCESS} />
        <button className='btn btn-danger' onClick={this.doDelete}>Delete selected <span className='glyphicon glyphicon-trash'></span></button>
      </div>
    </div>
    );
  }
});

module.exports = Users;
