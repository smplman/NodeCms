
/*
 * Database
 */
var mongo = require('mongodb');
var monk = require('monk');
var appDb = monk('localhost:27017/nodeCms');
var appData = appDb.get('app');

exports.getAppData = function () {
	return appData;
}

exports.getCmsData = function (callback) {
	appData.find({},{},function(e,docs){
		callback && callback(docs[0]);
  	});
}

exports.getCmsPages = function (callback) {
	this.getCmsData(function(cmsData){
		callback && callback(cmsData.pages);
  	});
}

exports.getCmsPage = function (page, callback) {
	this.getCmsData(function(cmsData){
		callback && callback(cmsData.pages[page]);
	});
}