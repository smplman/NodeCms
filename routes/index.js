
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
exports.indexAction = function(app){
	return function(req, res) {
		data.getCmsData(function(cmsData){
			data.getCmsPage('/', function(page){
				tplData = {
						"app" : cmsData,
						"title" : "Index",
						"isSocket" : false,
						"page" : page

				};
				if(res) {
					res.render('index.html.twig', tplData);
				} else {
						tplData.isSocket = true;
			  			app.render(page.template, tplData, function(err, html){
				  			page.html = html;
				  			console.log('Page Response:', page);
							req.io.emit('page_response',page);
						});

				}
			});
		});
	};
};

exports.settingsAction = function(app){
	return function(req, res) {
		data.getCmsData(function(cmsData){
			data.getCmsPages(function(pages){
				data.getCmsPage('/settings', function(page){
					tplData = {
				  	        "app" : cmsData,
				  	        "title" : "Settings",
				  	        "isSocket" : false,
				  	        "pages" : pages
				  	};

					if (res) {
						res.render('cms/settings.html.twig', tplData);
					} else {
						tplData.isSocket = true;
						app.render('cms/settings.html.twig', tplData, function(err, html){
				  			page.html = html;
				  			console.log('Page Response:', page);
							req.io.emit('page_response',page);
						});
					}
				});
			});
		});
	};
};