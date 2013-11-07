
/*
 * Socket.IO
 */
var socketio = require('socket.io');
var data = require('./db');

exports.listen = function (server, app) {

	io = socketio.listen(server);

	io.sockets.on('connection', function (socket) {

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

	});

	return io;
}