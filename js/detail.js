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
    params.id = $("#articleId").val();
    signAjax({
        type:"get",
        url:webUrl + "/get",
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
                console.log(jsondata);
                $("#articleContent").setTemplateElement("articleContent_template",null,{filter_data :false});
                $("#articleContent").processTemplate(jsondata);
//                showError("成功");
            } else {
                showError("无数据");
            }
        }

    })
})
