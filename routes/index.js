
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
	var self = this;
	return function(req, res) {
		self.getPageData('/', function(tplData){
			if(res){
				res.render('index.html.twig',tplData);
			} else {
				tplData.isSocket = true;
				app.render('index.html.twig', tplData, function(err, html){
					page = tplData.page;
					page.html = html;
				  	console.log('Page Response:', page);
					req.io.emit('page_response',page);
				});
			}
		});
	};
};

exports.aboutAction = function(app){
	var self = this;
	return function(req, res) {
		self.getPageData('/about', function(tplData){
			if(res){
				res.render('cms/about.html.twig',tplData);
			} else {
				tplData.isSocket = true;
				app.render('cms/about.html.twig', tplData, function(err, html){
					page = tplData.page;
					page.html = html;
				  	console.log('Page Response:', page);
					req.io.emit('page_response',page);
				});
			}
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
				  	        "pages" : pages,
				  	        "page" : page
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

exports.newPageAction = function(app){
	var self = this;
	return function(req, res) {
		data.getCmsPages(function(pages){
			self.getPageData('/cms/new/page', function(tplData){
				tplData.pages = pages;
				if(res){
					res.render('cms/newPage.html.twig',tplData);
				} else {
					tplData.isSocket = true;
					app.render('cms/newPage.html.twig', tplData, function(err, html){
						page = tplData.page;
						page.html = html;
					  	console.log('Page Response:', page);
						req.io.emit('page_response',page);
					});
				}
			});
		});
	};
};

exports.getPageData = function(route, callback){
	data.getCmsData(function(cmsData){
		data.getCmsPage(route, function(page){
			tplData = {
				"app" : cmsData,
				"title" : page.title,
				"isSocket" : false,
				"page" : page

			};
			callback && callback(tplData);
		});
	});
};