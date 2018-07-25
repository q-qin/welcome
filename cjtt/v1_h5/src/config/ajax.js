const ajaxflag = {}
export default (type='GET', url='',comm ={}, data={}, async=true) => {
	let flagname = url;
	return new Promise((resolve, reject) => { //定义一个promise
		if(!ajaxflag[flagname]){
			type = type.toUpperCase();
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}
			ajaxflag[flagname] = true;
			if (type == 'GET') {
				let dataStr = ''; //数据拼接字符串
				Object.keys(data).forEach(key => {
					dataStr += key + '=' + data[key] + '&';
				})
				dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
				url = url + '?' + dataStr;
				requestObj.open(type, url, async);
				requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				requestObj.send();
			}else if (type == 'POST') {
				// 公共参数拼接url
				let dataStr = '';
				Object.keys(comm).forEach(key => {
					dataStr += key + '=' + comm[key] + '&';
				})
				dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
				url = url + '?' + dataStr;
				// 业务参数form data
				let parmStr = '';
				Object.keys(data).forEach(key => {
					parmStr += key + '=' + data[key] + '&';
				})
				parmStr = parmStr.substr(0, parmStr.lastIndexOf('&'));

				requestObj.open(type, url, async);
				requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				//requestObj.send(JSON.stringify(data));
				requestObj.send(parmStr);
			}else {
				ajaxflag[flagname] = false;
				reject('error type');
			}

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						setTimeout(()=>{
							ajaxflag[flagname] = false;
						},1500)
						resolve(obj);
					}else {
						ajaxflag[flagname] = false;
						reject(requestObj);
					}
				}
			}
		}else{
			return '';
		}
	})
}
