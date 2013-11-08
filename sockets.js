
/*
 * Socket.IO
 */
var socketio = require('socket.io');
var data = require('./db');
var io = null;

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
	  		//console.log(pageData);
	  	});

	  	socket.on('updateCmsSettings', function(cmsData){
	  		data.updateCmsData(cmsData, function(cms){
	  			console.log('Updated CMS Settings: ', cms)
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