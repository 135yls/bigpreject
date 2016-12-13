 var _cate_id = "init_cate_id";

 function header() {
     var oTop = document.getElementById('header_top');
     var target = oTop.offsetHeight + 70;
     var oNav = document.getElementById('navbar');
     var authorized = 0; //0为未登录，1为登录
     var userRoleId = $.jStorage.get("localRoleId");


     isLogin();
     /* 获取导航栏元素并展示 */
     // getNavbarCates();
     //    showNavDropDown();
     showSubscribeStatus();
     showActive();
     $("#subscribe").click(function() {
         if ($.jStorage.get("localToken")) {
             ifSubscribe();
         } else {
             showWarning("请您先登录，再进行订阅");
         }

     });

     $("#keyword").keyup(function(e) {
         if (e.keyCode == "13") {
             var keyword = $("#keyword").val();
             $.jStorage.set("keyword", keyword);
             var url = "/searchresult?" + keyword;
             window.location.href = url;
         }
     });

     $("#keyword2").keyup(function(e) {
         if (e.keyCode == "13") {
             var keyword = $("#keyword2").val();
             $.jStorage.set("keyword", keyword);
             var url = "/searchresult?" + keyword;
             window.location.href = url;
         }
     });
     $("#slidenav_search").click(function(e) {
         e.stopPropagation();
     });

     var searchPage = 0;
     $("#load_more_con").click(function() {
         searchPage++;
         getSearchResult(searchPage);

     });
     var beforeScroll = document.documentElement.scrollTop || document.body.scrollTop;
     window.onscroll = function() {
        var afterScroll = document.documentElement.scrollTop || document.body.scrollTop;         
        var d = afterScroll - beforeScroll;
        var oWidth = document.body.clientWidth;

         // var curscale = 1;
         if (oWidth > 768) {
             var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
             if (scrollTop > target) {
                 $("#header_top").hide();
                 
                 $(".blank").show();
                 if(d > 0){
                     $("header").hide();
//                     $(".blank").hide();
                 }else{
                     $("header").addClass("navbar-fixed-top");
                     $("header").show();
                //     $(".blank").show();
                 }
                 beforeScroll = afterScroll;   
             } else {
                 $("#header_top").show();
                 $("header").removeClass("navbar-fixed-top");
                 $(".blank").hide();
                 // $("#report").hide();
             }
         }
     }

     /* 手机端搜索框动画效果 */
     $("#slidenav_search_con").click(function(e) {
         e.stopPropagation();
         $("#slidenav_search_con").hide();
         $("#btn_slidenavbar").hide();
         $("#slidenav_search").show();
         $("#mobile_navbar_logo").parent().hide();
         $("#slidenavbar_cover2").show();
         $("#cancel_search").hide(); //防止“取消”文字挤出来
         $("#slidenav_search").animate({
             left: "0",
             width: "100%"
         }, function() {
             $("#cancel_search").show();
             $("#slidenav_input_con input").focus();
             $("#slidenav_input_con input").click();

         });
     });

     //点击搜索框上面文字让搜索框获得焦点
     $("#search_prompt").click(function() {
         $("#keyword2").focus();
     });

     $("#cancel_search").click(function() {
         $(this).hide();
         $("#slidenav_search").animate({
             left: "100%",
             width: "0"
         }, function() {
             $("#slidenav_search_con").show();
             $("#btn_slidenavbar").show();
             $("#slidenav_search").hide();
             $("#mobile_navbar_logo").parent().show();
             $("#slidenavbar_cover2").hide();
         });
     });


     // $("#slidenav_input_con input").blur(function(){
     //     $("#slidenav_search").animate({
     //         left:"100%",
     //         width:"0"
     //     },function(){
     //         $("#slidenav_search_con").show();
     //         $("#btn_slidenavbar").show();
     //         $("#slidenav_search").hide();
     //     });
     // });

     $("#slidenavbar_cover2").click(function() {
         $("#slidenav_search").animate({
             left: "100%",
             width: "0"
         }, function() {
             $("#slidenav_search_con").show();
             $("#btn_slidenavbar").show();
             $("#slidenav_search").hide();
             $("#mobile_navbar_logo").show();
             $("#slidenavbar_cover2").hide();
         });
     });

     /* 点击显示搜索框，并使input获得焦点*/

     var tempActive = $("#nav .active");

     $("#clicksearch").click(function(e) {
         if($("#keyword").is(":hidden")){
             e.stopPropagation();
             $("#keyword").show();
             $("#keyword").animate({
                 opacity: '1'
             }).focus();
         }else{
             var keyword = $("#keyword").val();
             $.jStorage.set("keyword", keyword);
             var url = "/searchresult?" + keyword;
             window.location.href = url;
         }
         
         

     });

     $("#search i,#search").click(function(e) {
         $("#search input").focus();
         e.stopPropagation();
     });
     $("#keyword").click(function(e) {
         e.stopPropagation();
     }).blur(function() {
         // $(this).css({"border":"1px solid #c2c2c2"})
         $(this).animate({
             opacity: '0'
         },function(){
             $(this).hide();
         });

     });
     /* 点击空白处，搜索框隐藏 */

     $("body").click(function() {
         if (document.body.clientWidth > 767) {
             // $(".nav_navbar").animate({
             //     opacity: '1'
             // });
             // $("#search").animate({
             //     left: '100%',
             //     width: '0',
             //     'border-radius': '5px'
             // }, function() {
             //     $("#search").hide();
             //     tempActive.addClass("active");
             // });
             // $("#keyword").animate({
             //     opacity: '0'
             // });

         }
     });

     /* 当输入字符时，隐藏输入框内的搜索图标 */
     $("#search input,#slidenav_input_con input").on("keyup", function() {

         var len = $("#search input").val();
         var len2 = $("#slidenav_input_con input").val();
         if (len == "") {
             $("#search i").show();
         } else {
             $("#search i").hide();
         }
         if (len2 == "") {
             $("#slidenav_input_con i").show();
             $("#slidenav_input_con .cancel").hide();

         } else {
             $("#slidenav_input_con i").hide();
             $("#slidenav_input_con .cancel").show();
         }

     });

     //手机取消图标
     $("#slidenav_input_con .cancel").click(function(e) {
         e.stopPropagation();
         $(this).hide();
         $("#slidenav_input_con input").val('').focus();
     });

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

     if (!IsPC()) {
         $("#report_login,#reply_login a, #slidenavbar_login").click(function() {
             var tempUrl = window.location.href;
             $.jStorage.set("localLastUrl", tempUrl);
             var url = "/login_phone";
             location.href = url;
         });
     }

     //注册
     $("#login_sign_up").click(function() {
         showPCRegistForm();
     });

     $("#login_sign_up2").click(function() {
         $("#login_bg").show();
         $("#sign_up_bg").css({
             left: 'auto',
             right: '50%'
         }).show();
         $(".sign_up_con").show().css({
             opacity: '1'
         });
         $(".sign_in_con").hide();
     });
     //登录
     if (IsPC()) {
         $("#login_sign_in,#reply_login a,#report_login").click(function() {
             showPCLoginForm();
         });
     }


     $("#login_sign_in2").click(function() {
         $("#login_bg").show();
         $("#sign_up_bg").css({
             left: '50%'
         }).show();
         $(".sign_in_con").show().css({
             opacity: '1'
         });
         $(".sign_up_con").hide();
     });

     $("#login_bg1").click(function() {
         $("#login_bg").hide();
         $(".forget_pw").hide();
     });


     /* 点击登录，注册页面右划并隐藏，登录显示 */
     $("#btn_sign_in").click(function() {
         showPCLoginForm();
     });

     /* 点击注册，登录页面左划并隐藏，注册显示 */
     $("#btn_sign_up").click(function() {
         showPCRegistForm();
     });


     //点击背景隐藏登录注册框
     $("#login_bg, .login_form_close_img").click(function(){
        $("#login_bg").hide();
        $("#regist_container").hide();
        $("#forget_pwd_container").hide();
        $("#login_container").hide();
        $("#wechat-qrcode").addClass("hide");
        $('#wechat-qrcode-tips').removeClass('hide');
        $('#wechat-qrcode-sucess').addClass('hide');
     });


     // document.getElementById("personal_center_2").onmouseout = function() {
     //     $("#personal_head_2").removeClass("personal_center_active");
     // }

     document.getElementById("login_on1").onmouseover = function() {
         $("#show_personal").addClass("personal_center_active");
         $("#show_personal .triangle").removeClass("triangle-down").addClass(("triangle-up"));

         var personal_center = document.getElementById("personal_center_1");
         if (userRoleId) {
             if (userRoleId >= 6) {
                 document.getElementById("to_admin_page1").style.display = "block";
                 TweenLite.to(personal_center, 0.3, {
                     display: "inline-block",
                     height: "160px"
                 });
             } else {
                 TweenLite.to(personal_center, 0.3, {
                     display: "inline-block",
                     height: "120px"
                 });
             }
         } else {
             TweenLite.to(personal_center, 0.3, {
                 display: "inline-block",
                 height: "120px"
             });
         }
     }
     document.getElementById("login_on1").onmouseout = function() {
         $("#show_personal").removeClass("personal_center_active");
         $("#show_personal .triangle").removeClass("triangle-up").addClass(("triangle-down"));


         var personal_center = document.getElementById("personal_center_1");
         TweenLite.to(personal_center, 0.3, {
             height: "0",
             display: "none"
         });
     }

     // document.getElementById("login_on2").onmouseout = function() {
     //     var personal_center = document.getElementById("personal_center_2");
     //     TweenLite.to(personal_center, 0.3, {
     //         height: "0",
     //         display: "none"
     //     });
     // }




     /* 鼠标移入显示个人信息 */
     $("#login_on1").hover(
         function() {
             $("#login_on1>a").css({
                 "color": "#FFF300",
                 "background": "#2C2624",
                 "box-shadow": "1px 1px 1px #25201E inset, -1px -1px 1px #25201E inset"
             });
         },
         function() {
             $("#login_on1>a").css({
                 "color": "#D6D6D6",
                 "background": "#3F3B3A",
                 "box-shadow": "none"
             });
         }
     );




     /* 登出 */
     $("#logout1,#logout2,#slidenav_exit").click(function() {
         logout();
         console.log("logout")
         $("#slidenav_exit").hide();
         $(".search-log #login_on1").hide();
         console.log("logout")

         // $("#login_form").show();
         $("#login_sign_in,#login_sign_up").show();
         // $("#login_on2").hide();
         // $("#login_form2").show();
         $(".forget_pw").css({
             "display": "none"
         });
     });

     $("#forgetpw").click(function() {
         showPCForgetPwdForm();
     });
     
     $("#btn_sign_in_2").click(function(){
         showPCLoginForm();
     });

     /* 点击获取验证码按钮，前段验证通过后，发送验证码，倒计时开始 */
     $("#get_cert_btn").click(function() {
         if (validPhone($("#phone_number"))) {
             countDown($("#get_cert_btn"), 120);
             getCode();
         }
     });

     /* 重置密码获取验证码按钮 */
     $("#forget_get_cert_btn").click(function() {
         if (validPhone($("#forget_phone_number"))) {
             countDown($("#forget_get_cert_btn"), 120);
             getForgetCode();
         }
     });



     /*  当密码框失去焦点时，验证密码，失败则弹窗 */
     $("#pwd").blur(function() {
         validPassword($("#pwd"));
     });

     $("#forget_pwd").blur(function() {
         validPassword($("#forget_pwd"));
     });

     $("#resetpwd").click(function() {
         if (isEnableResetpwd()) {
             resetPassword();
         }
     });


     /* 验证手机号，验证码，密码不为空，不为空注册按钮可点击 */
     $("#register").click(function() {
         if (isEnableRegister()) {
             register();
             $("#register").unbind("click");
         }
     });

     $("#login_button").click(function() {
         if ($("#password").val() <= 0) {
             showWarning("请填写密码！");
         } else if (validUsername()) {
             login();
         }
     });

     $("#password").keyup(function(e) {
         if (e.keyCode == "13") {
             if (validUsername()) {
                 login();
             }
         }
     });

 }





 /* 从后台请求认证码 */
 function getCode() {
     var phoneNumber = $("#phone_number").val();
     $.post({
         type: 'POST',
         url: v1url + 'sms/send',
         'headers': {
             "devicetoken": cookie_PENCILNEWSID,
         },
         data: {
             "sms_type": "reg",
             "phone": phoneNumber
         },
         dataType: "json",
         success: function(data) {
            if(data.code != 1000){
                showWarning(data.message);
            }
         },
         error: function(jqXHR) {

         }
     });
 }

 /* 获取重置密码的验证码 */
 function getForgetCode() {
     var phone = $("#forget_phone_number").val();
     $.post({
         type: 'POST',
         url: v1url + 'sms/send/',
         'headers': {
             "devicetoken": cookie_PENCILNEWSID,
         },
         data: {
             "sms_type": "forgot",
             "phone": phone
         },
         dataType: "json",
         success: function(data) {
             if(data.code == 1000){
                 showSuccess("验证码发送成功，120秒后方可再次获取");
             }else{
                 showWarning(data.message);
             }
         },
         error: function() {

         }
     });
 }

 /* 重置密码 */
 function resetPassword() {
     var phone = $("#forget_phone_number").val();
     var password = $("#forget_pwd").val();
     var code = $("#forget_cert").val();
     $.post({
         type: "PUT",
         url: v1url + "user/forgot/",
         'headers': {
             "devicetoken": cookie_PENCILNEWSID,
         },
         data: {
             "phone": phone,
             "code": code,
             "password": password
         },
         dataType: "json",
         success: function(data) {
             if (data["code"] == 1000) {
                 showSuccess("重置密码成功！请登录");
                 $("#login_bg").hide();
                 $("#forget_pwd_container").hide();
             }else{
                 showWarning(data.message);
             }
         },
         error: function() {

         }
     });
 }

 /* 注册 */
 function register() {
     var phoneNumber = $("#phone_number").val();
     var code = $("#cert").val();
     var password = $("#pwd").val();
     $.post({
         type: 'POST',
         url: v1url + 'user/reg',
         'headers': {
             "devicetoken": cookie_PENCILNEWSID,
         },
         data: {
             "sms_type": "reg",
             "phone": phoneNumber,
             "code": code,
             "password": password
         },
         dataType: "json",
         success: function(data) {
             var alarm = data["code"];
             $("#login_bg").hide();
             $("#regist_container").hide();
               $("#register").bind("click",function(){
                   if (isEnableRegister()) {
                         register();
                         $("#register").unbind("click");
                     }
               });
             if (alarm != 1000) {
                 showWarning(data["message"]);
             } else {
                 registerAndLogin(phoneNumber, password);
             }
         },
         error: function() {}
     });

 }

 /* 注册成功后直接登录 */
 function registerAndLogin(username, password) {
     $.post({
         type: "POST",
         url: v1url + "user/login",
         'headers': {
             "devicetoken": cookie_PENCILNEWSID,
         },
         data: {
             "username": username,
             "password": password
         },
         dataType: "json",
         success: function(data) {
             if (data["code"] == -3) {

             } else if (data["code"] == 1000) {
                 $("#login_bg").hide();
                 // $("#login_form").hide();
                 $("#regist_container").hide();
                 $("#forget_pwd_container").hide();
                 $("#login_container").hide();
                 $("#login_sign_in,#login_sign_up").hide();
                 $("#login_on1").show();
                 // $("#show_personal").html("<span class='icon-mine'></span>" + data["data"]["user"]["username"]);
                 var imgSrc = "/imgs/defaultAva40.png",
                     imgUrl = "https://odonohz90.qnssl.com/";
                 if (data.data.user.profile.avatar) {
                     imgSrc = imgUrl + data.data.user.profile.avatar;
                 }
                 $("#show_personal img").attr("src", imgUrl);
                 var tempToken = data["data"]["user"]["token"];
                 var tempTokenExpired = 43200000;
                 var tempUsername = data["data"]["user"]["profile"]["username"];
                 var tempSubscribe = data["data"]["user"]["profile"]["subscribed"];
                 var tempEmail = data["data"]["user"]["profile"]["email"];
                 var tempUid = data["data"]["user"]["profile"]["uid"];
                 var tempName = data["data"]["user"]["profile"]["name"];
                 if (tempName == "") {
                     tempName = tempUsername;
                 }
                 var tempAvatar = data["data"]["user"]["profile"]["avatar"];
                 var tempPhone = data["data"]["user"]["profile"]["phone"];
                 var tempLevel = data["data"]["user"]["profile"]["level"];
                 $.jStorage.set("localToken", tempToken, {
                     TTL: tempTokenExpired
                 });
                 $.jStorage.set("localUsername", tempUsername, {
                     TTL: tempTokenExpired
                 });
                 $.jStorage.set("localSubscribe", tempSubscribe, {
                     TTL: tempTokenExpired
                 });
                 $.jStorage.set("localEmail", tempEmail, {
                     TTL: tempTokenExpired
                 });
                 $.jStorage.set("localUid", tempUid, {
                     TTL: tempTokenExpired
                 });
                 $.jStorage.set("localName", tempName, {
                     TTL: tempTokenExpired
                 });
                 $.jStorage.set("tempImgAvatarUrl", imgSrc, {
                     TTL: tempTokenExpired
                 });
                 $.jStorage.set("cert_wechat", "empty");
                 $.jStorage.set("cert_email", "empty");
                 $.jStorage.set("cert_name", "empty");

                 saveUser({
                     uid: tempUid,
                     username: username,
                     name: tempName,
                     phone: tempPhone,
                     email: tempEmail,
                     token: tempToken,
                     subscribed: tempSubscribe,
                     avatar: tempAvatar,
                     level:tempLevel
                 });
                 saveUser(data.data.user);
                 if($.jStorage.get("isJumpApprove")){
                     if($.jStorage.get("isJumpApprove") == "on"){
                         $.jStorage.set("isJumpApprove","off");
                         window.location = "/usercenter?cate=my-certification";
                     }else{
                         showSuccess("想撩创业者？点击身份认证，立刻获得联系方式。页面将在5秒后刷新。");
                         setTimeout(function() {
                             location.reload();
                         }, 5000);
                     }
                 }else{
                     showSuccess("想撩创业者？点击身份认证，立刻获得联系方式。页面将在5秒后刷新。");
                     setTimeout(function() {
                         location.reload();
                     }, 5000);
                 }
                 
             } else {
                 showWarning(data["message"]);
             }

         },
         error: function() {}

     });
 }

 /* 认证输入的内容是否有效，如果有效，可以进行注册 */
 function registerValid() {
     return false;
 }

 /* 显示警告框 */
 function showWarning(str) {
     toastr.options = {
         "positionClass": "toast-top-center"
     };
     toastr.error(str);
 }

 /* 显示提示框 */
 function showSuccess(str) {
     toastr.options = {
         "positionClass": "toast-top-center"
     };
     toastr.success(str);
 }

 function showInfo(str) {
     toastr.options = {
         "positionClass": "toast-top-center"
     };
     toastr.info(str);
 }
 // /* 验证手机号为数字且不为空 */
 // function validPhone(obj) {
 //     var phoneNumber = obj.val();
 //     //    var phoneNumber = $("#phone_number").val();
 //     // var pattern = new RegExp("[^1-9]");
 //     var pattern = /^1[34578]\d{9}$/;
 //     if (!pattern.test(phoneNumber) || phoneNumber == "") {
 //         showWarning("请输入正确的手机号！");
 //         return false;
 //     } else {
 //         return true;
 //     }
 // }

 /* 验证认证码 */
 function validCode(obj) {
     var code = obj.val();
     if (code == "") {
         showWarning("验证码不能为空！")
         return false;
     } else {
         return true;
     }
 }

 /* 验证密码，如果长度不在8到16之间，弹窗警告*/
 function validPassword(obj) {
     var password = obj.val();
     if (password.length < 8 || password.length > 16) {
         showWarning("密码长度在8和16之间，请正确输入");
         return false;
     } else {
         return true;
     }
 }

 /* 验证是否同意协议 */
 function validAgree() {
     if ($("#agree").is(":checked")) {
         return true;
     } else {
         showWarning("请阅读并同意版权声明和隐私保护协议！")
         return false;
     }
 }

 /* 倒计时，计时完毕后，按钮可用 */
 function countDown(obj, count) {
     //    $("#get_cert_btn").attr("disabled","true");
     obj.attr("disabled", "true");
     var timer = null;
     timer = setInterval(function() {
         count--;
         obj.html(count);
         //        $("#get_cert_btn").html(count);
         if (count == 0) {
             clearInterval(timer);
             obj.removeAttr("disabled");
             //$("#get_cert_btn").removeAttr("disabled");
             //$("#get_cert_btn").html("获取验证码");
             obj.html("获取验证码");
         }
     }, 1000);
 }

 /* 控制是否可以注册 */
 function isEnableRegister() {
     if (validPassword($("#pwd")) && validPhone($("#phone_number")) && validCode($("#cert")) && validAgree()) {
         return true;
     } else {
         return false;
     }
 }

 /* 验证是否可以点击重置密码 */
 function isEnableResetpwd() {
     if (validPassword($("#forget_pwd")) && validPhone($("#forget_phone_number")) && validCode($("#forget_cert"))) {
         return true;
     } else {
         return false;
     }
 }

 /* 验证用户名是否为空 */
 function validUsername() {
     if ($("#username").val() == "") {
         showWarning("用户名不能为空，请正确填写");
         return false;
     } else {
         return true;
     }
 }

 /* 是否需要记住我 */
 function rememberMe() {
     if ($("#remember_me").is(":checked")) {
         return true;
     } else {
         return false;
     }
 }


 function isLogin() {
     var token = $.jStorage.get("localToken"),
         username = $.jStorage.get("localName"),
         subscribe = $.jStorage.get("localSubscribe"),
         avatarSrc = $.jStorage.get("tempAvatar");
     var imgUrl = 'https://odonohz90.qnssl.com/';

     //更新头像，更新上传头像面板头像
     // $("#login_on1").hide();//初始登录头像隐藏 注册登录隐藏
     // $("#login_sign_in,#login_sign_up").hide();
     if (token) {
         if (avatarSrc) {
             avatarSrc = imgUrl + avatarSrc + "?" + (new Date()).getTime();
         } else {
             avatarSrc = "/imgs/defaultAva200.png";
         }
         $(".slidenavbar_personimg img").attr("src", avatarSrc);
         $("#login_bg").hide();
         // $("#login_form").hide();
         // $("#login_sign_in,#login_sign_up").hide();
         $("#login_on1").show();
         // $("#show_personal").html("<span class='icon-mine'></span>" + username);
         var imgSrc = "/imgs/defaultAva40.png"
         if (avatarSrc != "/imgs/defaultAva200.png" && avatarSrc != "/imgs/defaultAva40.png") {

             imgSrc = avatarSrc;
             // console.log(avatarSrc);
         }
         $("#show_personal img").attr("src", imgSrc);
         $("#slidenavbar_login").html("<a href='/m_usercenter'>" + username + "</a>");
         $("#slidenavbar_uc").show();
         $("#slidenav_exit").show();
         $.jStorage.set("isUsercenter", "off");
         if (subscribe == 1) {
             $("#subscribe").css({
                 "background": "#e7e7e7",
                 "line-height": "2rem"
             });
         } else {
             $("#subscribe").css({
                 "background": "#fff000",
                 "line-height": "2rem"
             });

         }
     } else {
         $("#login_sign_in,#login_sign_up").show();
     }

 }

 /* 登录 */
 function login() {
     var username = $("#username").val();
     var password = $("#password").val();
     
     $.post({
         type: "POST",
         url: v1url + "user/login",
         'headers': {
             "devicetoken": cookie_PENCILNEWSID,
         },
         data: {
             "username": username,
             "password": password
         },
         dataType: "json",
         success: function(data) {
             if (data["code"] == -3) {

             } else if (data["code"] == 1000) {
                 $("#login_bg").hide();
                 // $("#login_form").hide();
                 $("#regist_container").hide();
                 $("#forget_pwd_container").hide();
                 $("#login_container").hide();
                 $("#login_sign_in,#login_sign_up").hide();
                 $("#login_on1").show();
                 // $("#show_personal").html("<span class='icon-mine'></span>" + data["data"]["user"]["name"]);
                 
                 var user = data.data.user;
                 
                 saveUserToLocal(user)
                 
                 if($.jStorage.get("isJumpApprove")){
                     if($.jStorage.get("isJumpApprove") == "on"){
                         $.jStorage.set("isJumpApprove","off");
                         if(tempCertState != 1){
                             if(!IsPC){
                                 window.location = "/m_certification";
                             }else{
                                 window.location = "/usercenter?cate=my-certification";
                             }                         
                         }else{
                             location.reload();
                         }
                         
                     }else{
                        location.reload();
                     }
                 }else{
                     location.reload();
                 }

             } else {
                 showWarning(data["message"]);
             }

         },
         error: function() {}

     });
 }

 /* 登出 */
 function logout() {
     var token = $.jStorage.get("localToken");
     $.post({
         type: "PUT",
         url: v1url + "user/logout",
         headers: {
             "token": token,
             "devicetoken": cookie_PENCILNEWSID,
         },
         success: function(data) {
             if ($.jStorage.get("isUsercenter") == "on") {
                 $.jStorage.flush();
                 var url = "/";
                 window.location.href = url;
             } else {
                 $.jStorage.flush();
                 location.reload();
             }
         }
     });
 }

