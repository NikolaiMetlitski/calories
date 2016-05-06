'use strict';

var React = require('react');
var constants = require('../Constants');
var dispatcher = require('../Dispatcher');
var Store = require('../Store');

/**
*
* Pager.
*
*/
var Pager = React.createClass({
  displayName: 'Pager',

  getDefaultProps: function() {return {'maxPages' : 10};},

  getInitialState: function() {
    return {'page' : 0, 'count' : 0};
  },

  propTypes: {
    'request' : React.PropTypes.any.isRequired,
    'success' : React.PropTypes.any.isRequired,
    'maxPages' : React.PropTypes.number
  },

  componentWillMount: function() {
    Store.on(this.props.success, this.dataArrived);
  },

  componentWillUnmount: function() {
    Store.removeListener(this.props.success, this.dataArrived);
  },

  dataArrived: function(data) {
    this.setState({'page' : data.page, 'count' : data.count});
  },

  setPage: function(page) {
    return function(e) {
      if (e.target.disabled) {
        return;
      }
      dispatcher.dispatch({
        'type': this.props.request,
        'data': {'page' : page}
      });
    }.bind(this);
  },

  render: function() {
    var count = this.state.count;
    var limit = Store.getLimit();
    var page = this.state.page;
    var pages = Math.ceil(count / limit);
    var maxPages = this.props.maxPages;
    var metaPage = Math.floor(page / maxPages);

    var pageStart = metaPage * maxPages;
    var pagesInPager = Math.min(maxPages, pages - pageStart);

    var prev = pageStart - 1;
    var next = pageStart + pagesInPager;

    var pageElems = [];
    for (var p = pageStart; p < pageStart + pagesInPager; p++) {
      pageElems.push(<li key={p} className={p == page ? 'active' : ''}><a href='javascript:void(0)' onClick={p != page ? this.setPage(p) : null}>{p + 1}</a></li>);
    }
    var prevElem = <li key={prev} className={prev < 0 ? 'disabled' : ''}><a href='javascript:void(0)' aria-label='Previous' onClick={prev < 0 ? null : this.setPage(prev)}><span aria-hidden='true'>{'\u00ab'}</span></a></li>;
    var nextElem = <li key={next} className={next > pages - 1 ? 'disabled' : ''}><a href='javascript:void(0)' aria-label='Next' onClick={next > pages - 1 ? null : this.setPage(next)}><span aria-hidden='true'>{'\u00bb'}</span></a></li>;

    return (
      <nav className='app-pager'>
        <ul className='pagination'>
          {prevElem}
          {pageElems}
          {nextElem}
        </ul>
      </nav>
    );
  }

});

module.exports = Pager;
