var pageCount = 2, perPage = 10, totalPageCount = 1;
var showSuccess = function (msg) {
    $.mobile.loading("show", {
        textonly:true,
        textVisible:true,
        text:msg,
        theme:"a"

    })
    setTimeout(function () {
        $.mobile.loading("hide")
    }, 1000);
}

var showError = function (msg) {
    $.mobile.loading("show", {
        textonly:true,
        textVisible:true,
        text:msg,
        theme:"e"

    })
    setTimeout(function () {
        $.mobile.loading("hide")
    }, 1000);
}
$(document).ready(function () {
    var params = {};
    params.page = 1;
    params.perPage = perPage;
    signAjax({
        type:"get",
        url:webUrl + "/list",
        data:params,
        dataType:"json",
        beforeSend:function () {
            $.mobile.loading("show", {
                text:"载入中",
                textVisible:true,
                theme:"a"
            })
        },
        timeout:10000,
        error:function () {
            showError("载入错误");
        },
        success:function (jsondata) {
            $.mobile.loading("hide");
            if (jsondata) {
                totalPageCount = jsondata.totalPageCount;
                $.each(jsondata.data, function (i, item) {
                    var title = item.title;
                    var abs = item.abs;
                    var img_url = item.imageList[0];
                    var list_id = item.id;
                    var list_arr = [
                        '<li>',
                        '<a href="./show?id=' + list_id + '"  data-transition="slide" data-ajax="false">',
                        '<img src="' + img_url + '" >',
                        '<h2>' + title + '</h2>',
//                        abs,
                        '</a>',
                        '</li>'
                    ];
                    var el = list_arr.join("");
                    $("#forumlist").append(el);
                    $("#forumlist").listview("refresh");

                });
                if (totalPageCount >= pageCount) {
                    $("#loading").show();
                }
//                    console.log(jsondata);
            } else {
                showError("无数据");
            }
        }

    })
})
$(window).on('scroll', function () {
    var yDist = $('html body').scrollTop();
    var windowHeight = $(window).height();
    var mobileHeight = $.mobile.activePage.children('.ui-content').height();
    if ((yDist + windowHeight) > (mobileHeight - 140) && yDist != 0) {
        var params = {};
        params.page = pageCount;
        params.perPage = perPage;
        if (pageCount <= totalPageCount) {
            signAjax({
                type:"get",
                url:webUrl + "/list",
                data:params,
                dataType:"json",
                timeout:30000,
                error:function () {
                    showError("载入错误");
                },
                success:function (jsondata) {
                    if (jsondata) {
                        pageCount++;
                        $.each(jsondata.data, function (i, item) {
                            var title = item.title;
                            var abs = item.abs;
                            var img_url = item.imageList[0];
                            var list_id = item.id;
                            var list_arr = [
                                '<li>',
                                '<a href="./show?id=' + list_id + '"  data-transition="slide">',
                                '<img src="' + img_url + '" >',
                                '<h2>' + title + '</h2>',
                                abs,
                                '</a>',
                                '</li>'
                            ];
                            var el = list_arr.join("");
                            $("#forumlist").append(el);
                            $("#forumlist").listview("refresh");
                        });
                    }

                }

            })
        } else {
            $("#loading").hide();
        }
    }
})