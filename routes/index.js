
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