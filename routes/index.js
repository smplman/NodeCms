
/*
 * GET CMS Page
 */
 var data = require('../db');

exports.indexGet = function(page) {
	return function(req, res){
		data.getCmsData(function(cmsData){
			data.getCmsPages(function(pages){
				res.render(page.template, {
		  	        "app" : cmsData,
		  	        "title" : page.title,
		  	        "isSocket" : false,
		  	        "pages" : pages
		  	    });
			});
		});
  	};
};

//exports.indexPost = function
exports.indexAction = function(callback){
	return function(req, res) {
		data.getCmsData(function(cmsData){
			res.render('index.html.twig', {
				"app" : cmsData,
				"title" : "Index",
				"isSocket" : false,
			});
		});
	};
};

exports.settingsAction = function(callback){
	return function(req, res) {
		data.getCmsData(function(cmsData){
			data.getCmsPages(function(pages){
				res.render('cms/settings.html.twig', {
		  	        "app" : cmsData,
		  	        "title" : "Settings",
		  	        "isSocket" : false,
		  	        "pages" : pages
		  	    });
			});
		});
	};
};