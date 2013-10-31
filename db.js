
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