/*保存用户信息到本地*/
function saveUserToLocal(user){
    var isRememberMe = $("#remember_me").is(":checked");
    var profile = user.profile;
    var imgSrc = "/imgs/defaultAva40.png",
        imgUrl = "https://odonohz90.qnssl.com/";
    if (user.profile.avatar) {
         imgSrc = imgUrl + profile.avatar;
    }
    $("#show_personal img").attr("src", imgUrl);
    var tempToken = user["token"];
    if (isRememberMe) {
        var tempTokenExpired = user["token_expired"];
    } else {
        var tempTokenExpired = 43200000;
    }
    var tempUsername = profile["username"];
    var tempSubscribe = profile["subscribed"];
    var tempEmail = profile["email"];
    var tempUid = user["uid"];
    var tempName = profile["name"];
    if (tempName == "") {
        tempName = tempUsername;
    }
    var tempWechat = profile["wechat"];
    if (tempWechat == "") {
        tempWechat = "";
    }
    var tempRoleId = profile["role"]["level"];
    var tempAvatar = profile["avatar"];
    var tempPhone = profile["phone"];
    var tempCertState = user.profile.cert.state;

    if (profile["wechat"] && tempWechat != "") {
        $.jStorage.set("cert_wechat", tempWechat);
    } else {
        $.jStorage.set("cert_wechat", "empty");
    }
    if (profile["name"] && tempName != "") {
        $.jStorage.set("cert_name", tempName);
    } else {
        $.jStorage.set("cert_name", "empty");
    }
    if (profile["email"] && tempEmail != "") {
        $.jStorage.set("cert_email", tempEmail);
    } else {
        $.jStorage.set("cert_email", "empty");
    }

     $.jStorage.set("localToken", tempToken, {
         TTL: tempTokenExpired
     });
     $.jStorage.set("localUsername", tempUsername, {
         TTL: tempTokenExpired
     });
     $.jStorage.set("localSubscribe", tempSubscribe, {
         TTL: tempTokenExpired
     });
     $.jStorage.set("localEmail", tempEmail, {
         TTL: tempTokenExpired
     });
     $.jStorage.set("localUid", tempUid, {
         TTL: tempTokenExpired
     });
     $.jStorage.set("localName", tempName, {
         TTL: tempTokenExpired
     });
     $.jStorage.set("localRoleId", tempRoleId, {
         TTL: tempTokenExpired
     });
     $.jStorage.set("tempAvatar", tempAvatar, {
         TTL: tempTokenExpired
     });
     $.jStorage.set("tempPhone", tempPhone, {
         TTL: tempTokenExpired
     });
     $.jStorage.set("tempImgAvatarUrl", imgSrc, {
         TTL: tempTokenExpired
     });
     $.jStorage.set("localWechat", tempWechat, {
         TTL: tempTokenExpired
     });



     saveUser({
         uid: tempUid,
         username: username,
         name: tempName,
         phone: tempPhone,
         email: tempEmail,
         token: tempToken,
         subscribed: tempSubscribe,
         avatar: tempAvatar
     });
     saveUser(user);
}
 /* 获取导航栏分类内容并展示 */
 function getNavbarCates() {
     $.get({
         type: "GET",
         url: v1url + "articles/cates",
         'headers': {
             "devicetoken": cookie_PENCILNEWSID,
         },
         success: function(data) {
             if (data["code"] == 1000) {
                 showNavbarCates(data);
                 //   showNavDropDown();
             }
         }
     });
 }

 /* 根据数据库的字段显示首页导航栏的分类内容 */
 function showNavbarCates(data) {
     var cates = data["data"]["cates"];
     for (i = cates.length - 1; i >= 0; i--) {
         var liId = "cates_" + i;
         if (cates[i]["is_navi"] != 0) {
             $("#nav_index").after("<li class='nav_navbar' id='" + liId + "'><a href='/case'><span class='icon-nav" + i + "'></span>" + cates[i].name + "</a></li>");
         }

         if (cates[i]["sons"].length != 0) {
             var sons = cates[i]["sons"];
             var sonsUlId = "cates_sons_" + i;
             $("#" + liId).addClass("navdropdown");
             $("#" + liId).append("<ul id='" + sonsUlId + "' ></ul>");
             for (j = sons.length - 1; j >= 0; j--) {
                 if (sons[j]["is_navi"] != 0) {
                     $("#" + sonsUlId).append("<li class='nav_navbar'><a href='/industryinfo'>" + sons[j].name + "</a></li>");
                 }
             }
         }
     }

 }

 /* 鼠标移入显示资讯详情 */
 function showNavDropDown() {
     $(".navdropdown").hover(
         function() {
             $(".navdropdown>ul").slideDown("300");
             $("li.navdropdown").css({
                 "background": "#2C2624",
                 "box-shadow": "1px 1px 1px #25201E inset, -1px -1px 1px #25201E inset"
             });
         },
         function() {
             $(".navdropdown>ul").slideUp("300", function() {
                 $("li.navdropdown").css({
                     "color": "#D6D6D6",
                     "background": "#3F3B3A",
                     "box-shadow": "none",
                     "transition": ".3s all ease-in-out"
                 });
             });

         }
     );
 }


 /* 根据情况订阅/取消订阅 */
 function ifSubscribe() {
     var state = $.jStorage.get("localSubscribe");
     if (state == 0) {
         var email = $("#emailbox").val();
         $.jStorage.set("localSubscribe", 1);
         $.jStorage.set("localEmail", email);
         subscribe(1, email);
         $("#email_addr").val(email);
         if ($.jStorage.get("isUsercenter") == "off") {
             $("#emailbox").attr("disabled", "true");
             //  $("#emailbox").css().css("background","#fff");
             if (document.getElementById("emailbox")) {
                 document.getElementById("emailbox").style.background = "#fff";
             }

         }
         return;

     }
     if (state == 1) {
         if ($.jStorage.get("isUsercenter") == "on") {
             var email = $("#email_addr").val();
             $.jStorage.set("localSubscribe", 0);
             subscribe(0, email);
             return;
         }
     }
 }

 /* 显示订阅按钮状态 */
 function showSubscribeStatus() {
     var state = $.jStorage.get("localSubscribe");
     // console.log(state)
     if (state == 1) {
         $("#email_addr").html($.jStorage.get("localEmail"));
         if ($.jStorage.get("isUsercenter") == "off") {
             $("#emailbox").attr("disabled", "true");
             if (document.getElementById("emailbox")) {
                 document.getElementById("emailbox").style.background = "#fff";
             }

             $("#subscribe").attr("disabled", "true");
             $("#subscribe").html("已订阅");
             //$("#emailbox").html($.jStorage.get("localEmail"));
             $("#uc_no_subscribe img").hide();
             $("#uc_subscribed img").show();
             $("p.uc_subscribe").html("已订阅“铅笔道”，我们将推送文章到您的邮箱。")
         } else {
             $("#emailbox").removeAttr("disabled");
             $("#subscribe").removeAttr("disabled");
             $("#subscribe").html("已订阅");
             $("#uc_no_subscribe img").hide();
             $("#uc_subscribed img").show();
             $("#uc_no_subscribe").css("background", "#13b800");
             $("#uc_subscribed").css("background", "#fff");
             $("p.uc_subscribe").html("已订阅“铅笔道”，我们将推送文章到您的邮箱。");
         }
     }
     if (state == 0) {
         $("#uc_subscribed img").hide();
         $("#uc_no_subscribe img").show();
         $("#uc_subscribed").css("background", "#e7e7e7");
         $("#uc_no_subscribe").css("background", "#fff");
         $("p.uc_subscribe").html("您还未您还未订阅“铅笔道”，订阅后我们将推送文章到您的邮箱。");
     }
 }

 /* 订阅/取消资讯 */
 function subscribe(state, emailAddr) {
     var token = $.jStorage.get("localToken");
     $.post({
         url: v1url + "user/subscribe",
         type: "POST",
         data: {
             "state": state,
             "email": emailAddr
         },
         headers: {
             "token": token,
             "devicetoken": cookie_PENCILNEWSID,
         },
         success: function(data) {
             if (data["code"] == 1000) {
                 if (state == 1) {
                     //showSuccess("订阅成功！");
                     $("#subscribe").css({
                         "background": "#e7e7e7",
                         "line-height": "2rem"
                     });
                     $("#subscribe").html("已订阅");
                     $("#subscribe").attr("disabled", "true");
                     if ($("#email_addr").val()) {
                         $("#email_addr").val(email)
                     }
                 }
                 if (state == 0) {
                     //showSuccess("取消订阅成功！");
                     $("#subscribe").css({
                         "background": "#fff000",
                         "line-height": "2rem"
                     });
                     $("#subscribe").html("<span class='icon-subscribe'></span> 提交");
                 }

             } else {
                 if ($.jStorage.get("localSubscribe" == "off")) {
                     showWarning(data["message"]);
                 }

             }
         }
     });
 }

 /* 发送请求得到搜索结果 */
 function getSearchResult(page) {

     var keyword = $.jStorage.get("keyword");
     var page_size = 20;
     $.get({
         url: v1url + "articles",
         type: "GET",
         'headers': {
             "devicetoken": cookie_PENCILNEWSID,
         },
         data: {
             "keyword": keyword,
             "page": page,
             "page_size": page_size
         },
         success: function(data) {
             if (page == 0) {
                 if ((typeof data) == "string") {
                     data = $.parseJSON(data);
                 }
                 if (data["data"]["_pageinfo"]["total_count"] == 0) {
                     $("#search_result_con,#load_more_con").hide();
                     $("#noresults").show();
                 } else {
                     $("#on_searching").hide();
                     $("#search_result_prompt").show();
                     showSearchResult(data);
                 }
             } else {
                 $("#on_searching").hide();
                 $("#search_result_prompt").show();
                 showSearchResult(data);
             }
         },
         error: function() {

         }
     });
 }


 /* 展示搜索结果 */
 function showSearchResult(data) {
     if ((typeof data) == "string") {
         data = $.parseJSON(data);
     }
     var keyword = $.jStorage.get("keyword");
     var resultDataArr = data["data"]["articles"];
     var resultsTotalCount = data["data"]["_pageinfo"]["total_count"];
     $("#search_result_count").html(resultsTotalCount);
     $(".sr_keyword").html(keyword);

     if (resultDataArr.length == 0) {
         $("#load_more_con").html("<p>以上是全部的搜索结果</p>");
     }


     for (i = 0; i < resultDataArr.length; i++) {
         var title = resultDataArr[i]["article_info"]["title"];
         var articleId = resultDataArr[i]["article_info"]["article_id"];
         var articleLink = "/p/" + articleId + ".html";
         var digest = resultDataArr[i]["article_info"]["digest"];
         var cover_img = resultDataArr[i]["article_info"]["cover_img"];
         var cover_imgLink = "https://odonohz90.qnssl.com/" + cover_img + '?imageView2/2/w/500/h/500/q/75';
         var hits_count = resultDataArr[i]["article_info"]["hits_count"];
         var likes_count = resultDataArr[i]["article_info"]["likes_count"];
         var comments_count = resultDataArr[i]["article_info"]["comments_count"];
         var create_at = resultDataArr[i]["article_info"]["create_at"].split(' ')[0];
         if (resultDataArr[i]["journalist"]["profile"]["name"]) {
             var publishUser = resultDataArr[i]["journalist"];
         } else {
             var publishUser = resultDataArr[i]["user"];
         }

         var tages = resultDataArr[i]["industries"];
         var tarStr = "";
         var cateInd = resultDataArr[i]["cate"]["cate_id"];
         var cateName = resultDataArr[i]["cate"]["name"];

         var userAvatar = "https://odonohz90.qnssl.com/" + publishUser["profile"]["avatar"] + '?imageView2/2/w/500/h/500/q/75';
         for (j = 0; j < tages.length; j++) {
             tarStr = tarStr + "<span>" + tages[j]["name"] + "</span>";
         }


         $("#search_result_con").append("<div class='sr_article'><div class='sr_img_con'><div class='sr_cover_con'><a href='" + articleLink + "' target='_blank'><img src='" + cover_imgLink + "' alt='' class='img-responsive'><span class='cate-label cate-label-" + cateInd + "'>" + cateName + "</span></a></div></div><div class='sr_art_con'><h3><a href='" + articleLink + "' target='_blank'>" + title + "</a></h3><div><div class='search_res_tags'><span class='icon-label'></span>" + tarStr + "</div></div><div class='sr_content_con'><p>" + digest + "</p></div><div class='sr_author_con'><div class='sr-publisher'><div class='img-wra'><img src='" + userAvatar + "' alt=''></div>&nbsp;" + publishUser["profile"]["name"] + "</a></p></div><div><p><span class='icon-fire'></span>" + hits_count + "</p><p class='hidden-xs'><span class='icon-like'></span>" + likes_count + "</p><p><span class='icon-comment'></span>" + comments_count + "</p></div><div><p>" + create_at + "</p></div><span class='clearfix'></span></div></div><div class='sr_clearfix'></div></div> ");

     }
 }

 function showActive() {
     // var activePathName = window.location.pathname;
     // if (activePathName == "/") {
     //     $("#nav_index").addClass("active");
     // } else {
     //     $(".nav_navbar a[href^='" + activePathName + "']").parent().addClass("active");
     // }
     var cateHighInd;
     // console.log(_cate_id)
     if (_cate_id != "init_cate_id") {
         if (_cate_id == "") {
             cateHighInd = 0;
         } else {
             cateHighInd = _cate_id;
         }
     }

     // console.log(cateHighInd)
     $(".cates li").eq(cateHighInd).addClass("cate-active");



 }

 function saveUser(user) {
     //uid, username, name, phone, email, token, subscribed, avatar
     window.name = BASE64.encoder(JSON.stringify(user));
 }

