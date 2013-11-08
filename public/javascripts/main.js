$(document).ready(function(){

    var socket  = io.connect('http://localhost:3000');

    //Notifications
    var note = $('[data-widget="notificationWidget"]');
    $statusLight = $('[data-socket]');
    note.notify();

    socket.on('connect', function () {
        $statusLight.removeClass();
        $statusLight.addClass('led led-green');
        note.notify("create", "server-alert", {
            notice: "Connected to Socket Server"
        });
    });

    socket.on('disconnect', function () {
        $statusLight.removeClass();
        $statusLight.addClass('led led-red');
        note.notify("create", "server-alert", {
            notice: "Disconnected from Socket Server"
        });
    });

    socket.on('server-alert', function (alert) {
        note.notify("create", "server-alert", {
            notice: alert
        });
    });

    var container = $('#container');
    socket.on('page_response', function (page) {
        currentPage = container.html();
        container.html(page.html);
        console.log(page);
        document.title = page.title;
        window.history.pushState({"html":currentPage,"pageTitle":page.title},"", page.route);
    });

    //Page request to socket server
    $('[data-page]').click(function(e){
        e.preventDefault();
        el = $(e.target);
        route = el.attr('href');
        socket.emit('page_request', {"route" : route});
        note.notify("create", "server-alert", {
            notice: route + " requested"
        });
    });

    //Form submit to socket server
    $('[data-form]').submit(function(e){
        e.preventDefault();
        form = $(e.target);
        formAction = form.data('form');
        formData = form.serializeObject();
        socket.emit(formAction, formData);
        console.log(formData);
    });
});


// Credit for function below
// http://jsfiddle.net/sxGtM/3/
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};