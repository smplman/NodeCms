
/*
 * Socket.IO
 */
var socketio = require('socket.io');
var data = require('./db');

exports.listen = function (server, app) {

	io = socketio.listen(server);

	io.sockets.on('connection', function (socket) {

	  	socket.on('page_request', function(page){

	  		var name = page.name;
	  		appData = data.getAppData();

	  		appData.find({},{},function(e,docs){
	  			cmsData = docs[0];
		  		var page = cmsData.pages[name];
		  		console.log("Page Requested: " + page);

		  		app.render(page.template, {"app" : cmsData,"title" : page.title,"isSocket" : true}, function(err, html){
		  			page.html = html;
					socket.emit('page_response',page);
				});

	  		});
	  	});

	});

	return io;
}