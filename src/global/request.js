'use strict'

import axios from 'axios'
import qs from 'qs'
import config from '@/global/openRequestConfig.js'

var openPostInstance = axios.create({
	baseURL: config.baseURL,
	timeout: config.normarTimeout,
	headers: config.normalHeaders
});

// 取出匿名参数内容，根据实际判断data,cantoast,callbacks分别是否有值
// 返回数组，数组中0代表data，1代表cantoast，2代表callbacks对象
function getCallbacks(agr) {
	var len = agr.length;
	if (len <= 1){
		return [{},false,{}];
	}
	var params = (agr[1] && typeof agr[1] == 'object') ? agr[1] : {};
	// [bool,对象]
	var canToast = len >= 2 && agr[len - 2] === true;
	var callbacks = {};
	var obj = agr[len - 1];

	var existsCallback = (typeof obj == 'object') 
	&& 
	(
		typeof obj.uploadprogress == 'function' ||
		typeof obj.succ == 'function' || 
		typeof obj.fail == 'function' ||
		typeof obj.error == 'function' || 
		typeof obj.final == 'function'
	);
	if (existsCallback) {
		callbacks = obj;
	}
	
	return [params, canToast, callbacks];
}

function sendRequest(type,url,params,canToast,obj) {
	var obj = obj || {};
	// 此处只是示例，实现get和post
	var headers = config.normalHeaders;
	var method = type == config.requestType.get ? "get" : "post";
	if (type == config.requestType.postJson) {
		headers = config.jsonHeader;
	}
	if(!((typeof url == 'string') && url.constructor == String && url.length > 0)){ 
		throw Error("url 不允许为空");
	}
	// 演示多个不同axios示例如何处理
	// var a = type == config.requestType.get1 ? buOpenP : openPostInstance;
	openPostInstance({
		url,
		method : method,
		// 需要针对性处理一下，我不知道
		data : type == config.requestType.post ? params : null,
		params : type == config.requestType.get ? params : null,
		headers : headers,
		// timeout : config.normarTimeout,
		onUploadProgress: function(progressEvent) {
            if (progressEvent.lengthComputable && obj.uploadprogress) {
				obj.uploadprogress && obj.uploadprogress(progressEvent);
            }
        }
	}).then(res => {
		if (res && res.data && res.data.status == 200) {
			res.data = res.data || {};
			obj.succ && obj.succ(res.data);
		}else{
			var msg = res.data.message;
			res.data.message = (msg && msg.length > 0) ? msg : config.businessNormalErrorMsg;
			obj.fail && obj.fail(res.data);
		}
	}).catch(err => {
		if (canToast) {
			alert(config.networkErrorMsg);
		}
		obj.error && obj.error(err);
	}).finally(() => {
		obj.final && obj.final();
	});
}


export default {
	// get没有进度所以没有uploadprogress
	get(url,data,canToast,{succ,fail,error,final} = {}){
		var agrs = getCallbacks(arguments);
		sendRequest(config.requestType.get,url,agrs[0],agrs[1],agrs[2]);
	},
	// get1(url,data,canToast,{succ,fail,error,final} = {}){
	// 	var agrs = getCallbacks(arguments);
	// 	sendRequest(config.requestType.get1,url,agrs[0],agrs[1],agrs[2]);
	// },
	post(url,data,canToast,{uploadprogress,succ,fail,neterror,final} = {}){
		var agrs = getCallbacks(arguments);
		data = qs.stringify(agrs[0]);
		sendRequest(config.requestType.post,url,agrs[0],agrs[1],agrs[2]);
	},
	postFile(){
		// form data -- >
	}
}