define(['jquery','socketIo', 'notificationManager', 'componentManager'], function($, io, notificationMgr,componentMgr){

	var socketMgr = io.connect('http://192.168.1.3:3000');

	$statusLight = $('[data-socket]');

    socketMgr.on('connect', function () {
        $statusLight.removeClass();
        $statusLight.addClass('led led-green');
        notificationMgr.notify("create", "server-alert", {
            notice: "Connected to Socket Server"
        });
    });

    socketMgr.on('disconnect', function () {
        $statusLight.removeClass();
        $statusLight.addClass('led led-red');
        // note.notify("create", "server-alert", {
        //     notice: "Disconnected from Socket Server"
        // });
    });

    socketMgr.on('server-alert', function (alert) {
        // note.notify("create", "server-alert", {
        //     notice: alert
        // });
    });

    //Page Response
    socketMgr.on('page_response', function (page) {
    	var container = $('#container');
        var body = $('body');

        currentPageHtml = container.html();
        currentPage = body.data('page');
        componentMgr.destroy(container);

        //Load page specific CSS and JS
        if (page.stylesheets) {
            $.each(page.stylesheets, function(i,d) {
                $('head').append('<link rel="stylesheet" href="' + d.path + '" type="text/css" />');
            });
        }

        // if (page.javascripts) {
        //     //Merge header and footer scripts
        //     scripts = $.merge(page.javascripts.header, page.javascripts.footer);
        //     $.each(scripts, function(i, d){
        //         $.getScript(d.path, function(data,textStatus, jqxhr){
        //             console.log('Script Loaded:', textStatus);
        //         });
        //     });
        // }

        //Set new page data
        container.html(page.html);
        body.data('page', page);

        //Setup Components
        componentMgr.init(container);

        console.log(page);
        document.title = page.title;
        window.history.pushState({"html":currentPageHtml,"pageTitle":page.title},"", page.route);
    });

    return socketMgr;

});