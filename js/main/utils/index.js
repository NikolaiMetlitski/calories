'use strict';

var $ = require('jquery');

/*
* 'path' is always an array of property descriptors (path elements: {name: name, key: key, index: index}
*/
var Utils = {

  toServerFormat: function(str) {
    if (str) {
      var hh = parseInt(str.split(':')[0]);
      var mm = str.split(':')[1];
      var a = (hh >= 12) ? 'PM' : 'AM';
      hh = (hh == 0) ? 12 : ((hh > 12) ? hh - 12 : hh);
      var result = (hh < 10 ? '0' + hh : hh) + ':' + mm + ' ' + a;
      return result;
    } else  {
      return str;
    }
  },

  toClientFormat: function(str) {
    if (str) {
      var time = str.split(' ')[0];
      var a = str.split(' ')[1];
      var hh = parseInt(time.split(':')[0]);
      var mm = time.split(':')[1];
      var HH = (hh == 12 && a == 'AM')? 0 : ((a == 'PM' && hh < 12)? hh + 12 : hh);
      var result = (HH < 10 ? '0' + HH : HH) + ':' + mm;
      return result;
    } else {
      return str;
    }
  },

  formatDate: function(str) {
    var tokens = str.split('-');
    return tokens[1] + '/'+ tokens[2] + '/' + tokens[0];
  },

  currentDate: function() {
    var date = new Date();
    var mm = this.pad(date.getMonth());
    var dd = this.pad(date.getUTCDate());
    var yyyy = date.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  },

  currentTime: function() {
    var date = new Date();
    var HH = this.pad(date.getHours());
    var MM = this.pad(date.getMinutes());
    return HH + ':' + MM;
  },

  pad: function(n) {
    return n < 10 ? '0' + n : n;
  }
}

module.exports = Utils;
