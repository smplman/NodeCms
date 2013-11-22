
/*
 * Socket.IO
 */
var socketio = require('socket.io');
var data = require('./db');
var io = null;

// Sends the message or event to every connected user in the current namespace, except to your self.
// socket.broadcast.emit('Hi, a new user connected');

// Sends the message or event to every connected user in the current namespace
// io.sockets.emit('Hi all');

// Sends the message to one user
// socket.emit('news', {data:'data'});

exports.listen = function (server, app) {

	io = socketio.listen(server);

	io.sockets.on('connection', function (socketCon) {

		var socket = socketCon;

	  	socket.on('page_request', function(reqData){
	  		var route = reqData.route;
	  		data.getCmsData(function(cmsData){
		  		console.log("Route Requested: " + route);
		  		data.getCmsPage(route, function(page){
		  			app.render(page.template, {"app" : cmsData,"title" : page.title,"isSocket" : true}, function(err, html){
			  			page.html = html;
						socket.emit('page_response',page);
					});
		  		});
	  		});
	  	});

	  	socket.on('newCmsPage', function(pageData) {
	  		data.insertCmsPage(pageData, function(page){
	  			console.log('We have a new page: ', page);
	  			//socket.broadcast.emit('server-alert', 'New CMS Page Added!');
	  		});
	  	});

	  	socket.on('updateCmsSettings', function(cmsData){
	  		data.updateCmsData(cmsData, function(cms){
	  			console.log('Updated CMS Settings: ', cms)
	  		});
	  	});

	  	socket.on('updateCmsPage', function(pageData){
	  		data.updateCmsPage(pageData, function(page){
	  			console.log('Updated CMS Page: ', page)
	  		});
	  	});

	  	socket.on('updateCmsNavigation', function(navData){
	  		data.updateCmsNavigation(navData, function(cms){
	  			console.log('Updated CMS Navigation: ', cms)
	  		});
	  	});

	});

	return io;
}

exports.socketOn = function (event, callback) {
  	socket.on(event, function(data){
  		callback && callback(data);
  	});
}

exports.socketEmit = function (event, data) {
  	io.sockets.emit(event, data);
}