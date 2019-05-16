/*

	建议所有请求相关的配置卸载此文件中

*/








const requestType = {
	get : 1,
	get1 : 10,// 访问api.com
	post : 2,
	postJson : 3,
	postFile : 4 // shang
}


const baseURL = 'https://0.0.0.0:1024';

const normalHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json;charset=UTF-8'
	};

const jsonHeader = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json;charset=UTF-8',
	};

const normarTimeout = 3000000;

const networkErrorMsg = "网络异常，请重试！";
const businessNormalErrorMsg = "网络请求异常，请联系师训宝工作人员处理!";

export default {
	baseURL,
	requestType,
	normalHeaders,
	jsonHeader,
	normarTimeout,
	networkErrorMsg,
	businessNormalErrorMsg
}