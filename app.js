
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
			try {
				app.get(r.pattern, routes[r.action](app));
				app.io.route('page_request:' + r.pattern, routes[r.action](app));
			} catch (e) {
				console.log("Route Error:" , e);
			}
		}
	}
});

app.io.route('newCmsPage', function(req) {
 	console.log('route here');
 	pageData = req.data;
	data.insertCmsPage(pageData, function(page){
		console.log('We have a new page: ', page);
		app.io.broadcast('server-alert', 'New CMS Page Added!');
		//req.io.emit();
	});
});

app.listen(3000);