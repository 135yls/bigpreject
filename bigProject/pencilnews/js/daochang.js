var baiduMapLocation = "北京市";
var daochang_timestart = null;

function getDaochangArticles(cateId, pageSize, page, fun) {
    var localToken = "";
    if ($.jStorage.get("localToken")) {
        localToken = $.jStorage.get("localToken");
    }
    $.get({
        url: v1url + "articles",
        headers: {
            "token": localToken,
            "devicetoken": cookie_PENCILNEWSID,
        },
        type: "GET",
        data: {
            "time_start":time_start,
            "cate_id": cateId,
            "page_size": pageSize,
            "page": page
        },
        success: function(data) {
            if ((typeof data) == "string") {
                data = $.parseJSON(data);
            }
            fun(data);
        },
        error: function() {}

    });
}

function getAlliance(cateId, pageSize, page, fun) {
    $.get({
        url: v1url + "alliance",
        type: "GET",
        'headers': {
            "devicetoken": cookie_PENCILNEWSID,
        },
        data: {
            "cate_id": cateId,
            "page_size": pageSize,
            "page": page
        },
        success: function(data) {
            if ((typeof data) == "string") {
                data = $.parseJSON(data);
            }
            fun(data);
        },
        error: function() {}

    });
}

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

function showDaochangActivity(data, jqObj) {
    var articles = data.data.articles;
    if (articles.length == 0) {
        return 0;
    }
    daochang_timestart = data.data._pageinfo.time_start;
    for (i = 0; i < articles.length; i++) {
        var articleId = articles[i].article_info.article_id;
        var title = articles[i].article_info.title;
        var digest = articles[i].article_info.digest;
        var articleLink = "/d/" + articleId;
        var coverImg = articles[i].article_info.cover_img;
        var coverImgUrl = "http://cdn.pencilnews.cn/" + coverImg + "?imageView2/2/w/500/h/500/q/75";
        var userAvatar = articles[i].author.profile.avatar;
        var userAvatarUrl = "http://cdn.pencilnews.cn/" + userAvatar + "?imageView2/2/w/500/h/500/q/75";
        var authorName = articles[i].author.profile.name;
        var publishTime = articles[i].article_info.create_at.split(" ")[0];
        
        var favorites = articles[i].article_info.favorites_count;
        var startTime = "";
        var number = "";
        var district = "";
        if (articles[i].campaign == null) {
            articleLink = "/p/" + articleId;
        }
        if (articles[i].campaign != null) {

            number = "<span class='icon-mine2'></span><span>" + articles[i].campaign.joined_num + "</span>";
            if (articles[i].campaign.joined_num == null) {
                number = "";
            }
           
            if(articles[i].campaign.start == null){
                startTime = publishTime;
            }else{
                startTime = articles[i].campaign.start.split(" ")[0];
            }
            if (articles[i].campaign.district) {
                district = "<span class='icon-location'></span><span>" + articles[i].campaign.district.name + "</span>";
            } else {
                articleLink = "/p/" + articleId;
            }
            $.jStorage.set("join-" + articleId, articles[i].campaign.joined);
        }


        if (digest == null) {
            digest = "";
        }


        if (IsPC()) {
            if (title.length > 32) {
                title = title.substring(0, 32) + '...';
            }
        } else {
            if (title.length > 25) {
                title = title.substring(0, 25) + '...';
            }
        }

        jqObj.append("<div class='col-sm-4 col-xs-6 activity_block_container'><div class='recent_activity'><div class='activity_coverimg_con'><a href=" + "'" + articleLink + "'" + "><img class='recent_activity_img img-responsive' alt=" + "'" + title + "'" + " src=" + "'" + coverImgUrl + "'" + "></a></div><div class='recent_activity_content'><h2><a href=" + "'" + articleLink + "'" + ">" + title + "</a></h2><div class='activity_digest'><p><a href=" + "'" + articleLink + "'" + ">" + digest + "</a></p></div></div><div class='recent_activity_author'><div class='pull-left'><img alt=" + "'" + authorName + "'" + " src=" + "'" + userAvatarUrl + "'" + "><span>" + authorName + "</span></div><div class='pull-right'>" + number + "<span class='icon-collection'></span><span>" + favorites + "</span></div><div style='clear:both'></div></div><div class='recent_activity_bottom'><div class='pull-left'><span class='icon-time'></span><span>" + startTime + "</span></div><div class='pull-right'>" + district + "</div><div style='clear:both'></div></div></div></div>");



    }
}

