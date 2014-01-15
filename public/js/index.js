define(function(require, exports, module) {
    require('jquery');

    var winWidth = $(window).width();
    var winHeight = $(window).height();

    var $box = $('#box');
    var $list = $('#list');
    var $items = $('.item');

    var listLeft = $list.offset().left;
    var listTop = $list.offset().top;

    var pos = [];
    for (var i = 0; i < $items.length; i++) {
        $items[i].index = i;
        pos.push({
            'left': $($items[i]).position().left,
            'top': $($items[i]).position().top
        });
    }

    $items.on('mousedown', function(e) {
        var self = this;
        var width = $(self).width();
        var height = $(self).height();
        var disX = e.clientX - $(self).offset().left;
        var disY = e.clientY - $(self).offset().top;
        var origZIndex = $(self).css('z-index');
        var nearest;

        $(self).css('z-index', '9999');
        $(self).addClass('itemActive');

        $(document).on('mousemove', function(e) {
            var w = e.clientX - disX - listLeft;
            var h = e.clientY - disY - listTop;
            (w < -listLeft) && (w = -listLeft);
            (w >= (winWidth - width - listLeft)) && (w = winWidth - width - listLeft);
            (h < -listTop) && (h = -listTop);
            (h >= (winHeight - height - listTop)) && (h = winHeight - height - listTop);
            $(self).css('left', w);
            $(self).css('top', h);
            nearest = findNearest(self);
            $('.itemRelated').removeClass('itemRelated');
            if ( !! nearest) {
                $(nearest).addClass('itemRelated');
            }
        });

        $(document).on('mouseup', function(e) {
            $(document).off('mouseup');
            $(document).off('mousemove');
            $(self).css('z-index', origZIndex);
            $(self).removeClass('itemActive');
            $('.itemRelated').removeClass('itemRelated');

            if ( !! nearest) { // 鼠标松开时，有最近元素
                startMove(self, pos[nearest.index]);
                startMove(nearest, pos[self.index]);
                var temp = nearest.index;
                nearest.index = self.index;
                self.index = temp;
            } else { // 鼠标松开时，无最近元素
                startMove(self, pos[self.index]);
            }
        });

        function moveHandler(e) {

        }
    });

    /**
     * 碰撞检测
     * @return {Boolean} true碰撞 false未碰撞
     */
    function isCollide(o1, o2) {
        var a1 = $(o1).offset().left;
        var b1 = $(o1).offset().top;
        var c1 = a1 + $(o1).width();
        var d1 = b1 + $(o1).height();

        var a2 = $(o2).offset().left;
        var b2 = $(o2).offset().top;
        var c2 = a2 + $(o2).width();
        var d2 = b2 + $(o2).height();

        if (a2 > c1 || b2 > d1 || a1 > c2 || b1 > d2) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 求两个元素中心点之间的距离
     * @return {Number}
     */
    function getDistance(o1, o2) {
        var a = ($(o1).offset().left + $(o1).width() / 2) - ($(o2).offset().left + $(o2).width() / 2);
        var b = ($(o1).offset().top + $(o1).height() / 2) - ($(o2).offset().top + $(o2).height() / 2);
        return Math.sqrt(a * a + b * b);
    }

    /**
     * 查找离元素obj最近的那个元素
     */
    function findNearest(obj) {
        var minDis = Number.MAX_VALUE;
        var items = document.getElementsByClassName('item');
        var ret = null;
        var dis;

        for (var i = 0; i < items.length; i++) {
            if (obj === items[i]) {
                continue;
            } else {
                if (isCollide(obj, items[i])) {
                    dis = getDistance(obj, items[i]);
                    if (dis < minDis) {
                        minDis = dis;
                        ret = items[i];
                    }
                }
            }
        }

        return ret;
    }

    function startMove(obj, pos) {
        $(obj).animate({
            'left': pos.left,
            'top': pos.top
        });
    }





});