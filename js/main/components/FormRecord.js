'use strict';

var React = require('react');
var $ = require('jquery');
var Store = require('../Store');
var constants = require('../Constants');
var dispatcher = require('../Dispatcher');
var Utils = require('../utils');

var FormRecord = React.createClass({
  displayName: 'FormRecord',

  getDefaultProps: function() {
    return {
      'title' : 'New record',
      'handler' : function() {console.log('No handler assigned!')},
      'data' : {'date' : Utils.currentDate(), 'time' : Utils.currentTime()}
    };
  },

  submit: function(e) {
    e.preventDefault();
    var data = {
      'userId' : this.refs.userId.value,
      'date' : this.refs.date.value,
      'time' : Utils.toServerFormat(this.refs.time.value),
      'description' : this.refs.desc.value,
      'value' : this.refs.value.value
    }
    if (this.props.data.id) {
      data['id'] = this.props.data.id;
    }
    if (this.props.data.version != null) {
      data['version'] = this.props.data.version;
    }
    this.props.handler(data);
  },

  reset: function() {
    this.refs.form.reset();
  },

  showErrors: function() {
  },

  componentWillMount: function() {
    Store.on(constants.CREATE_RECORD_SUCCESS, this.reset);
    Store.on(constants.UPDATE_RECORD_FAILURE, this.showErrors);
  },

  componentWillUnmount: function() {
    Store.removeListener(constants.CREATE_RECORD_SUCCESS, this.reset);
    Store.removeListener(constants.UPDATE_RECORD_FAILURE, this.showErrors);
  },

  componentDidMount: function() {
    $(this.refs.userId.focus());
  },

  render: function() {
    var admin = Store.currentUser().hasRole('CRUD_USER');

    return (
    <div className='container'>
      <form ref='form' onSubmit={this.submit}>
        <h2>{this.props.title}</h2>

        <div className={admin ? 'form-group' : 'app-no-display'}>
          <label htmlFor='userId'>User #</label>
          <input ref='userId' type='number' className='form-control' id='userId' placeholder='User #' required={admin} autofocus={admin} defaultValue={this.props.data['userId']}/>
        </div>
        <div className='form-group'>
          <label htmlFor='date'>Date</label>
          <input ref='date' type='date' className='form-control' id='date' required autofocus={!admin} defaultValue={this.props.data['date']}/>
        </div>
        <div className='form-group'>
          <label htmlFor='time'>Time</label>
          <input ref='time' type='time' className='form-control' id='time' required defaultValue={Utils.toClientFormat(this.props.data['time'])}/>
        </div>
        <div className='form-group'>
          <label htmlFor='desc'>Meal description</label>
          <textarea ref='desc' className='form-control' id='desc' required defaultValue={this.props.data['description']}/>
        </div>
        <div className='form-group'>
          <label htmlFor='value'>Calories</label>
          <input ref='value' type='number' className='form-control' id='value' required defaultValue={this.props.data['value']}/>
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    </div>
    );
  }
});

module.exports = FormRecord;