//显示联盟服务、媒体
function showDaochangBusiness(data, jqObj) {
    var articles = data.data.alliance;
    if (articles.length == 0) {
        return 0;
    }
    for (i = 0; i < articles.length; i++) {
        var title = articles[i].title;
        var digest = articles[i].desc;
        var articleLink = articles[i].link;
        var coverImg = articles[i].img;
        var coverImgUrl = "http://cdn.pencilnews.cn/" + coverImg + "?imageView2/2/w/500/h/500/q/75";

        if (digest == null) {
            digest = "";
        }

        if (IsPC()) {
            if (title.length > 32) {
                title = title.substring(0, 32) + '...';
            }
        } else {
            if (title.length > 25) {
                title = title.substring(0, 25) + '...';
            }
        }
        jqObj.append("<a target='_blank' href='" + articleLink + "'><div class='col-md-3 col-sm-4 col-xs-6'><div class='wra'><div class='business-logo'><img src=" + coverImgUrl + "></div><div class='description'><a target='_blank' href='" + articleLink + "'>" + title + "</a></div</div></div></a>");

    }
}

//获得品牌活动
var brandActivityPage = 1;
$("#load_more_brand_activity").click(function() {
    if (brandActivityPage == 0) {
        return;
    }
    getDaochangArticles(6, 18, brandActivityPage, function(data) {
        if (showDaochangActivity(data, $("#brand_activity_con")) == 0) {
            $("#load_more_brand_activity").hide();
            brandActivityPage = 0;
        }
        showDaochangActivity(data, $("#brand_activity_con"));
    });
    brandActivityPage++;
});


//获得隔壁动态
var neighbourActivityPage = 1;
$("#load_more_neighbour").click(function() {
    if (neighbourActivityPage == 0) {
        return;
    }
    getDaochangArticles(7, 18, neighbourActivityPage, function(data) {
        if (showDaochangActivity(data, $("#neighbour_status_con")) == 0) {
            $("#load_more_neighbour").hide();
            neighbourActivityPage = 0;
        }
        showDaochangActivity(data, $("#neighbour_status_con"));
    });
    neighbourActivityPage++;
});


//获得A轮融资
var aCollegePage = 1;
$("#load_more_acollege").click(function() {
    if (aCollegePage == 0) {
        return;
    }
    getDaochangArticles(8, 18, aCollegePage, function(data) {
        if (showDaochangActivity(data, $("#a_college_con")) == 0) {
            $("#load_more_acollege").hide();
            aCollegePage = 0;
        }
        showDaochangActivity(data, $("#a_college_con"));
    });
    aCollegePage++;
});


//获得更多联盟服务
//var allianceSerPage = 1;
//$(".load_more_alliance_service").click(function() {
//    _this = $(this);
//    if (allianceSerPage == 0) {
//        return;
//    }
//    getAlliance(9, 18, allianceSerPage, function(data) {
//        if (showDaochangBusiness(data, $("#alliance_service_con")) == 0) {
//            _this.html("没有更多的内容了");
//            allianceSerPage = 0;
//        }
//        showDaochangBusiness(data, $("#alliance_service_con"));
//    });
//    allianceSerPage++;
//});


//获得更多联盟媒体
//var allianceMediaPage = 1;
//$(".load_more_alliance_media").click(function() {
//    _this = $(this);
//    if (allianceMediaPage == 0) {
//        return;
//    }
//    console.log("not return");
//    getAlliance(10, 18, allianceMediaPage, function(data) {
//        console.log("not 0");
//        console.log(showDaochangBusiness(data, $("#alliance_media_con")));
//        if (showDaochangBusiness(data, $("#alliance_media_con")) == 0) {
//            
//            
//            _this.html("没有更多的内容了");
//            allianceMediaPage = 0;
//        }
//        showDaochangBusiness(data, $("#alliance_media_con"));
//
//    });
//    allianceMediaPage++;
//});

