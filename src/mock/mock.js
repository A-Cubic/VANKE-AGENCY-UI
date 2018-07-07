import Mock from 'mockjs'
const Random = Mock.Random;  // 获取 mock.Random 对象

//Mock数据
var counter = 0;
var CallBackOpera = function (){
    this.success = function (data){
        return ({"code":"0","msg":"操作成功","success":true,"data":data})
    };  //成功返回
    this.error = function (msg){
        return ({"code":"501","msg":msg,"success":false})
    }; //失败返回
};
function Json (jsonString){
    return (JSON.parse(jsonString))
} //数据转格式
var BasicInfoOperate = function (_DataList){
    var CallBack = new CallBackOpera ();
    this.findById = function (postBody){
        var postData = Json(postBody);
        var data = null;
        for (var i=0;i<_DataList.length;i++){
            if (_DataList[i].id == postData.id){
                data = _DataList[i];
            }
        }
        if (data == null){
            return (CallBack.error('数据不存在'))
        }
        return (CallBack.success(data));
    }
    this.findList = function (postBody){
        return CallBack.success(_DataList);
    }
    this.save = function (postBody){
        var postData = Json(postBody);
        if (postData.id == "add"){
            postData.id = _DataList.length + 1;
            _DataList.push (postData);
        }else {
            for (var i=0;i<_DataList.length;i++){
                if (_DataList[i].id == postData.id){
                    _DataList[i] = postData;
                }
            }
        }
        return CallBack.success();
    };
    this.savePay = function (postBody){
        var postData = Json(postBody);
        _DataList.push (postData);
        return CallBack.success();
    }
    this.delete = function (postBody){
        var postData = Json(postBody);
        for (var i=0;i<_DataList.length;i++){
            if (_DataList[i].id == postData.id){
                _DataList.splice(i, 1)
            }
        }
        return CallBack.success();
    };
};
var BasicInfo = function (reqTemplate){
    var list = [];
    var Operate = new BasicInfoOperate(list);
    var CallBack = new CallBackOpera ();
    var obj = {};
    obj.request = function (postBody){
        var postData = Json(postBody);
        return (CallBack.success(reqTemplate))
    }
    obj.findList = function (postBody){
        return (Operate.findList(postBody))
    }
    obj.findPage = function (postBody){
        var postData = Json(postBody);
        var page = {"last_page":false,"page_size":postData.page_size,"total_page":1,"total_row":20,"page_no":postData.page_no,"list":list};
        return (CallBack.success(page))
    }
    obj.findById = function (postBody){
        return (Operate.findById(postBody))
    }
    obj.save = function (postBody){
        console.log(postBody)
        return (Operate.save(postBody))
    };
    obj.savePay = function (postBody) {
        console.log(postBody)
        return (Operate.savePay(postBody))
    }
    obj.delete = function (postBody){
        console.log(postBody)
        return (Operate.delete(postBody))
    }
    return (obj);
};

var SessionUserInfoSchool = {
    "user_name": "admin",
    "company_name": "BTA",
    "company_id": 123456,
    "user_code": "admin",
    "account_type": 1
};
var SessionUserInfoEdu = {
    "org_id": 1,
    "user_name": "张三",
    "user_code": "wang5",
    "org_name": "",
    "account_type": 1
};
var SessionUserInfo = {};
var bLogin = false;

Mock.mock("basic/sessionUser",function (options){
    //请求参数：无
    var Call = new CallBackOpera();
    if (bLogin)
      return Call.success(SessionUserInfo);
    else
      return (Call.error("mock登录用户超时"));
});
Mock.mock("basic/login",function (options){
    //请求参数格式:{"user_code":"zhang3","user_pass":"111111"}
    var Call = new CallBackOpera();
    var requestData = JSON.parse(options.body)
    if (requestData.user_code == SessionUserInfoSchool.user_code){
        SessionUserInfo = SessionUserInfoSchool;
        bLogin = true;
        return Call.success(SessionUserInfo);
    }
    else{
        return Call.error('mock登录用户不存在');
    }
});
