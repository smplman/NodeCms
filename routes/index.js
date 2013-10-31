
/*
 * GET CMS Page
 */

exports.index = function(cmsData, page) {
	return function(req, res){;
  	    res.render(page.template, {
  	        "app" : cmsData,
  	        "title" : page.title,
  	        "isSocket" : false
  	    });
  	};
};