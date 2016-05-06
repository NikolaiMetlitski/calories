'use strict';

var $ = require('jquery');

var Mixin = {
  getChecked: function() {
    var ids = $('input:checked', this.refs.table).map(function() {return this.name}).get();
    return ids;
  }
};

module.exports = Mixin;
