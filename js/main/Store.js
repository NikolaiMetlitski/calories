var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var dispatcher = require('./Dispatcher');
var constants = require('./Constants');
var $ = require('jquery');

var Store = assign({}, EventEmitter.prototype, {
  context: window.contextPath,

  user: {
    id: null,
    roles: ['anonymous'],
    hasRole : function(role) {
      return this.roles.indexOf(role) > -1;
    },
    hasAnyRole : function(roles) {
      return roles.some(function(r) {
        return this.hasRole(r);
      }.bind(this));
    }
  },

  limit: 10,
  recordsFilter: null,
  recordsPage: 0,
  usersPage: 0,

  getLimit: function() {
    return this.limit;
  },

  reset: function() {
    this.records = [];
    this.users = [];
    this.recordsFilter = {};
    this.recordsPage = 0;
    this.usersPage = 0;
  },

  records: [],
  users: [],

  login: function(data) {
    $.ajax({
      type: 'POST',
      url: this.context + '/login',
      dataType: 'json',
      data: data,
      success: function(data) {
        console.log('Loggged in: ' + JSON.stringify(data));
        this.user.id = data.id;
        this.user.roles = data.authorities;
        this.emit(constants.LOGIN, {'user': data});
      }.bind(this),
      error: function(jqXHR, msg, ex) {
        console.log('Login failed ' + msg);
      }
    });
  },

  logout: function(data) {
    $.ajax({
      type: 'GET',
      url: this.context + '/logout',
      dataType: 'json',
      success: function(data) {
        console.log('Loggged out: ' + JSON.stringify(data));
        this.doLogout();
      }.bind(this),
      error: function(jqXHR, msg, ex) {
        console.log('Logout failed ' + msg);
      }
    });
  },

  signUp: function(data) {
    $.ajax({
      type: 'PUT',
      url: this.context + '/signup',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(data),
      success: function(data) {
        console.log('Sign up success: ' + JSON.stringify(data));
        this.emit(constants.SIGN_UP_SUCCESS, data);
        this.records = data;
      }.bind(this),
      error: function(jqXHR, msg, ex) {
        console.log('Sign up failed ' + msg);
      }
    });
  },

  loadRecords: function(data) {
    if (data.filter != null) {
      this.recordsFilter = data.filter;
      this.recordsPage = 0;
    }
    if (data.page != null) {
      this.recordsPage = data.page;
    }
    var req = assign({'start' : this.recordsPage * this.limit, 'limit' : this.limit}, this.recordsFilter);

    $.ajax({
      type: 'GET',
      url: this.context + '/record',
      contentType: 'application/json',
      dataType: 'json',
      data: req,
      success: function(data, status, jqXHR) {
        console.log('Records retireval success: ' + data.length);
        var count = jqXHR.getResponseHeader("Count");
        this.emit(constants.LOAD_RECORDS_SUCCESS, {'data' : data, 'count' : count, 'page' : this.recordsPage});
      }.bind(this),
      error: function(jqXHR, msg, ex) {
        console.log('Records retireval failed ' + msg);
      }
    });
  },

  loadUsers: function(data) {
    if (data.page != null) {
      this.usersPage = data.page;
    }
    var req = {'start' : this.usersPage * this.limit, 'limit' : this.limit};

    $.ajax({
      type: 'GET',
      url: this.context + '/user',
      contentType: 'application/json',
      dataType: 'json',
      data: req,
      success: function(data, status, jqXHR) {
        console.log('Users retireval success: ' + data.length);
        var count = jqXHR.getResponseHeader("Count");
        this.emit(constants.LOAD_USERS_SUCCESS, {'data' : data, 'count' : count, 'page' : this.usersPage});
      }.bind(this),
      error: function(jqXHR, msg, ex) {
        console.log('Users retireval failed: ' + msg);
      }
    });
  },

  createRecord: function(data) {
    $.ajax({
      type: 'PUT',
      url: this.context + '/record',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(data),
      success: function(data) {
        console.log('Create record success: ' + JSON.stringify(data));
        this.emit(constants.CREATE_RECORD_SUCCESS, data);
      }.bind(this),
      error: function(jqXHR, msg, ex) {
        console.log('Create record failed: ' + msg);
      }
    });
  },

  createUser: function(data) {
    $.ajax({
      type: 'PUT',
      url: this.context + '/user',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(data),
      success: function(data) {
        console.log('Create user success: ' + JSON.stringify(data));
        this.emit(constants.CREATE_USER_SUCCESS, data);
      }.bind(this),
      error: function(jqXHR, msg, ex) {
        console.log('Create user failed: ' + msg);
      }
    });
  },

  editRecord: function(id) {
    $.ajax({
      type: 'GET',
      url: this.context + '/record',
      contentType: 'application/json',
      dataType: 'json',
      data: {'id' : id},
      success: function(data) {
        console.log('Record retireval success: ' + JSON.stringify(data));
        this.emit(constants.SET_ACTIVITY, {'name' : constants.ACTIVITY_UPDATE_RECORD, 'data' : data[0]});
      }.bind(this),
      error: function(jqXHR, msg, ex) {
        console.log('Record retireval failed ' + msg);
      }
    });
  },

  editUser: function(id) {
    $.ajax({
      type: 'GET',
      url: this.context + '/user',
      contentType: 'application/json',
      dataType: 'json',
      data: {'id' : id},
      success: function(data) {
        console.log('User retireval success: ' + JSON.stringify(data));
        this.emit(constants.SET_ACTIVITY, {'name' : constants.ACTIVITY_UPDATE_USER, 'data' : data[0]});
      }.bind(this),
      error: function(jqXHR, msg, ex) {
        console.log('User retireval failed ' + msg);
      }
    });
  },

  updateRecord: function(data) {
    $.ajax({
      type: 'POST',
      url: this.context + '/record',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(data),
      success: function(data) {
        console.log('Record update success: ' + JSON.stringify(data));
        this.emit(constants.SET_ACTIVITY, {'name' : constants.ACTIVITY_VIEW_RECORDS});
      }.bind(this),
      error: function(jqXHR, msg, ex) {
        console.log('Record update failed ' + msg);
        this.emit(constants.UPDATE_RECORD_FAILURE, {});
      }.bind(this)
    });
  },

  updateUser: function(data) {
    $.ajax({
      type: 'POST',
      url: this.context + '/user',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(data),
      success: function(data) {
        console.log('User update success: ' + JSON.stringify(data));
        this.emit(constants.SET_ACTIVITY, {'name' : constants.ACTIVITY_VIEW_RECORDS});
      }.bind(this),
      error: function(jqXHR, msg, ex) {
        console.log('User update failed ' + msg);
        this.emit(constants.UPDATE_USER_FAILURE, {});
      }.bind(this)
    });
  },

  deleteRecord: function(data) {
    if (data.length < 1) {
      return;
    }
    $.ajax({
      type: 'DELETE',
      url: this.context + '/record',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(data),
      success: function(data) {
        console.log('Record(s) delete success: ' + JSON.stringify(data));
        this.emit(constants.DELETE_RECORD_SUCCESS, data);
      }.bind(this),
      error: function(jqXHR, msg, ex) {
        console.log('Record(s) delete failed ' + msg);
        this.emit(constants.DELETE_RECORD_FAILURE, data);
      }.bind(this)
    });
  },

  deleteUser: function(data) {
    if (data.length < 1) {
      return;
    }
    $.ajax({
      type: 'DELETE',
      url: this.context + '/user',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(data),
      success: function(data) {
        console.log('User(s) delete success: ' + JSON.stringify(data));
        this.emit(constants.DELETE_USER_SUCCESS, data);
      }.bind(this),
      error: function(jqXHR, msg, ex) {
        console.log('User(s) delete failed ' + msg);
        this.emit(constants.DELETE_USER_FAILURE, data);
      }.bind(this)
    });
  },

  doLogout() {
    this.user.id = null;
    this.user.roles = ['anonymous'];
    this.emit(constants.LOGOUT);
  },

  currentUser: function() {
    return this.user;
  }

});


