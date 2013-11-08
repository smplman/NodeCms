
/*
 * Database
 */
var mongo = require('mongodb');
var monk = require('monk');
var appDb = monk('localhost:27017/nodeCms');
var appData = appDb.get('app');
var pageData = appDb.get('cmsPages');
var socket = require('./sockets');
//App Collection

exports.getAppData = function () {
	return appData;
}

exports.getCmsData = function (callback) {
	appData.find({},{},function(e,docs){
		data = (0 in docs) ? docs[0] : false;
		callback && callback(data);
  	});
}

//CmsPages Collection

exports.getCmsPageData = function () {
	return pageData;
}

exports.getCmsPages = function (callback) {
	pageData.find({},{},function(e,docs){
		callback && callback(docs);
  	});
}

exports.getCmsPage = function (route, callback) {
	pageData.find({"route" : route},{},function(e,docs){
		data = (0 in docs) ? docs[0] : false;
		callback && callback(data);
  	});
}

exports.insertCmsPage = function(page, callback) {
	pageData.insert(page, function(e,doc){
		socket.socketEmit('server-alert', 'New CMS Page Added!');
		callback && callback(doc);
	});
}