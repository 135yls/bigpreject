(function() {

    var myChart = echarts.init(document.getElementById("myEchart"));
    var v1url = "https://api.pencilnews.cn/";
    myChart.setOption({
        tooltip: {},
        grid: {
            show: 'true',
            left: '20',
            right: '16',
            top: '20',
            bottom: '20',
            backgroundColor: '#fffef7',
            zlevel: '-1',
            borderWidth: '0'
        },

        xAxis: {
            data: []
        },
        yAxis: {
            minInterval: 1
        },
    });
    $.ajax({
        url: v1url + "briefing",
        type: "GET",
        'headers': {
            "devicetoken": cookie_PENCILNEWSID,
        },
        success: function(data) {
            //console.log(data)
            var briefingData = data.data.briefing.data.value;
            var duration = convertTime(data.data.briefing.start) + " - " + convertTime(data.data.briefing.end);
            var _duration = convertTime(data.data._briefing.start) + " - " + convertTime(data.data._briefing.end);
            var _briefingData = data.data._briefing.data.value;
            var xName = [];
            var totalCount = [];
            var _totalCount = [];
            var tempCount = [];
            var tempCount2 = [];
            var temId = [];
            var week = data.data.briefing.data.week;
            var _week = data.data._briefing.data.week;


            $("#zzt-startTime").html(duration);
            $("#zzt-endTime").html(_duration);
            for (i = 0; i < briefingData.length; i++) {
                xName[i] = briefingData[i].info.name;
                totalCount[i] = briefingData[i].total_count;
                tempCount[briefingData[i].info.industry_id - 1] = briefingData[i].total_count;
                tempCount2[_briefingData[i].info.industry_id - 1] = _briefingData[i].total_count;
            }

            for (i = 0; i < _briefingData.length; i++) {
                tempCount[briefingData[i].info.industry_id - 1] = tempCount2[briefingData[i].info.industry_id - 1];
                _totalCount[i] = tempCount[briefingData[i].info.industry_id - 1];
                temId[i] = briefingData[i].info.industry_id;
            }

            myChart.setOption({


                xAxis: {
                    data: xName
                },
                series: [{
                    type: 'bar',
                    color: ['#fff000'],
                    barWidth: '15',
                    barGap: '0',
                    name: duration,
                    data: totalCount
                }, {
                    type: 'bar',
                    color: ['#3f3b3a'],
                    barWidth: '15',
                    barGap: '0',
                    name: _duration,
                    data: _totalCount
                }]
            });

            myChart.on('click', function(params) {
                $('#brief-clear').show();
                var stage_id = "";
                var _cate_id = "";
                var myDate = new Date();
                var year = myDate.getFullYear();
                var tempweek = "";
                if (params.seriesIndex == 0) {
                    tempweek = year + "W" + week;
                } else {
                    tempweek = year + "W" + _week;
                }
                $(".articles").html('');
                industry_id = temId[params.dataIndex];
                History.replaceState({
                    state: 1
                }, web_name, "?industry_id=" + industry_id + "&stage_id=" + stage_id);
                weekReoportFilter(tempweek, industry_id);
            });

        }
    });

})();

function weekReoportFilter(tempweek, industryId) {
    $.ajax({
        'method': "GET",
        'url': v1url + 'articles',
        'headers': {
            "devicetoken": cookie_PENCILNEWSID,
        },
        'data': {
            "industry_id": industryId,
            "week": tempweek
        },
        'dataType': 'json'
    }).done(function(data) {
        var articlesArr = data["data"]["articles"];
        if (articlesArr.length == 0) {
            $(".articles").html('暂无相关文章');


        } else {
            myhtml = articlesHtml(articlesArr);
            $(".articles").html(myhtml);

        }
        $(".load-more").hide();

    });
}

function convertTime(zztTime) {
    zztTime = zztTime.split("-");
    zztTime = zztTime[0] + '年' + zztTime[1] + '月' + zztTime[2] + '日';
    return zztTime;
}

$('#brief-clear').click(function() {
    $('.toweek,.nextweek').removeClass('barActive');
    $('.zzt-main ul > li > div ').removeClass('barActiveP');
    $('#brief-clear').hide();
    //重新加载首页文章
    // getArticlesHtml(time_start, curPage, cate_id, industry_id, stage_id)
    $(".articles").html("");
    getArticlesHtml(null, 0, null, null, null);
    $(".load-more").show();

});
