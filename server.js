
/*
 * Express Server
 */
var app = require('express.io')();
var express = require('express.io');
var server = require('http').createServer(app);
var socket = require('./sockets');

var routes = require('./routes');
var path = require('path');
var twig = require('twig');

var data = require('./db');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html.twig');
app.disable('view cache');
app.engine('html.twig', twig.__express);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

exports.listen = function () {
	server.listen(3000);

	// data.getCmsPages(function(pages){
	// 	for(var i = 0;i < pages.length;i++) {
	// 		p = pages[i];
	// 		if (p.route) {
	// 			app.get(p.route, routes.indexGet(p));
	// 		}
	// 	}
	// });

	data.getCmsRoutes(function(routeData){
		for(var i = 0;i < routeData.length;i++) {
			r = routeData[i];
			if (r) {
				//action = eval("routes." + r.action + "()");
				//console.log(r, action);
				app.get(r.pattern, routes[r.action]());
				//app.io.route(r.pattern, routes[r.action]());
				console.log(app.io);
			}
		}
	});

	return server;
}

exports.getApp = function(){
	return app;
}