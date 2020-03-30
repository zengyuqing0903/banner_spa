function Banner(){
    this.show = function(conf){
        var cfg = {
            arr:['img/b5.png','img/b1.png','img/b2.png','img/b3.png','img/b4.png','img/b5.png','img/b1.png'],//图片数组
            imgnum:5,//图片数
            time:1000,//定时时间
        },
        index = 1,//出现第一张图片下标值
        isMoving = false,
        timer;
         // 1.DOM draw
        var $slide = $("<div class='slider' id='slider'></div>");
        $("#box").append($slide);
        $.extend(cfg,conf);
        for(var i=0;i<cfg.arr.length;i++){
            var $img = $('<div class="slide"><img src='+cfg.arr[i]+' alt=" "></div>');
            $("#slider").append($img);
        }
        var $left = $('<span id="left"><</span>');
        $("#box").append($left);
        var $right = $('<span id="right">></span>');
        $("#box").append($right);
        var $nav = $('<ul class="nav" id="navs">');
        $("#box").append($nav);
        for(var j=0;j<cfg.imgnum;j++){
            var $li = $("<li>"+(j+1)+"</li>");
            $('#navs').append($li);
        }
        // 2.事件
        var $box = $('#box')[0],$slider = $('#slider')[0],$lef = $('#left')[0],
            $rig = $('#right')[0],$lis = $('li');
        // 鼠标划上轮播图
        $box.onmouseover = function(){
            move($lef, {opacity: 0.7})
			move($rig, {opacity: 0.7})
            clearInterval(timer); 
        }
        // 鼠标划出轮播图
        $box.onmouseout = function(){
            move($lef, {opacity: 0})
			move($rig, {opacity: 0})
            timer = setInterval(next,cfg.time); 
        }
        $rig.onclick = next;
        $lef.onclick = prev;
        var ziLeft = parseInt($('#slider').css('left'));
        // 图片向左
        function next() {
            if (isMoving) {return;}
            isMoving = true;
            index++;
            navmove();
            move($slider, {left: ziLeft * index},function(){
                if (index == (cfg.imgnum+1)) {
                    $slider.style.left = ziLeft+'px';
                    index = 1;
                }
                isMoving = false;
            });
        }
        // 图片向右
        function prev() {
            if (isMoving) {return;}
            isMoving = true;
            index--;
            navmove();
            move($slider, {left: ziLeft * index}, function () {
                if (index == 0) {
                    $slider.style.left = ziLeft*cfg.imgnum+'px';
                    index = cfg.imgnum;
                }
                isMoving = false;
            });
        }
        $($lis[0]).addClass("active");
        //图片切换时圆点样式跟着切换
        function navmove() {
            for (var i = 0; i < $lis.length; i++) {
                if($($lis[i]).hasClass("active")){
                    $($lis[i]).removeClass("active");
                }
            }
            if (index > cfg.imgnum) {
                $($lis[0]).addClass("active");
            } else if (index <= 0) {
                $($lis[cfg.imgnum-1]).addClass("active");
            } else {
                $($lis[index-1]).addClass('active');
            }
        }
        //点击圆点切换
        for (var i = 0; i < $lis.length; i++) {
            $lis[i].index = i;
            $lis[i].onclick = function () {
                index = this.index + 1;
                navmove();
                move($slider, {left: ziLeft * index});
            }
        }
        // 自动
        timer = setInterval(next, cfg.time);
        function getStyle(obj, attr) { //返回值带有单位px
            if (obj.currentStyle) {
                return obj.currentStyle[attr];
            } else {
                return getComputedStyle(obj, null)[attr];
            }
        }
        function move(obj, json, callback) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                var flag = true;
                for (var attr in json) {
                    (function (attr) {
                        if (attr == "opacity") {
                            var now = parseInt(getStyle(obj, attr) * 100);
                            var dest = json[attr] * 100;
                        } else {
                            var now = parseInt(getStyle(obj, attr));
                            var dest = json[attr];
                        }
                        var speed = (dest - now) / 6;
                        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                        if (now != dest) {
                            flag = false;
                            if (attr == "opacity") {
                                obj.style[attr] = (now + speed) / 100;
                            } else {
                                obj.style[attr] = now + speed + "px";
                            }
                        }
                    })(attr);
                }
                if (flag) {
                    clearInterval(obj.timer);
                    callback && callback(); 
                }
            }, 30);
        }    
    }
}

 