//筛选显示url
$("#daochang_nav_tabs").on("click", "li", function() {
    var tempHash = $(this).find("a").attr("href");
    location.hash = tempHash;
    // History.replaceState({ state: 1 }, web_name, "?industry_id=" + industry_id + "&stage_id=" + stage_id);
});

//加载道场活动页面时判断url中是否携带相应hash
function daochangCheckHash() {
    var dcIdArr = ["#brand-activity", "#neighbour-status", "#a-college"],
        tempHash = location.hash,
        actInd;

    switch (tempHash) {
        case dcIdArr[0]:
            actInd = 0;
            break;
        case dcIdArr[1]:
            actInd = 1;
            break;
        case dcIdArr[2]:
            actInd = 2;
            break;
        default:
            actInd = 0;
    }

    // for(var i=1,len=dcIdArr.length;i<len;i++){
    //     if(tempHash==dcIdArr[i]){
    //         actInd=i;
    //         break;
    //     }
    // }

    $(".tab-content .tab-pane").eq(actInd).addClass('active').siblings().removeClass('active');
    $("#daochang_nav_tabs li").eq(actInd).addClass('active').siblings().removeClass('active');

}

/* 道场－报名页面相关js */
/**********************/



function activitySignUp(token, articleId, name, phoneNumber, email, fun) {
    $.post({
        url: v1url + "campaign/join?" + $.param({
            "article_id": articleId
        }),
        type: "POST",
        headers: {
            "token": token,
            "devicetoken": cookie_PENCILNEWSID,
        },
        data: {
            "name": name,
            "phone": phoneNumber,
            "email": email
        },
        success: function(data) {
            if ((typeof data) == "string") {
                data = $.parseJSON(data);
            }
            fun(data);
        },
        error: function() {}
    });
}

function isActivityLogin() {
    if ($.jStorage.get("localToken")) {
        return true;
    } else {
        return false;
    }
}

function validActivityName() {
    var activityName = $("#activity_name").val();
    if (activityName == "" || activityName.length > 22) {
        return false;
    } else {
        return true;
    }
}

function validActivityPhone() {
    var activityPhone = $("#activity_phone").val();
    var myreg = /^1\d{10}$/;
    if (!myreg.test(activityPhone)) {
        return false;
    } else {
        return true;
    }

}

function validActivityEmail() {
    var activityEmail = $("#activity_email").val();
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!myreg.test(activityEmail)) {
        return false;
    } else {
        return true;
    }
}

var iwanto_sign_btn_count = 1;
$("#iwanto_sign_btn").click(function() {
    //判断是否登录
    // 登录后才能报名
//    if (!isActivityLogin()) {
//        showWarning("请登录后报名！");
//        return;
//    }
    //登录后才能报名 end 
    //if已经报名，show已经报名，请不要重复报名
    //没报名
    if (iwanto_sign_btn_count == 2) {
        return;
    }
    if (iwanto_sign_btn_count == 1) {
        $("#activity_name").val($.jStorage.get("localName"));
        $("#activity_phone").val($.jStorage.get("localUsername"));
        $("#activity_email").val($.jStorage.get("localEmail"));
        iwanto_sign_btn_count = 3;
    }

    if (isPhone()) {
        $("#activity_signup_mask").show();
    }

    $("#activity_sign_form").toggle();

});