dispatcher.register(function(pl) {
  switch (pl.type) {
    case constants.LOGIN:
    this.login(pl.data);
    break;

    case constants.LOGOUT:
    this.logout(pl.data);
    break;

    case constants.SIGN_UP_REQUEST:
    this.emit(constants.SIGN_UP_REQUEST, null);
    break;

    case constants.SIGN_UP_ATTEMPT:
    this.signUp(pl.data);
    break;

    case constants.LOAD_RECORDS_REQUEST:
    this.loadRecords(pl.data);
    break;

    case constants.LOAD_USERS_REQUEST:
    this.loadUsers(pl.data);
    break;

    case constants.SET_ACTIVITY:
    this.emit(constants.SET_ACTIVITY, pl.data);
    break;

    case constants.CREATE_RECORD_REQUEST:
    this.createRecord(pl.data);
    break;

    case constants.CREATE_USER_REQUEST:
    this.createUser(pl.data);
    break;

    case constants.EDIT_RECORD_REQUEST:
    this.editRecord(pl.data);
    break;

    case constants.EDIT_USER_REQUEST:
    this.editUser(pl.data);
    break;

    case constants.UPDATE_RECORD_REQUEST:
    this.updateRecord(pl.data);
    break;

    case constants.UPDATE_USER_REQUEST:
    this.updateUser(pl.data);
    break;

    case constants.DELETE_RECORD_REQUEST:
    this.deleteRecord(pl.data);
    break;

    case constants.DELETE_USER_REQUEST:
    this.deleteUser(pl.data);
    break;
  }
}.bind(Store));

Store.reset();

$(document).ajaxError(function(event, jqXHR, settings, thrownError) {
  if (jqXHR.status == 401) {
    Store.doLogout();
  }
});

module.exports = Store;
