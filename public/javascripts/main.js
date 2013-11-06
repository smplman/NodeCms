$(document).ready(function(){

    var socket  = io.connect('http://localhost:3000'),
        text    = $('h1');

    $statusLight = $('[data-socket]');

    socket.on('connect', function () {
        //text.html('connected');
        $statusLight.removeClass();
        $statusLight.addClass('led led-green');
    });

    socket.on('disconnect', function () {
        //text.html('disconnected');
        $statusLight.removeClass();
        $statusLight.addClass('led led-red');
    });

    //Setup Page links
    pageLinks = $('[data-page]');
    //console.log($pageLinks);

    $('[data-page]').click(function(e){
        e.preventDefault();
        el = $(e.target);
        pageName = el.data('page');
        socket.emit('page_request', {"name" : pageName});
    });

    var container = $('#container');

    socket.on('page_response', function (page) {
        currentPage = container.html();
        container.html(page.html);
        console.log(page);
        text.html(page.title);
        document.title = page.title;
        window.history.pushState({"html":currentPage,"pageTitle":page.title},"", page.route);
    });
});