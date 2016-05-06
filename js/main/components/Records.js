'use strict';

var React = require('react');
var Store = require('../Store');
var constants = require('../Constants');
var dispatcher = require('../Dispatcher');
var Filter = require('./Filter');
var tableMixin = require('../utils/tableMixin.js');
var Pager = require('./Pager');
var Utils = require('../utils');

var Records = React.createClass({
  displayName: 'Records',

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
    Store.on(constants.LOAD_RECORDS_SUCCESS, this.dataArrived);
    Store.on(constants.DELETE_RECORD_SUCCESS, this.onDelete);
  },

  componentWillUnmount: function() {
    Store.removeListener(constants.LOAD_RECORDS_SUCCESS, this.dataArrived);
    Store.removeListener(constants.DELETE_RECORD_SUCCESS, this.onDelete);
  },

  componentDidMount: function() {
    this.refresh();
  },

  refresh: function() {
    this.refs.filter.setFilter();
  },

  edit: function(id) {
    return function() {
      dispatcher.dispatch({
        'type': constants.EDIT_RECORD_REQUEST,
        'data': id
      });
    }
  },

  doDelete: function(e) {
    dispatcher.dispatch({
      'type': constants.DELETE_RECORD_REQUEST,
      'data': this.getChecked()
    });
  },

  render: function() {
    return (
    <div className='container'>
      <Filter ref='filter'/>
      <table className='table' ref='table'>
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th className={Store.currentUser().hasRole('CRUD_RECORD')? '' : 'app-no-display'}>{'User\u00a0#'}</th>
            <th>Date</th>
            <th>Time</th>
            <th>Description</th>
            <th>Calories</th>
            {/*<th></th>
            <th></th>*/}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(function(rec) {
            return (
            <tr key={rec['id']} className={(rec['dayTotal'] > rec['userLimit']) ? 'danger' : 'success'}>
              <td><a href='javascript:void(0)' onClick={this.edit(rec['id'])}>Edit</a></td>
              <th scope='row'>{rec['id']}</th>
              <td className={Store.currentUser().hasRole('CRUD_RECORD')? '' : 'app-no-display'}>{rec['userId']}</td>
              <td className='app-nowrap'>{Utils.formatDate(rec['date'])}</td>
              <td className='app-nowrap'>{rec['time']}</td>
              <td>{rec['description']}</td>
              <td>{rec['value']}</td>
              {/*<td>{rec['dayTotal']}</td>
              <td>{rec['userLimit']}</td>*/}
              <td><input type='checkbox' name={rec['id']} /></td>
            </tr>);
          }.bind(this))}
        </tbody>
      </table>
      <div className='app-grid-foot'>
        <Pager request={constants.LOAD_RECORDS_REQUEST} success={constants.LOAD_RECORDS_SUCCESS} />
        <button className='btn btn-danger' onClick={this.doDelete}>Delete selected <span className='glyphicon glyphicon-trash'></span></button>
      </div>
    </div>
    );
  }
});

module.exports = Records;
