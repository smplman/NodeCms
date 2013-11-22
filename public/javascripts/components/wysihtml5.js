define(['jquery','/bootstrap/js/wysihtml5-0.3.0_rc2.min.js','/bootstrap/js/bootstrap-wysihtml5-0.0.2.js'], function($){

	$(document).ready(function(){
		if ($.isFunction($.fn.wysihtml5)) {
			$('#newPageEditor').wysihtml5();
		} else {
			console.log('Problem initializing wysihtml5');
		}
	});

});