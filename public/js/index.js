define(function(require, exports, module) {
    require('jquery');

    var winWidth = $(window).width();
    var winHeight = $(window).height();

    var $box = $('#box');
    var $list = $('#list');
    var $items = $('.item');

    var listLeft = $list.css('margin-left');
    var listTop = $list.css('margin-top');

    $items.on('mousedown', function(e) {
        var self = this;
        var width = $(self).width(); // item宽度
        var height = $(self).height(); // item高度
        var origLeft = $(self).position().left;
        var origTop = $(self).position().top
        var origX = e.clientX;
        var origY = e.clientY;
        var origZIndex = $(self).css('z-index');

        $(self).css('z-index', '9999');
        $(self).addClass('itemActive');

        $(document).on('mousemove', function(e) {
            var newLeft = origLeft + e.clientX - origX;
            var newTop = origTop + e.clientY - origY;
            if (newLeft >= -listLeft && newLeft <= winWidth - width - listLeft) {
                $(self).css('left', newLeft);
            }

            if (newTop >= -listTop && newTop <= winHeight - height - listTop) {
                $(self).css('top', newTop);
            }


        });

        $(document).on('mouseup', function(e) {
            $(document).off('mouseup');
            $(document).off('mousemove');
            $(self).css('z-index', origZIndex);
            $(self).removeClass('itemActive');
        });

        function moveHandler(e) {

        }
    });




});