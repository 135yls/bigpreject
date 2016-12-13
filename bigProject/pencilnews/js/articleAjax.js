var cate_id = null,
    industry_id = null,
    stage_id = null,
    time_start = null;

// console.log('首次加载 分类 行业 阶段' + cate_id, industry_id, stage_id);
var curPage = 0;
//加载更多文章
$(".load-more img").hide();
$(".load-more").click(function() {
    // console.log(cate_id)
    $(".load-more a").html('');
    $(".load-more img").show();
    curPage++;
    // console.log('加载更多 时间 当前页面 分类 行业 阶段' + time_start, curPage, cate_id, industry_id, stage_id);
    getArticlesHtml(time_start, curPage, cate_id, industry_id, stage_id);
});

//行业阶段筛选文章
function filterArticleAjax(cate_id, industry_id, stage_id) {
    var curPage = 0;
    var time_start;
    $(".load-more a").html('');
    $(".load-more img").show();
    // console.log('filterArticleAjax cate_id, industry_id, stage_id, time_start' + cate_id, industry_id, stage_id, time_start)
    //加载文章
    var myhtml = '';
    $.ajax({
        method: "GET",
        url: v1url + 'articles',
        'headers': {
            "devicetoken": cookie_PENCILNEWSID,
        },
        'data': {
            "page": curPage,
            "page_size": 20,
            "industry_id": industry_id,
            "cate_id": cate_id,
            "stage_id": stage_id

        },
        success: function(data) {
            // if (typeof(data) != "object") {
            //     data = $.parseJSON(data);
            // }
            //console.log(data)
            //更新time_start
            time_start = data['data']['_pageinfo']['time_start'];
            //console.log('筛选后time_start '+time_start )

            var articlesArr = data["data"]["articles"];
            myhtml = articlesHtml(articlesArr);

            if (articlesArr.length == 0) {
                $(".articles").html("<li>没有获取到内容</li>");
                $(".load-more").hide();
                // $(".load-more a").html('没有更多');
                // $(".load-more img").hide();
            } else if (articlesArr.length < 20) {
                //console.log("sss");
                myhtml = articlesHtml(articlesArr);
                $(".articles").html(myhtml);
                $(".load-more img").hide();
                $(".load-more").hide();
            } else {
                myhtml = articlesHtml(articlesArr);
                $(".articles").html(myhtml);
                $(".load-more").show();
                $(".load-more a").html('加载更多');
                $(".load-more img").hide();
            }
        },
        dataType: 'json'

    });
}
//获取文章，加载更多文章
function getArticlesHtml(time_start, curPage, cate_id, industry_id, stage_id) {
    var myhtml = '';
    $.ajax({
        'method': "GET",
        'url': v1url + 'articles',
        'headers': {
            "devicetoken": cookie_PENCILNEWSID,
        },
        'data': {
            'time_start': time_start,
            "page": curPage,
            "page_size": 20,
            "industry_id": industry_id,
            "cate_id": cate_id,
            "stage_id": stage_id
        },
        'dataType': 'json'
    }).done(function(data) {

        // if (typeof(data) != "object") {
        //     data = $.parseJSON(data);
        // }
        //console.log(typeof(data));
        var articlesArr = data["data"]["articles"];
        if (articlesArr.length == 0) {
            $(".load-more a").hide();
            $(".load-more img").hide();
        } else {
            myhtml = articlesHtml(articlesArr);
            $(".articles").append(myhtml);
            $(".load-more a").html('加载更多');
            $(".load-more img").hide();
        }
    });

}
//编写加载更多文章html
function articlesHtml(articlesArr) {
    var myhtml = '';
    //案例 深度 活动 资讯label
    // var cateLabelArr = ['', 'icon-classification_case', 'icon-classification_deep', 'icon-classification_activity', 'icon-classification_ask'];
    // var cateLabelPng=['','info.png','company.png','deep.png','activity.png'];
    for (var i = 0; i < articlesArr.length; i++) {
        var cur = articlesArr[i];
//        if (cur["journalist"]["name"]) {
//            var publishJournalist = cur["journalist"];
//        } else {
//            var publishJournalist = cur["user"];
//        }
        var publishJournalist = cur.author.profile;
        var updateTime = cur["article_info"]["create_at"].split(' ')[0];
        var userAvatar = publishJournalist.avatar;
        var cateInd = cur["cate"]["cate_id"];
        var reg = new RegExp("[5-9]|[1-9][1-9]");
        var articleLinkUrl = "/p/" + cur["article_info"]["article_id"];
        if (articlesArr[i].campaign != null) {
            if (articlesArr[i].campaign.district) {
                articleLinkUrl = "/d/" + cur["article_info"]["article_id"];
            }

            // $.jStorage.set("join-"+ articleId,articles[i].campaign.joined);
        }

        var cateName = cur["cate"]["name"];
        if (reg.test(cateInd)) {
            cateInd = 4;
            cateName = "道场";
        }
        //console.log(updateTime)
        //thumbnail
        myhtml += '<div class="article" data-id=' + cur["article_info"]["article_id"] + '><div class="post-thumbnail"><a href="' + articleLinkUrl + '.html" target="_blank"><img src="http://cdn.pencilnews.cn/' + cur["article_info"]["cover_img"] + '?imageView2/2/w/500/h/500/q/75' + '" class="img-responsive"><div class="post-label"><span class = "cate-label cate-label-' + cateInd + '" >' + cateName + '</span></div></div></a>';
        //thumbnail label

        //console.log(cateInd);
        // myhtml += '<div class="post-label"> <a href = "" class = "label-item label-industry" > <span class = "icm ' + cateLabelArr[cateInd] + '" > </span></a ></div> </div>';
        // myhtml += '<div class="post-label"><span class = "" ><img src="/imgs/cate_icon/'+cateInd+'.png"></img> </span></div></div>';
        //post-box entry-title
        myhtml += '<div class="post-box"><h2 class="entry-title"><a href="' + articleLinkUrl + '.html" target="_blank">' + cur["article_info"]["title"] + '</a></h2>';
        //post-meta post-tags

        myhtml += '<div class="post-meta"><div class="post-tags pull-left"><span class="icon-label"></span>';
        for (var j = 0; j < cur.industries.length; j++) {
            myhtml += '<a href="" data-industry_id=' + cur["industries"][j]["industry_id"] + '>' + cur["industries"][j]["name"] + '</a>&nbsp;';
        }
        myhtml += '</div>';
        //post-data
        myhtml += '<div class="post-data pull-right"><span class="icon-fire"></span><small>' + cur["article_info"]["hits_count"] + '</small> <span class="icon-like"></span><small>' + cur["article_info"]["likes_count"] + '</small> <span class = "icon-comment" ></span><small>' + cur["article_info"]["comments_count"] + '</small></div>';
        myhtml += '<span class="clearfix"></span></div>';
        //post-content
        myhtml += '<div class="post-content">' + cur["article_info"]["digest"] + '</div>';
        //post-author
        myhtml += '<div class="post-author"><div class = "pull-left p-author" ><a href = "" ><div class="img-wra"><img src = "http://cdn.pencilnews.cn/' + userAvatar + '?imageView2/2/w/500/h/500/q/75" alt = "" > </div>' + publishJournalist.name + ' </a></div > <div class = "pull-right p-time" >' + updateTime + '</div></div >';
        myhtml += '</div> <span class = "clearfix" ></span></div></div>';

    }
    return myhtml;
}



//获取行业列表
function typeList() {
    var types = $.ajax({
        method: "GET",
        url: v1url + "articles/industries",
        'headers': {
            "devicetoken": cookie_PENCILNEWSID,
        },
        dataType: 'json'
    }).done(function(data) {
        // console.log(data["data"]["industries"][0]["name"]);
        var industriesArr = data["data"]["industries"];
        var html = '';
        for (var i = 0; i < industriesArr.length; i++) {
            html += '<li class="type"><a href="javascript:void(0)">' + industriesArr[i]["name"] + '</a></li>';
        }
        html += '<li class="filter-more"><a href="javascript:void(0)">更多</a></li>';
        // console.log(html);
        $(".filter-industry .filter-content ul").html('<li class="active all"><a href="javascript:void(0)">全部</a></li>');
        $(".filter-industry .filter-content ul").append(html);

    });

}
