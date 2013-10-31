
/**
 * Module dependencies.
 */

var server = require('./server');
var socket = require('./sockets');
var data = require('./db');
var app = server.getApp();

socket.listen(server.listen(), app);
//server.listen();
