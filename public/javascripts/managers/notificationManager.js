define(['jquery','notify'], function($){

	var notificationMgr = $('[data-widget="notificationWidget"]').notify();

	return notificationMgr;

});