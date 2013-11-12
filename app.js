
/**
 * Module dependencies.
 */

// var server = require('./server');
// var socket = require('./sockets');
// //var data = require('./db');
// var app = server.getApp();

// socket.listen(server.listen(), app);
// //server.listen();


var data = require('./db');
var routes = require('./routes');
var path = require('path');
var twig = require('twig');

app = require('express.io')();
express = require('express.io');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html.twig');
app.engine('html.twig', twig.__express);

app.http().io();

data.getCmsRoutes(function(routeData){
	for(var i = 0;i < routeData.length;i++) {
		r = routeData[i];
		if (r) {
			app.get(r.pattern, routes[r.action](app));
			app.io.route('page_request:' + r.pattern, routes[r.action](app));
		}
	}
});

app.listen(3000);