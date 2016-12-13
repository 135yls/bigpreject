  var v1url = "https://api.pencilnews.cn/",
      imgUrl = 'https://odonohz90.qnssl.com/',
      bindUrl = "https://oa.api.pencilnews.cn/";

  function getCookie(name) {
      var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg))
          return unescape(arr[2]);
      else
          return null;
  }

  var cookie_PENCILNEWSID = getCookie("PENCILNEWSID");
  //节流函数，用于scroll resize事件
  function throttle(method, context) {
      clearTimeout(method.tId);
      // console.log('cleat')
      method.tId = setTimeout(function() {
          method.call(context);
      }, 50);
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

    //判断是否是手机（不包括pad）
    function isPhone() {
          var userAgentInfo = navigator.userAgent;
          var Agents = ["Android", "iPhone",
              "SymbianOS", "Windows Phone", "iPod"
          ];
          var flag = false;
          for (var v = 0; v < Agents.length; v++) {
              if (userAgentInfo.indexOf(Agents[v]) > 0) {
                  flag = true;
                  break;
              }
          }
          return flag;
      }


  // 验证手机号为数字且不为空
  function validPhone(obj) {
      var phoneNumber = obj.val();
      var pattern = /^1[34578]\d{9}$/;
      if (!pattern.test(phoneNumber) || phoneNumber == "") {
          showWarning("请输入正确的手机号！");
          return false;
      } else {
          return true;
      }
  }
/*倒计时(间隔1秒)
 obj 倒计时对象
 count 时间
 str 倒计时结束后，obj显示的文字
*/
function makeCountDown(obj, count ,str) {
     obj.attr("disabled", "true");
     var timer = null;
     timer = setInterval(function() {
         count--;
         obj.html(count);
         if (count == 0) {
             clearInterval(timer);
             obj.removeAttr("disabled");
             obj.html("获取验证码");
         }
     }, 1000);
 }

  function checkInterfaceData(data) {
      if (data.code == 1000) {
          return true;
      } else if (data.code == -1) {
          $("#login_bg").show();
          $("#sign_up_bg").css({
              left: '50%'
          }).show();
          $(".sign_in_con").show().css({
              opacity: '1'
          });
          $(".sign_up_con").hide();

          return false;
      } else {
          showWarning(data.message);
          return false;
      }
  }

    function parseQuery(query){
        var reg = /([^=&\s]+)[=\s]*([^=&\s]*)/g;
        var obj = {};
        while(reg.exec(query)){
            obj[RegExp.$1] = RegExp.$2;
        }
        return obj;
    }
  function checkInterfaceCode(data) {
      switch (data.code) {
          case -3:
              showWarning("服务器请求失败");
              return false;
          case -2:
              showWarning("权限认证失败");
              return false;
          case -1:
              showPCLoginForm();
              return false;
          case 0:
              showWarning(data.message);
              return false;
          case 1000:
              return true;
          case 1001:
              showWarning(data.message);
              return false;
          case 1002:
              showWarning("注册失败");
              return false;
          case 1003:
              showWarning("校验失败");
              return false;
          case 1004:
              showWarning("未找到");
              return false;
          case 1005:
              showWarning("请求方式错误");
              return false;
          case 1006:
              showWarning("已经做过该操作，请勿重复请求");
              return false;
          case 1007:
              showWarning("未做过该项请求，取消失败");
              return false;
      }
  }

function checkLoginEffect(data) {
      switch (data.code) {
          case -3:
              showWarning("服务器请求失败");
              return false;
          case -2:
              showWarning("权限认证失败");
              return false;
          case -1:
              $.jStorage.flush();
              location.href = "/";
              return false;
          case 0:
              showWarning(data.message);
              return false;
          case 1000:
              return true;
          case 1001:
              showWarning(data.message);
              return false;
          case 1002:
              showWarning("注册失败");
              return false;
          case 1003:
              showWarning("校验失败");
              return false;
          case 1004:
              showWarning("未找到");
              return false;
          case 1005:
              showWarning("请求方式错误");
              return false;
          case 1006:
              showWarning("已经做过该操作，请勿重复请求");
              return false;
          case 1007:
              showWarning("未做过该项请求，取消失败");
              return false;
      }
  }

//获取url参数
function getUrlParam(name) {
    var search = document.location.search;
    var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
    var matcher = pattern.exec(search);
    var items = null;
    if (null != matcher) {
        try {
            items = decodeURIComponent(decodeURIComponent(matcher[1]));
        } catch (e) {
            try {
                items = decodeURIComponent(matcher[1]);
            } catch (e) {
                items = matcher[1];
            }
        }
    }
    return items;
};

//弹出PC端登录框
function showPCLoginForm(){
    $("#login_bg").show();
    $("#regist_container").hide();
    $("#forget_pwd_container").hide();
    $("#login_container").show();
}

function showPCRegistForm(){
    $("#login_bg").show();
    $("#login_container").hide();
    $("#forget_pwd_container").hide();
    $("#regist_container").show();    
}

function showPCForgetPwdForm(){
    $("#login_bg").show();
    $("#login_container").hide();
    $("#regist_container").hide();
    $("#forget_pwd_container").show();    
}


