define(['jquery'], function($){

	var componentManager = {

		init : function(data){
			data.find('[data-component]').each(function(index){
				require([$(this).data('component')], function(data){
					//Setup Data
					console.log('Require Data:', this);
				}, function (err){
					console.log(err);
				});
			});
			//console.log(components);
		},

		destroy : function(data){
			data.find('[data-component]').each(function(index){
				require.undef([$(this).data('component')]);
			});
		}

	};

	return componentManager;

});