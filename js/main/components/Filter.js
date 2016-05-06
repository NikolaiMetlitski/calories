'use strict';

var React = require('react');
var Store = require('../Store');
var constants = require('../Constants');
var dispatcher = require('../Dispatcher');
var Utils = require('../utils');

var Filter = React.createClass({
  displayName: 'Filter',

  getDefaultProps: function() {return {};},

  getInitialState: function() {return {'dirty' : false};},

  dataArrived: function(data) {
    this.setState(this.getInitialState());
  },

  componentWillMount: function() {
    Store.on(constants.LOAD_RECORDS_SUCCESS, this.dataArrived);
  },

  componentWillUnmount: function() {
    Store.removeListener(constants.LOAD_RECORDS_SUCCESS, this.dataArrived);
  },

  setFilter: function(e) {
    if (e) {
      e.preventDefault();
    }
    var filter = {
      'dateFrom' : this.refs.dateFrom.value,
      'dateTo' : this.refs.dateTo.value,
      'timeFrom' : Utils.toServerFormat(this.refs.timeFrom.value),
      'timeTo' : Utils.toServerFormat(this.refs.timeTo.value),
//      'userName' : this.refs.userName.value,
      'userId' : this.refs.userId.value
    };
    for (var key in filter) {
      if (filter[key] == '') {
        delete filter[key];
      }
    }
    dispatcher.dispatch({
      'type': constants.LOAD_RECORDS_REQUEST,
      'data': {'filter' : filter}
    });
  },

  resetFilter: function() {
    dispatcher.dispatch({
      'type': constants.LOAD_RECORDS_REQUEST,
      'data': {'filter' : {}}
    });
  },

  setDirty: function() {
    this.setState({'dirty' : true});
  },

  render: function() {
    return (
      <form className='form-inline' onSubmit={this.setFilter} onReset={this.resetFilter}>
        <div className={Store.currentUser().hasRole('CRUD_USER') ? 'form-group' : 'app-no-display'}>
          <label htmlFor='userId'>User #</label>
          <input ref='userId' type='number' className='form-control' id='userId' onChange={this.setDirty}/>
        </div>
        <div className='form-group'>
          <label htmlFor='dateFrom'>Date from</label>
          <input ref='dateFrom' type='date' className='form-control' id='dateFrom' onChange={this.setDirty}/>
        </div>
        <div className='form-group'>
          <label htmlFor='dateTo'>Date to</label>
          <input ref='dateTo' type='date' className='form-control' id='dateTo' onChange={this.setDirty}/>
        </div>
        <div className='form-group'>
          <label htmlFor='timeFrom'>Time from</label>
          <input ref='timeFrom' type='time' className='form-control' id='timeFrom' onChange={this.setDirty}/>
        </div>
        <div className='form-group'>
          <label htmlFor='timeTo'>Time to</label>
          <input ref='timeTo' type='time' className='form-control' id='timeTo' onChange={this.setDirty}/>
        </div>
        <div className='form-group app-buttons'>
          <button type='submit' className='btn btn-primary' disabled={!this.state.dirty}>Apply</button>
          <button type='reset' className='btn btn-default'>Reset</button>
        </div>
      </form>
    );
  }
});

module.exports = Filter;
