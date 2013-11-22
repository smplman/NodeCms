require.config({
    //baseUrl: '',
    paths: {
        jquery: '/javascripts/jquery-1.10.2',
        jqueryUi: '/jquery-ui/js/jquery-ui-1.10.3.custom',
        socketManager : '/javascripts/managers/socketManager',
        socketIo: '/socket.io/socket.io',
        notificationManager: '/javascripts/managers/notificationManager',
        notify: '/javascripts/jquery.notify',
        componentManager : '/javascripts/managers/componentManager',
        wysihtml5 : '/javascripts/components/wysihtml5'
    }
});

//require(['jquery'],function(){});

define([
    'jquery',
    'jqueryUi',
    'socketManager',
    'notificationManager',
    'componentManager'
    ],function($, ui, socketMgr, notificationMgr, componentMgr){

    //Setup Socket
    //var socketManager = require(['socketManager']);
    //Setup Notifications
    //var notificationManager = require(['notificationManager']);

    $(document).ready(function(){

        //Setup Components
        componentMgr.init($('body'));

        //var socket  = io.connect('http://192.168.1.3:3000');

        //Notifications
        //var note = $('[data-widget="notificationWidget"]');
        //$statusLight = $('[data-socket]');
        // note.notify();

        // socket.on('connect', function () {
        //     $statusLight.removeClass();
        //     $statusLight.addClass('led led-green');
        //     note.notify("create", "server-alert", {
        //         notice: "Connected to Socket Server"
        //     });
        // });

        // socket.on('disconnect', function () {
        //     $statusLight.removeClass();
        //     $statusLight.addClass('led led-red');
        //     note.notify("create", "server-alert", {
        //         notice: "Disconnected from Socket Server"
        //     });
        // });

        // socket.on('server-alert', function (alert) {
        //     note.notify("create", "server-alert", {
        //         notice: alert
        //     });
        // });

        //Page request to socket server
        $('[data-pageroute]').click(function(e){
            e.preventDefault();
            el = $(e.target);
            route = el.attr('href');
            //socket.emit('page_request', {"route" : route});
            //console.log(socketMgr, notificationMgr);
            socketMgr.emit('page_request:' + route);
            notificationMgr.notify("create", "server-alert", {
                notice: route + " requested"
            });
        });

        // //Page Response
        // var container = $('#container');
        // socketMgr.on('page_response', function (page) {
        //     var body = $('body');

        //     currentPageHtml = container.html();
        //     currentPage = body.data('page');

        //     //Load page specific CSS and JS
        //     if (page.stylesheets) {
        //         $.each(page.stylesheets, function(i,d) {
        //             $('head').append('<link rel="stylesheet" href="' + d.path + '" type="text/css" />');
        //         });
        //     }

        //     if (page.javascripts) {
        //         //Merge header and footer scripts
        //         scripts = $.merge(page.javascripts.header, page.javascripts.footer);
        //         $.each(scripts, function(i, d){
        //             $.getScript(d.path, function(data,textStatus, jqxhr){
        //                 console.log('Script Loaded:', textStatus);
        //             });
        //         });
        //     }

        //     //Set new page data
        //     container.html(page.html);
        //     body.data('page', page);



        //     console.log(page);
        //     document.title = page.title;
        //     window.history.pushState({"html":currentPageHtml,"pageTitle":page.title},"", page.route);
        // });


        //Form submit to socket server
        $('[data-form]').submit(function(e){
            e.preventDefault();
            form = $(e.target);
            formAction = form.data('form');
            formData = form.find("[data-field]").serializeObject();
            socket.emit(formAction, formData);
            console.log(formAction, formData);
        });

        //Form element edit setup
        editItems = $('[data-edit]');
        editItems.dblclick(function(){
            var item = $(this);
            if(item.hasClass('editing')){return false;}
            saveBtn = item.find('[data-save]');
            saveBtn.removeClass('disabled');
            item.addClass('editing');
            itemAction = item.data('edit');
            fields = item.find('[data-field]');
            $.each(fields, function(i, field){
                field = $(field);
                value = field.text();
                name = field.data('field');
                if(name == '_id'){return;}
                formEl = '<input type="text" class="form-control" name="'+ name + '" value="'+ value +'">';
                field.html(formEl);
            });

        });
        //Save button setup
        $.each(editItems, function (i, el){
            el = $(el);
            var saveBtn = el.find('[data-save]');

            saveBtn.on('click', function(e){
                e.preventDefault();
                btn = $(e.target);
                data = el.find('input').serializeObject();
                socket.emit(itemAction, data);
                console.log(itemAction, data);

                el.removeClass('editing');
                saveBtn.addClass('disabled');

                $.each(fields, function(i, field){
                    field = $(field);
                    value = field.find('input').val();
                    field.html(value);
                });
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

    });

});// End define