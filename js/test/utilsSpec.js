'use strict';

var utils = require('./utils');

describe("Utils suite", function() {

  it("To server format 1", function() {
    var client = '00:00';
    var server = utils.toServerFormat(client);
    expect(server).toBe('12:00 AM');
  });

  it("To server format 2", function() {
    var client = '01:30';
    var server = utils.toServerFormat(client);
    expect(server).toBe('01:30 AM');
  });

  it("To server format 3", function() {
    var client = '12:00';
    var server = utils.toServerFormat(client);
    expect(server).toBe('12:00 PM');
  });

  it("To server format 4", function() {
    var client = '13:45';
    var server = utils.toServerFormat(client);
    expect(server).toBe('01:45 PM');
  });

  it("To client format 1", function() {
    var server = '12:00 AM';
    var client = utils.toClientFormat(server);
    expect(client).toBe('00:00');
  });

  it("To client format 2", function() {
    var server = '01:30 AM';
    var client = utils.toClientFormat(server);
    expect(client).toBe('01:30');
  });

  it("To client format 3", function() {
    var server = '12:00 PM';
    var client = utils.toClientFormat(server);
    expect(client).toBe('12:00');
  });

  it("To client format 4", function() {
    var server = '01:45 PM';
    var client = utils.toClientFormat(server);
    expect(client).toBe('13:45');
  });

  it("Format Date", function() {
    var str = '2016-03-27';
    var date = utils.formatDate(str);
    expect(date).toBe('03/27/2016');
  });
});
