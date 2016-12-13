// console.log('filter.js '+_cate_id,time_start);
//行业加载文章
var industry_id = "";
var stage_id = "";
var _cate_id;
var web_name;
// var urlCate='#cate_id=';
var urlIndustry = '#industry_id=';
var urlStage = '&stage_id=';

History.Adapter.bind(window, 'statechange', function() { // Note: We are using statechange instead of popstate
    var State = History.getState(); // Note: We are using History.getState() instead of event.state
});
// alert(1)
$(".filter-industry .type").click(function() {

    //清除一周简报的筛选高亮
    // $('.toweek,.nextweek').removeClass('barActive');
    // $('.zzt-main ul > li > div ').removeClass('barActiveP');
    $("#brief-clear").hide();

    $(this).addClass('active').siblings().removeClass('active');
    $(".articles").html('');
    industry_id = $(this).data("industry-id");
    History.replaceState({ state: 1 }, web_name, "?industry_id=" + industry_id + "&stage_id=" + stage_id);
    // urlFilter=urlFilter.split('&')[1];
    // urlIndustry = '#industry_id=' + industry_id;
    // location.href = '/' + _cate_name + urlIndustry + urlStage;

    filterArticleAjax(_cate_id, industry_id, stage_id);


});


//手机端筛选文章
var isMobileMenuShow = false;
$("#mobile_menu_more,#slidenavbar_cover3").click(function(){
    if(isMobileMenuShow){
        $("#mobile_menu_toggle").removeClass("mobile_filter_menu_all");
        $("#mobile_menu_toggle").addClass("mobile_filter_menu");
        $("#mobile_menu_toggle li").removeClass("mobile_nav_showout");
        $("#mobile_menu_more").html("更多");
        $("#mobile_menu_more").css("color","#9b9b9b");
        $("#slidenavbar_cover3").hide();
        isMobileMenuShow = !isMobileMenuShow;
    }else{
        $("#mobile_menu_toggle").removeClass("mobile_filter_menu");
        $("#mobile_menu_toggle").addClass("mobile_filter_menu_all");
        $("#mobile_menu_toggle li").addClass("mobile_nav_showout");
        $(this).html("收起");
        $("#slidenavbar_cover3").show();
        $(this).css("color","#4a4a4a");
        isMobileMenuShow = !isMobileMenuShow;
    }

});
$(".mobile_menu_type").click(function(){
    $(".mobilenav_active").removeClass("mobilenav_active");
    $(this).addClass("mobilenav_active");
    $("#mobile_menu_toggle").removeClass("mobile_filter_menu_all");
    $("#mobile_menu_toggle").addClass("mobile_filter_menu");
    $("#mobile_menu_toggle li").removeClass("mobile_nav_showout");
    $("#mobile_menu_more").html("更多");
    $("#slidenavbar_cover3").hide();
    isMobileMenuShow = !isMobileMenuShow;
    $(".articles").html('');
    industry_id = $(this).data("industry-id");
    filterArticleAjax("", industry_id, "");
});


//阶段加载文章
$(".filter-stage .type").click(function() {
    //清除一周简报的筛选高亮
    $('.toweek,.nextweek').removeClass('barActive');
    $('.zzt-main ul > li > div ').removeClass('barActiveP');
    $(this).addClass('active').siblings().removeClass('active');

    $(this).addClass('active').siblings().removeClass('active');
    $(".articles").html('');
    stage_id = $(this).data("stage-id");

    History.replaceState({ state: 1 }, web_name, "?industry_id=" + industry_id + "&stage_id=" + stage_id);
    // urlStage = '&stage_id=' + stage_id;
    // location.href = '/' + _cate_name + urlIndustry + urlStage;
    filterArticleAjax(_cate_id, industry_id, stage_id);

});

//筛选更多
$(".type-more").hide();
var filterMore = true;
$(".filter-more").click(function() {
    if (filterMore) {
        $(this).siblings(".type-more").show();
        $(".filter-more .icon-wra").css({
            "transform": "rotate(0deg)",
                "-ms-transform": "rotate(0deg)",
                "-webkit-transform": "rotate(0deg)",
                "-o-transform": "rotate(0deg)",
                "-moz-transform": "rotate(0deg)"
        });
    } else {
        $(this).siblings(".type-more").hide();
        $(".filter-more .icon-wra").css({
            "transform": "rotate(180deg)",
                "-ms-transform": "rotate(180deg)",
                "-webkit-transform": "rotate(180deg)",
                "-o-transform": "rotate(180deg)",
                "-moz-transform": "rotate(180deg)"
        });
    }
    filterMore = !filterMore;

});

function urlFilter() {
    //如果url中有筛选参数则筛选
    var filterParam = location.search;
    // console.log(filterParam)
    if (filterParam) {
        var url_industry = filterParam.split('industry_id=')[1].split('&stage_id')[0];
        var url_stage = filterParam.split('stage_id=')[1];
        industry_id = url_industry;
        stage_id = url_stage;
        // console.log(url_industry, url_stage)
        $('.filter-industry .type').eq(industry_id).addClass('active').siblings().removeClass('active');
        $('.filter-stage .type').eq(stage_id).addClass('active').siblings().removeClass('active');

        // filterArticleAjax(_cate_id, url_industry, url_stage);

    }
}
