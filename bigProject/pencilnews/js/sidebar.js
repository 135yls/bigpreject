var _article_title;
//判断是否为手机
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

function sidebar() {
    // console.log(_article_title)
    //根据窗口高度改变右边浮动栏位置
    if (IsPC()) {
        adjustToTopPos();
        $(window).resize(function() {
            adjustToTopPos();
        });
    }

    //滚动到一定距离显示置顶
    // $('.top-top .icon-top').hide();
    // $('#topArrow').hide();
    $(window).scroll(function() {
        // console.log($(window).scrollTop())
        if ($(document).scrollTop() > 300) {
            $('#topArrow').show();
        } else {
            $('#topArrow').hide();
        }
        // $('#topArrow').show().animate({ opacity: "1" });

    });
    // function hideToTop() {
    //     $('#topArrow').animate({ opacity: "0" }, function(){
    //         // console.log(this)
    //      $(this).hide();
    //  });
    // }

    $(".to-top .icon-top").click(function() {
        if (navigator.userAgent.indexOf('Firefox') >= 0) {
            document.documentElement.scrollTop = 0;

        } else {
            $('body').animate({
                scrollTop: 0
            }, 500);
        }

    });
    $(".to-top .icon-wechat2").click(function() {
        $(".qr-wra").fadeIn();
    });
    $(".qr-wra .fa-times,.qr-wra").click(function() {
        $('.qr-wra').fadeOut();
    });
    //生成二维码
    $('#qr-div').qrcode({
        text: window.location.href
    });
    // $('#qr-div').qrcode({
    //     text: "lj2457309846"
    // });
    //微博链接
    var weiboUrl = location.href;
    var weiboTitle = _article_title ? _article_title : '铅笔道－不撒谎的融资媒体';
    var weiboHref = 'http://service.weibo.com/share/share.php?url=' + weiboUrl + '&title=' + weiboTitle;
    $('.icon-sina_nobg').attr('href', weiboHref);

    // 订阅资讯
    $(".email-hint").click(function() {
        $(".sidebar-subscribe .email-input").trigger('focus');
    });

    $(".sidebar-subscribe .email-input").on('input', function() {
        //alert($(this).val());
        if ($(this).val() != "") {
            $(".email-hint").hide();
        } else {
            $(".email-hint").show();
        }
    });
    $(".sidebar-subscribe .email-input").blur(function() {
        if ($(this).val() == "") {
            $(".email-hint").show();
        }
    });


}

function sidebarHot() {
    //加载最热文章
    //加载热门文章，最多喜欢
    $.ajax({
        method: "GET",
        url: v1url + "hot",
        'headers': {
            "devicetoken": cookie_PENCILNEWSID,
        },
        // dataType:'json'
    }).done(function(data) {
        // console.log(data)
        if (typeof(data) != "object") {
            data = $.parseJSON(data);
        }

        var hot_hit_arr = data['data']['hot_hit'];
        var hot_like_arr = data['data']['hot_like'];
        var hot_comment_arr = data['data']['hot_comment'];
        var latest_comment_arr = data['data']['latest_comment'];

        $("#hot").html(hotArticlesHtml(hot_hit_arr));
        $("#latest").html(hotArticlesHtml(hot_like_arr));
        $("#hot-comment").html(hotCommentsHtml(hot_comment_arr));
        $("#new-comment").html(hotCommentsHtml(latest_comment_arr));

    });
}

//编写热门文章 最多喜欢 html
function hotArticlesHtml(articlesArr) {
    var myhtml = '';
    for (var i = 0; i < articlesArr.length; i++) {
        var cur = articlesArr[i];
        myhtml += '<div class="item" data-id=' + cur['article_id'] + '> <a href="/p/' + cur['article_id'] + '.html" title = "' + cur['title'] + '" class = "" ><div class = "item-pic1" ><img src = "http://cdn.pencilnews.cn/' + cur['cover_img'] + '?imageView2/2/w/500/h/500/q/75" alt = "' + cur.title + '" class = "" > </div> <div class = "item-content"><a href="/p/' + cur['article_id'] + '.html">' + cur['title'] + '</a><div class = "item-time" >' + cur['create_at'] + '</div> </div> </a></div>';
    }
    return myhtml;

}
//编写热门评论 html
function hotCommentsHtml(articlesArr) {
    var myhtml = '';
    for (var i = 0; i < articlesArr.length; i++) {
        var cur = articlesArr[i];
        var avatarSrc = '';
        if (cur['user']['avatar'] == null) {
            avatarSrc = "/imgs/defaultAva40.png";
        } else {
            avatarSrc = "http://cdn.pencilnews.cn/" + cur['user']['avatar'] + "?" + (new Date()).getTime();
        }
        var commentId = cur['comment_id'];
        var commentCon =
            myhtml += '<div class="item" data-id=' + cur['comment_id'] + '><div class="comment-content"><a href="/p/' + cur['article_id'] + '.html#comment-' + cur['comment_id'] + '">' + cur['content'] + '</a></div> <div class = "comment-author" ><a><img src ="' + avatarSrc + '" alt = "" class = "item-pic avatar" > ' + cur['user']['name'] + '</a></div> <div class = "comment-src" data-article-id=' + cur['article']['article_id'] + ' > 来源： <a href="/p/' + cur['article_id'] + '.html" >' + cur['article']['title'] + '</a></div></div>';
    }
    return myhtml;
}

function adjustToTopPos() {
    var winHeight = $(window).height();
    var toTopHeight = $(".to-top").height();
    var toToBottom = (winHeight - toTopHeight) / 2;
    $(".to-top").css({
        bottom: toToBottom + 'px'
    });
    //console.log(toTopHeight);
}

//article fix sidebar
$(window).scroll(function() {
    var h = $(this).scrollTop(); //获得滚动条距top的高度

    //console.log(h);
    //console.log($("#side_fix").scrollTop());
    // var sidebarW=$("#side_fix").prev().outerWidth()+'px';
    var sidebarW = $(".sidebar").width() + 'px';
    if (h > 2060) {
        $("#side_fix").css({
            "position": "fixed",
            "top": "14%",
            "width": sidebarW
        });
        //$("footer").hide();
    } else {
        $("#side_fix").css({
            "position": "relative",
            //"top":"14%",
            "width": "auto"
        });
    }
    var diff = document.getElementById("main-footer").offsetTop - h;
    if (diff <= 704) {
        $("#side_fix").hide();
    } else {
        $("#side_fix").show();
    }

});