function ajaxBind(bindToken){
    $.post({
        url:bindUrl + '/mp/ajaxbind',
        data:{
            bindToken:bindToken
        },
        success:function(res){
            if(res.data.action == 'scanned'){
                $('#wechat-qrcode-tips').addClass('hide');
                $('#wechat-qrcode-sucess').removeClass('hide');
                ajaxBind(bindToken)
            }else if(res.data.action == 'refresh'){
                ajaxBind(bindToken)
            }else if(res.data.action == 'success'){
                var data = parseQuery(res.data.data);
                if(data.needPhone == 1){
                    data.redirectUrl = location.href;
                    var redirectdata = BASE64.encoder(JSON.stringify(data));
                    location.href="/pc_bindphone?redirectdata="+redirectdata;
                }else{
                    var openid = data.openid;
                    $.post({
                        url:v1url+'user/wechat',
                        headers:{
                            devicetoken:cookie_PENCILNEWSID
                        },
                        data:{
                            openid:openid
                        },
                        success:function(rlt){
                            if(rlt.code == '1000'){
                               var user = rlt.data.user;
                                saveUserToLocal(user)
                                location.reload();
                            }
                        }
                    })
                }
            }
        }
    })
}

//点击微信登录
$("#wechat_login").click(function(){
    $.get({
        url:bindUrl + 'mp/bindtoken',
        success:function(res){
            if(res.code == '1000'){
                var bindToken  = res.data.bindToken;
                var qrcode = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe63b653c396bc517&redirect_uri='
                    + encodeURIComponent('https://oa.api.pencilnews.cn/mp/oauth?bindToken=' + bindToken) 
                    + '&response_type=code&scope=snsapi_userinfo&state=authorize#wechat_redirect';
                ajaxBind(bindToken)
                $('#wechat-qrcode canvas').remove();
                $('#wechat-qrcode').qrcode({
                    text: qrcode,
                    width:200,
                    height:200
                }).removeClass('hide');
            }
        }
    })
});