$("#activity_singup_submit").click(function() {
    //验证表单
    console.log("click");
    if (!validActivityName()) {
        showWarning("请正确输入用户名！");
    } else if (!validActivityPhone()) {
        showWarning("请正确输入手机号！");
    } else if (!validActivityEmail()) {
        showWarning("请正确输入邮箱！");
    } else {
        var token = "";
        if($.jStorage.get("localToken")){
            token = $.jStorage.get("localToken");
        }
        var name = $("#activity_name").val();
        var phoneNumber = $("#activity_phone").val();
        var email = $("#activity_email").val();
        var articleId = activityDetailId;
        activitySignUp(token, articleId, name, phoneNumber, email, function(data) {
            $("#activity_signup_mask").hide();
            if (data.code == -1) {
                showWarning("登录时间过期，请重新登录！");
            }
            if (data.code == 1000) {
                $("#activity_sign_form").hide();
                $("#iwanto_sign_btn").css({
                    "background": "#c2c2c2",
                    "opacity": "1"
                });
                $("#iwanto_sign_btn").attr("disabled", "true");
                iwanto_sign_btn_count = 2;
                $.jStorage.set("join-" + articleId, "true");
                $("#iwanto_sign_btn").html("已报名");
                console.log("已报名");
                console.log($.jStorage.get("join-" + articleId));
            }
            if (data.code == 1004) {
                showWarning("活动已过期");
                $("#activity_sign_form").hide();
                $("#iwanto_sign_btn").css({
                    "background": "#c2c2c2",
                    "opacity": "1"
                });
                $("#iwanto_sign_btn").attr("disabled", "true");
                iwanto_sign_btn_count = 2;
                $.jStorage.set("join-" + articleId, "true");
                $("#iwanto_sign_btn").html("已过期");
            }
            if (data.code == 1002) {
                showSuccess("您已经报名过此活动，请不要重复报名！");
                $("#activity_sign_form").hide();
                $("#iwanto_sign_btn").css({
                    "background": "#c2c2c2",
                    "opacity": "1"
                });
                $("#iwanto_sign_btn").attr("disabled", "true");
                iwanto_sign_btn_count = 2;
                $("#iwanto_sign_btn").html("已报名");
            }
        });
    }
    //通过后


});

$("#activtiy_singup_cancel").click(function() {
    iwanto_sign_btn_count = 1;
    $("#activity_sign_form").hide();
});

$("#activity_signup_mask").click(function() {
    iwanto_sign_btn_count = 1;
    $("#activity_sign_form").hide();
    $("#activity_signup_mask").hide();
});

function isActivitySignUp(joinArticleId) {
    joinArticleId = "join-" + joinArticleId;

    if ($.jStorage.get("localToken")) {
        var tempToken = $.jStorage.get("localToken");
    }

    if ($.jStorage.get(joinArticleId) == "true") {
        $("#activity_sign_form").hide();
        $("#iwanto_sign_btn").css({
            "background": "#c2c2c2",
            "opacity": "1"
        });
        $("#iwanto_sign_btn").attr("disabled", "true");
        iwanto_sign_btn_count = 2;
        $("#iwanto_sign_btn").html("已报名");
    } else {
        if (!isActivityLogin()) {
            return;
        }
        getSignInActivities(tempToken, function(data) {
            var campaigns = data.data.usercampaigns;
            for (i = 0; i < campaigns.length; i++) {
                var articleID = "join-" + campaigns[i].article_info.article_id;
                if (joinArticleId == articleID) {
                    $("#activity_sign_form").hide();
                    $("#iwanto_sign_btn").css({
                        "background": "#c2c2c2",
                        "opacity": "1"
                    });
                    $("#iwanto_sign_btn").attr("disabled", "true");
                    iwanto_sign_btn_count = 2;
                    $("#iwanto_sign_btn").html("已报名");
                }
            }
        });
    }
}

function getSignInActivities(token, fun) {
    $.get({
        url: v1url + "campaign",
        type: "GET",
        headers: {
            token: token,
            "devicetoken": cookie_PENCILNEWSID,
        },
        success: function(data) {
            if ((typeof data) == "string") {
                data = $.parseJSON(data);
            }
            fun(data);
        }
    });
}


/**********************/
/* 道场－报名页面相关js */


/* 道场详情－活动地点 */
/**********************/

function getMapLocation(location) {
    var map = new BMap.Map("activity_location");
    var point = new BMap.Point(116.331398, 39.897445);
    map.centerAndZoom(point, 12);
    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(location, function(point) {
        if (point) {
            map.centerAndZoom(point, 16);
            map.addOverlay(new BMap.Marker(point));
        } else {
            //   alert("您选择地址没有解析到结果!");
        }
    }, "北京市");
}


/**********************/
/* 道场详情－活动地点 */
