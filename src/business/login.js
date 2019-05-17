'use strict'
/*

	建议所有业务写在这里

*/

import http from "../global/request.js"


var vdata = {
	obj : {a:"12"},
	msg : 'Welcome to Your Vue.js App',
	items : ["1","2","3","4"],
	formName : {
		name : ""
	},
	rules: {
		name: [
				{ required: true, message: '必须输入手机号', trigger: 'blur' },
				// { type:'number', message: '11位数字', trigger: 'blur' }
			]
	}
}


export default {
	vdata,
	 getSms(params,vm){
		return new Promise((resolve,reject) => {
			http.get("/api/sms/",{
				succ: function (res){
					vm.msg += "callback succ";
				},
				fail: function (res){
					vm.obj.a += "callback fail";
					reject(res);
				},
				neterror: function (res){
					vm.msg += "callback neterror";
				}
				// final: function (res){
				// 	vm.msg += "callback final";
				// 	// vm.data1.a = "callback final";
				// }
			});
		});
	},
	userNameLogin(params,vm){
		return new Promise((resolve,reject) => {
			http.post("api/login",true,{
				// uploadprogress : function (p){
				// 	console.log(p);
				// },
				succ: function (res){
					console.log("login-success-"+res);
				},
				// fail: function (res){
				// 	alert("错误"+res.status);
				// },
				neterror: function (res){
					console.log("login-neterror-"+res);
				},
				final: function (res){
					console.log("login-final-"+res);
				}
			});
		});
	},
	userNameLogin1(params,vm){
		return new Promise((resolve,reject) => {
			http.post("api/login",params,{});
		});
	}
}
// {
//                                   'username': _this.ruleForm.username,
//                                   'password': _this.ruleForm.password
//                               }