
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

exports.updateCmsData = function(cmsData, callback) {
	id = cmsData._id;
	delete cmsData._id;
	appData.update({ _id: id }, { $set: cmsData }, function(e,doc){
		socket.socketEmit('server-alert', 'CMS Settings Updated!');
		callback && callback(doc);
	});
}

exports.updateCmsNavigation = function(navData, callback) {
	id = navData._id;
	delete navData._id;
	appData.update({ _id: id, "navigation.name" : navData.name }, { $set: { "navigation.$" : navData } }, function(e,doc){
		socket.socketEmit('server-alert', 'CMS Settings Updated!');
		callback && callback(doc);
	});
}

exports.getCmsRoutes = function(callback) {
	this.getCmsData(function(cmsData){
		callback && callback(cmsData.routes);
	});
}

//CmsPages Collection
exports.getCmsPageData = function () {
	return pageData;
}

exports.getCmsPages = function (callback) {
	pageData.find({},{$orderby: { age : 1 }},function(e,docs){
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
	page._id = pageData.id();
	pageData.insert(page, function(e,doc){
		socket.socketEmit('server-alert', 'New CMS Page Added!');
		callback && callback(doc);
	});
}

exports.updateCmsPage = function(page, callback) {
	id = page._id;
	delete page._id;
	pageData.update({ _id: id }, { $set: page }, function(e,doc){
		socket.socketEmit('server-alert', 'CMS Page Updated!');
		callback && callback(doc);
	});
}